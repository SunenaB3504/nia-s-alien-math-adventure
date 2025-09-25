import React from 'react';
import { ProblemType } from '../types';

interface ModeSelectionProps {
  onSelectMode: (mode: ProblemType) => void;
}

const ModeSelection: React.FC<ModeSelectionProps> = ({ onSelectMode }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-800 to-slate-900 text-white p-4 sm:p-8 text-center">
      <div className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-purple-400/50 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">Choose Your Mission!</h1>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
          <button
            onClick={() => onSelectMode(ProblemType.ADDITION)}
            className="px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 bg-green-500 text-white font-bold text-xl sm:text-2xl md:text-3xl rounded-full shadow-lg hover:bg-green-400 transform hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 sm:gap-3 md:gap-4"
          >
            <span className="text-2xl sm:text-3xl md:text-4xl" role="img" aria-label="plus">➕</span>
            Addition
          </button>
          <button
            onClick={() => onSelectMode(ProblemType.MULTIPLICATION)}
            className="px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 bg-cyan-400 text-slate-900 font-bold text-xl sm:text-2xl md:text-3xl rounded-full shadow-lg hover:bg-cyan-300 transform hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 sm:gap-3 md:gap-4"
          >
            <span className="text-2xl sm:text-3xl md:text-4xl" role="img" aria-label="multiply">✖️</span>
            Multiplication
          </button>
          <button
            onClick={() => onSelectMode(ProblemType.DIVISION)}
            className="px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 bg-pink-500 text-white font-bold text-xl sm:text-2xl md:text-3xl rounded-full shadow-lg hover:bg-pink-400 transform hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 sm:gap-3 md:gap-4"
          >
            <span className="text-2xl sm:text-3xl md:text-4xl" role="img" aria-label="divide">➗</span>
            Division
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeSelection;