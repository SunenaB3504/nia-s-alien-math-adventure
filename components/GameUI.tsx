import React, { useState, useEffect } from 'react';
import { Problem, GameStage } from '../types';

interface GameUIProps {
  problem: Problem;
  onAnswer: (answer: number) => void;
  feedback: boolean | null;
  points: number;
  streak: number;
  isNiaResponding: boolean;
  isNiaInitiatingTalk: boolean;
  onNiaTalk: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  onNavigate: (stage: GameStage) => void;
}

const GameUI: React.FC<GameUIProps> = ({ problem, onAnswer, feedback, points, streak, isNiaResponding, isNiaInitiatingTalk, onNiaTalk, isMuted, toggleMute, onNavigate }) => {
  const [selected, setSelected] = useState<number | null>(null);
  
  const isInteractionDisabled = feedback !== null || isNiaResponding || isNiaInitiatingTalk;

  useEffect(() => {
    setSelected(null); // Reset selection on new problem
  }, [problem]);

  const handleSubmit = (option: number) => {
    if (isInteractionDisabled) return;
    setSelected(option);
    onAnswer(option);
  };

  const getButtonClass = (option: number) => {
    if (feedback !== null && option === problem.answer) {
      return 'bg-green-500 hover:bg-green-600 ring-4 ring-white shadow-lg scale-105';
    }
    if (feedback !== null && selected === option && option !== problem.answer) {
      return 'bg-red-500 hover:bg-red-600';
    }
    if (feedback !== null) {
      return 'bg-gray-400 opacity-60';
    }
    return 'bg-blue-500 hover:bg-blue-600';
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col p-4 md:p-8 pointer-events-none">
      {/* Top Bar */}
      <div className="w-full bg-white/30 backdrop-blur-md rounded-xl p-3 flex justify-between items-center shadow-lg text-white">
        <div className="flex items-center gap-4">
            <div className="text-xl md:text-2xl font-semibold bg-pink-500 px-4 py-2 rounded-lg flex items-center gap-2">
                <span role="img" aria-label="star">⭐</span> {points}
            </div>
            <div className="text-xl md:text-2xl font-semibold bg-orange-500 px-4 py-2 rounded-lg flex items-center gap-2">
                <span role="img" aria-label="zap">⚡</span> Streak: x{streak + 1}
            </div>
        </div>
        <div className="flex items-center gap-2 text-2xl">
            <button 
                onClick={onNiaTalk}
                disabled={isInteractionDisabled}
                className="p-3 bg-blue-400/80 text-white rounded-full hover:bg-blue-400 transition-colors pointer-events-auto disabled:bg-gray-500 disabled:opacity-50"
                aria-label="Talk to the Alien"
            >
                <span role="img" aria-label="speech bubble">💬</span>
            </button>
            <button 
                onClick={toggleMute} 
                className="p-3 bg-white/20 rounded-full hover:bg-white/40 transition-colors pointer-events-auto"
                aria-label={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted ? <span role="img" aria-label="muted">🔇</span> : <span role="img" aria-label="volume">🔊</span>}
            </button>
            <button onClick={() => onNavigate(GameStage.REWARDS)} className="p-3 bg-yellow-400/80 text-white rounded-full hover:bg-yellow-400 transition-colors pointer-events-auto" aria-label="View Rewards">
              <span role="img" aria-label="gift">🎁</span>
            </button>
             <button onClick={() => onNavigate(GameStage.PARENTS_CORNER)} className="p-3 bg-slate-500/80 text-white rounded-full hover:bg-slate-500 transition-colors pointer-events-auto" aria-label="Parent's Corner">
              <span role="img" aria-label="shield">🛡️</span>
            </button>
        </div>
      </div>
      
      {isNiaResponding && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-2 rounded-full text-lg animate-pulse z-30 pointer-events-auto">
            The Alien is listening...
        </div>
      )}

      {isNiaInitiatingTalk && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full text-lg animate-pulse z-30 pointer-events-auto">
            Speak now, Nia...
        </div>
      )}

      {/* Bottom Question/Answer Area */}
      <div className="flex-grow flex items-end">
        <div className="w-full bg-white/30 backdrop-blur-md rounded-t-xl p-4 md:p-6 shadow-lg pointer-events-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-4 flex items-center justify-center text-shadow-md">
            <span role="img" aria-label="question mark" className="mr-3 text-3xl">❓</span>
            {problem.question}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {problem.options.map((option) => (
              <button
                key={option}
                onClick={() => handleSubmit(option)}
                disabled={isInteractionDisabled}
                className={`p-4 text-white text-3xl font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${getButtonClass(option)} ${isInteractionDisabled ? 'cursor-not-allowed opacity-70' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {feedback !== null && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-auto">
          <div className={`transform transition-all duration-500 scale-100 ${feedback ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-2xl shadow-2xl p-8 flex flex-col items-center`}>
            {feedback ? (
              <>
                <div className="text-8xl mb-4">✅</div>
                <p className="text-4xl font-bold">Awesome!</p>
              </>
            ) : (
              <>
                <div className="text-8xl mb-4">❌</div>
                <p className="text-4xl font-bold">Let's try again!</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameUI;