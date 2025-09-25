import React from 'react';
import { ProblemType } from '../types';

interface ModeSelectionProps {
  onSelectMode: (mode: ProblemType) => void;
}

const ModeSelection: React.FC<ModeSelectionProps> = ({ onSelectMode }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-800 to-slate-900 text-white p-8 text-center">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-purple-400/50">
        <h1 className="text-5xl font-bold mb-8">Choose Your Mission!</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <button
            onClick={() => onSelectMode(ProblemType.ADDITION)}
            className="px-10 py-6 bg-green-500 text-white font-bold text-3xl rounded-full shadow-lg hover:bg-green-400 transform hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-4"
          >
            <span className="text-4xl" role="img" aria-label="plus">➕</span>
            Addition
          </button>
          <button
            onClick={() => onSelectMode(ProblemType.MULTIPLICATION)}
            className="px-10 py-6 bg-cyan-400 text-slate-900 font-bold text-3xl rounded-full shadow-lg hover:bg-cyan-300 transform hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-4"
          >
            <span className="text-4xl" role="img" aria-label="multiply">✖️</span>
            Multiplication
          </button>
          <button
            onClick={() => onSelectMode(ProblemType.DIVISION)}
            className="px-10 py-6 bg-pink-500 text-white font-bold text-3xl rounded-full shadow-lg hover:bg-pink-400 transform hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-4"
          >
            <span className="text-4xl" role="img" aria-label="divide">➗</span>
            Division
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeSelection;