import React from 'react';
import { Problem, ProblemType } from '../types';

// Simple CSS-based speech bubble
const SpeechBubble: React.FC<{ text: string }> = ({ text }) => (
  <div className="bg-white rounded-lg p-4 max-w-xs text-center shadow-lg relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0 after:border-8 after:border-solid after:border-transparent after:border-t-white after:-translate-x-1/2 after:translate-y-full">
    <p className="text-gray-800 text-lg">{text}</p>
  </div>
);

// 2D Nia Character with CSS animations
const NiaCharacter: React.FC<{ feedback: boolean | null }> = ({ feedback }) => {
  const animationClass = feedback === true ? 'animate-bounce' : '';
  return (
    <div className="flex flex-col items-center">
      <div className={`text-6xl sm:text-7xl md:text-8xl ${animationClass}`}>👧</div>
      <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-1 sm:mt-2">Nia</p>
    </div>
  );
};

// 2D Alien Character with CSS animations
const AlienCharacter: React.FC<{ feedback: boolean | null }> = ({ feedback }) => {
  const animationClass = feedback === false ? 'animate-[shake_0.82s_cubic-bezier(.36,.07,.19,.97)_both]' : '';
  return (
    <div className="flex flex-col items-center">
       <div className={`text-6xl sm:text-7xl md:text-8xl ${animationClass}`}>👽</div>
       <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-1 sm:mt-2">Alien</p>
    </div>
  );
};

// 2D visualization of the math problem
const VisualScene2D: React.FC<{ problem: Problem }> = ({ problem }) => {
    const { groups, itemsPerGroup } = problem.visual;
    const isAddition = problem.type === ProblemType.ADDITION;

    const renderGroup = (count: number, keyPrefix: string) => (
      <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 p-1 sm:p-2 bg-white/20 rounded-lg">
        {Array.from({ length: count }).map((_, i) => (
          <div key={`${keyPrefix}-${i}`} className="text-2xl sm:text-3xl md:text-4xl">
            {Math.random() > 0.5 ? '🪐' : '⭐'}
          </div>
        ))}
      </div>
    );
    
    return (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 my-4 sm:my-8 min-h-[150px] sm:min-h-[200px] px-2">
            {isAddition ? (
                <>
                    {renderGroup(groups, 'g1')}
                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mx-2 sm:mx-4">+</div>
                    {renderGroup(itemsPerGroup, 'g2')}
                </>
            ) : (
                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
                  {Array.from({ length: groups }).map((_, i) => (
                      <div key={`group-${i}`} className="flex flex-col items-center gap-1 sm:gap-2 p-1 sm:p-2 bg-white/20 rounded-lg">
                          {Array.from({ length: itemsPerGroup }).map((_, j) => (
                              <div key={`item-${i}-${j}`} className="text-2xl sm:text-3xl">
                                  {Math.random() > 0.5 ? '🪐' : '⭐'}
                              </div>
                          ))}
                      </div>
                  ))}
                </div>
            )}
        </div>
    );
};

interface GameCanvasProps {
    problem: Problem;
    feedback: boolean | null;
    activeDialogue: { speaker: 'Alien'; text: string } | null;
    isNiaResponding: boolean;
}

// Re-purposed GameCanvas to render a 2D scene
const GameCanvas: React.FC<GameCanvasProps> = ({ problem, feedback, activeDialogue, isNiaResponding }) => {
  return (
    <div className="absolute inset-0 w-full min-h-full bg-gradient-to-br from-indigo-800 via-purple-800 to-slate-900 overflow-hidden flex flex-col justify-between items-center p-2 sm:p-4">
      {/* Top section for problem visualization */}
      <div className="w-full flex-grow flex items-center justify-center py-4">
        <VisualScene2D problem={problem} />
      </div>

      {/* Bottom section for characters */}
      <div className="w-full flex justify-around items-end px-4 sm:px-8 pb-24 sm:pb-32 md:pb-40">
        <NiaCharacter feedback={feedback} />
        
        <div className="absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center">
          {activeDialogue && !isNiaResponding && (
            <div className="transform -translate-y-12">
              <SpeechBubble text={activeDialogue.text} />
            </div>
          )}

          {isNiaResponding && (
            <div className="text-6xl sm:text-8xl animate-pulse">?</div>
          )}
        </div>
        
        <AlienCharacter feedback={feedback} />
      </div>

      {/* Adding a placeholder for Tailwind to generate the shake animation */}
      <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .animate-\\[shake_0\\.82s_cubic-bezier\\(\\.36\\,07\\,19\\,97\\)_both\\] {
          animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};

export default GameCanvas;
