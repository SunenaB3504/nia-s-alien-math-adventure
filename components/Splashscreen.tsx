
import React from 'react';

interface SplashscreenProps {
  onStart: () => void;
}

const Splashscreen: React.FC<SplashscreenProps> = ({ onStart }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-800 to-slate-900 text-white p-8 text-center shadow-2xl">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-purple-400/50">
        <h1 className="text-6xl font-bold mb-2 flex items-center justify-center">
            <span role="img" aria-label="sparkles" className="text-5xl mr-4 text-yellow-300 transform -rotate-12">✨</span>
            Nia's Alien Math Adventure!
            <span role="img" aria-label="rocket" className="text-5xl ml-4 text-cyan-300 transform rotate-12">🚀</span>
        </h1>
        <p className="text-2xl mt-4 mb-8 max-w-2xl mx-auto">
            A friendly Alien has arrived from space! He needs help from the smartest human he can find to solve math problems about Earth. Are you ready to help him and dance your way through the galaxy?
        </p>
        <button
          onClick={onStart}
          className="px-12 py-6 bg-cyan-400 text-slate-900 font-bold text-3xl rounded-full shadow-lg hover:bg-cyan-300 transform hover:scale-105 transition-transform duration-300 flex items-center mx-auto"
        >
          <span role="img" aria-label="play icon" className="mr-4 text-4xl">▶️</span>
          Start Mission!
        </button>
      </div>
       <div className="absolute bottom-5 text-white/50 text-sm">A cosmic journey for a determined and confident math explorer!</div>
    </div>
  );
};

export default Splashscreen;