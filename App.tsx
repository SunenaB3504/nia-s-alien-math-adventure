import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import GameCanvas from './components/GameCanvas';
import GameUI from './components/GameUI';
import Splashscreen from './components/Splashscreen';
import RewardsUI from './components/RewardsUI';
import ParentsCorner from './components/ParentsCorner';
import ModeSelection from './components/ModeSelection';
import { GameStage, Problem, ProblemType, Proficiency, RedeemedReward } from './types';
import { generateProblem } from './utils/adaptiveLearning';
import { useLocalStorage } from './hooks/useLocalStorage';
import { speak, startListening, stopListening, cancelSpeech } from './utils/speech';
import { CASUAL_DIALOGUE, PEP_TALKS_ON_SUCCESS, PEP_TALKS_ON_STRUGGLE } from './constants';
import { getAlienResponse } from './utils/gemini';

export default function App() {
  const [stage, setStage] = useLocalStorage<GameStage>('gameState_stage', GameStage.SPLASH);
  const [points, setPoints] = useLocalStorage<number>('gameState_points', 0);
  const [proficiency, setProficiency] = useLocalStorage<Proficiency>('gameState_proficiency', {});
  const [redeemedRewards, setRedeemedRewards] = useLocalStorage<RedeemedReward[]>('gameState_redeemedRewards', []);
  const [isMuted, setIsMuted] = useLocalStorage<boolean>('gameState_isMuted', false);
  const [gameMode, setGameMode] = useLocalStorage<ProblemType | null>('gameState_gameMode', null);
  
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);
  const [consecutiveIncorrect, setConsecutiveIncorrect] = useState(0);
  const [activeDialogue, setActiveDialogue] = useState<{ speaker: 'Alien', text: string } | null>(null);
  const [isNiaResponding, setIsNiaResponding] = useState(false);
  const [isNiaInitiatingTalk, setIsNiaInitiatingTalk] = useState(false);
  const conversationTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isInitialMount = useRef(true);
  const userInterruptedSpeechRef = useRef(false);

  const toggleMute = useCallback(() => {
    setIsMuted((prev: boolean) => !prev);
  }, [setIsMuted]);

  // Stop speech when muted, but skip the very first render to avoid race conditions.
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (isMuted) {
      cancelSpeech();
    }
  }, [isMuted]);

  const startGame = useCallback(() => {
    setStage(GameStage.SELECT_MODE);
  }, []);

  const startPlaying = useCallback((mode: ProblemType) => {
    setGameMode(mode);
    setCurrentProblem(generateProblem(proficiency, mode));
    setStage(GameStage.PLAYING);
    setFeedback(null);
  }, [proficiency]);

  useEffect(() => {
    if (stage === GameStage.PLAYING && !currentProblem && gameMode !== null) {
      setCurrentProblem(generateProblem(proficiency, gameMode));
    }
  }, [stage, currentProblem, proficiency, gameMode]);

  // Conversation logic
  useEffect(() => {
    if (stage !== GameStage.PLAYING) {
        if (conversationTimerRef.current) clearInterval(conversationTimerRef.current);
        return;
    }

    const handleAlienInitiatedConversation = () => {
        const dialogue = CASUAL_DIALOGUE[Math.floor(Math.random() * CASUAL_DIALOGUE.length)];
        setActiveDialogue(dialogue);

        const startListeningForResponse = () => {
            // FIX: If the user interrupted, don't start listening.
            if (userInterruptedSpeechRef.current) {
                userInterruptedSpeechRef.current = false; // Reset the flag and exit.
                return;
            }

            setIsNiaResponding(true);
            const listeningTimeout = setTimeout(() => {
                stopListening();
                setIsNiaResponding(false);
                setActiveDialogue(null);
            }, 8000); // 8 seconds to respond

            startListening(
                async (transcript) => { // onResult
                    clearTimeout(listeningTimeout);
                    setIsNiaResponding(false);
                    const alienFollowUp = await getAlienResponse(transcript, 'curious');
                    setActiveDialogue({ speaker: 'Alien', text: alienFollowUp });
                    speak(alienFollowUp, 1.0, () => {
                        setTimeout(() => setActiveDialogue(null), 4000); // Hide reply bubble
                    }, isMuted);
                },
                () => { // onEnd (error, no match)
                    clearTimeout(listeningTimeout);
                    setIsNiaResponding(false);
                    setActiveDialogue(null);
                }
            );
        };

        speak(dialogue.text, 0.9, startListeningForResponse, isMuted);
    };

    conversationTimerRef.current = setInterval(() => {
        if (!activeDialogue && feedback === null && !isNiaResponding && !isNiaInitiatingTalk) {
            handleAlienInitiatedConversation();
        }
    }, 25000); // Every 25 seconds

    return () => {
        if (conversationTimerRef.current) clearInterval(conversationTimerRef.current);
    };
  }, [stage, isMuted, activeDialogue, feedback, isNiaResponding, isNiaInitiatingTalk]);
  
  const handleNiaTalk = useCallback(() => {
    if (activeDialogue || feedback !== null || isNiaResponding || isNiaInitiatingTalk) return;
    
    if (conversationTimerRef.current) clearInterval(conversationTimerRef.current);
    
    // FIX: Set the flag to indicate the user is interrupting.
    userInterruptedSpeechRef.current = true;
    cancelSpeech();
    
    setActiveDialogue(null);
    setIsNiaInitiatingTalk(true);

    // Failsafe timeout to prevent getting stuck in listening state
    const listeningTimeout = setTimeout(() => {
        console.warn("Speech recognition timed out.");
        stopListening();
        setIsNiaInitiatingTalk(false);
    }, 8000); // 8 seconds to speak

    startListening(
        async (transcript) => {
            clearTimeout(listeningTimeout);
            const alienReply = await getAlienResponse(transcript, 'teacher');
            setIsNiaInitiatingTalk(false);
            setActiveDialogue({ speaker: 'Alien', text: alienReply });
            speak(alienReply, 0.9, () => {
                setTimeout(() => setActiveDialogue(null), 4000);
            }, isMuted);
        },
        () => { // onEnd
            clearTimeout(listeningTimeout);
            setIsNiaInitiatingTalk(false);
            // FIX: Reset the flag when listening ends.
            userInterruptedSpeechRef.current = false;
        }
    );
  }, [activeDialogue, feedback, isNiaResponding, isNiaInitiatingTalk, isMuted]);


  const handleAnswer = useCallback((answer: number) => {
    if (!currentProblem || feedback !== null || gameMode === null) return;

    setActiveDialogue(null);
    cancelSpeech();

    const isCorrect = answer === currentProblem.answer;
    
    setFeedback(isCorrect);

    const givePepTalk = (talks: { speaker: 'Alien', text: string }[]) => {
        const talk = talks[Math.floor(Math.random() * talks.length)];
        setTimeout(() => {
            setActiveDialogue(talk);
            speak(talk.text, 0.9, () => {
                setTimeout(() => setActiveDialogue(null), 3000);
            }, isMuted);
        }, 1200);
    };

    if (isCorrect) {
      speak(`Correct. ${currentProblem.answer} is the logical solution.`, 0.9, undefined, isMuted);
      const newPoints = points + 10 * (streak + 1);
      setPoints(newPoints);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setConsecutiveIncorrect(0);

      if (newStreak === 3 || newStreak === 7 || (newStreak > 0 && newStreak % 10 === 0)) {
          givePepTalk(PEP_TALKS_ON_SUCCESS);
      }

    } else {
      speak("That is an incorrect variable. Let us try again.", 0.9, undefined, isMuted);
      setStreak(0);
      const newIncorrectCount = consecutiveIncorrect + 1;
      setConsecutiveIncorrect(newIncorrectCount);

      if (newIncorrectCount >= 2) {
          givePepTalk(PEP_TALKS_ON_STRUGGLE);
          setConsecutiveIncorrect(0);
      }
    }

    setProficiency(prev => {
      const key = currentProblem.key;
      const current = (prev as Proficiency)[key] || { attempts: 0, correct: 0 };
      return {
        ...prev,
        [key]: {
          attempts: current.attempts + 1,
          correct: current.correct + (isCorrect ? 1 : 0)
        }
      };
    });

    setTimeout(() => {
      setFeedback(null);
      setCurrentProblem(generateProblem( proficiency, gameMode));
    }, 2500);
  }, [currentProblem, points, streak, proficiency, consecutiveIncorrect, setPoints, setProficiency, isMuted, gameMode]);


  const handleRedeemReward = (rewardId: string, cost: number) => {
    setPoints((prev: number) => prev - cost);
    const newRedeemed: RedeemedReward = { id: rewardId, date: new Date().toISOString(), fulfilled: false };
    setRedeemedRewards((prev: RedeemedReward[]) => [...prev, newRedeemed]);
    speak("Reward logged! I will transmit the request to your parental unit.", undefined, undefined, isMuted);
  };
  
  const handleFulfillReward = (rewardId: string) => {
    setRedeemedRewards((prev: RedeemedReward[]) => prev.map((r: RedeemedReward) => (r.id === rewardId && !r.fulfilled) ? { ...r, fulfilled: true } : r));
  };

  const renderContent = () => {
    switch (stage) {
      case GameStage.SPLASH:
        return <Splashscreen onStart={startGame} />;
      case GameStage.SELECT_MODE:
        return <ModeSelection onSelectMode={startPlaying} />;
      case GameStage.REWARDS:
        return <RewardsUI points={points} onRedeem={handleRedeemReward} onClose={() => setStage(GameStage.PLAYING)} />;
      case GameStage.PARENTS_CORNER:
        return <ParentsCorner redeemedRewards={redeemedRewards} onFulfill={handleFulfillReward} onClose={() => setStage(GameStage.PLAYING)} />;
      case GameStage.PLAYING:
        if (!currentProblem) return <div className="text-center text-xl p-8">Loading your next challenge...</div>;
        return (
          <div className="relative w-full min-h-screen flex flex-col">
            <GameCanvas problem={currentProblem} feedback={feedback} activeDialogue={activeDialogue} isNiaResponding={isNiaResponding} />
            <GameUI
              problem={currentProblem}
              onAnswer={handleAnswer}
              feedback={feedback}
              points={points}
              streak={streak}
              isNiaResponding={isNiaResponding}
              isNiaInitiatingTalk={isNiaInitiatingTalk}
              onNiaTalk={handleNiaTalk}
              isMuted={isMuted}
              toggleMute={toggleMute}
              onNavigate={setStage}
            />
          </div>
        );
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-cyan-50">
      {renderContent()}
    </main>
  );
}
