
import React from 'react';

interface SplashscreenProps {
  onStart: () => void;
}

const Splashscreen: React.FC<SplashscreenProps> = ({ onStart }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-800 to-slate-900 text-white p-4 sm:p-8 text-center shadow-2xl">
      <div className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-purple-400/50 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <span role="img" aria-label="sparkles" className="text-3xl sm:text-4xl md:text-5xl text-yellow-300 transform -rotate-12">✨</span>
            <span className="text-center">Nia's Alien Math Adventure!</span>
            <span role="img" aria-label="rocket" className="text-3xl sm:text-4xl md:text-5xl text-cyan-300 transform rotate-12">🚀</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mt-4 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            A friendly Alien has arrived from space! He needs help from the smartest human he can find to solve math problems about Earth. Are you ready to help him and dance your way through the galaxy?
        </p>
        <button
          onClick={onStart}
          className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-cyan-400 text-slate-900 font-bold text-xl sm:text-2xl md:text-3xl rounded-full shadow-lg hover:bg-cyan-300 transform hover:scale-105 transition-transform duration-300 flex items-center mx-auto"
        >
          <span role="img" aria-label="play icon" className="mr-2 sm:mr-3 md:mr-4 text-2xl sm:text-3xl md:text-4xl">▶️</span>
          Start Mission!
        </button>
      </div>
       <div className="absolute bottom-3 sm:bottom-5 text-white/50 text-xs sm:text-sm text-center px-4">A cosmic journey for a determined and confident math explorer!</div>
    </div>
  );
};

export default Splashscreen;