import React from 'react';
import { REWARDS_DATA } from '../constants';

interface RewardsUIProps {
  points: number;
  onRedeem: (rewardId: string, cost: number) => void;
  onClose: () => void;
}

const RewardsUI: React.FC<RewardsUIProps> = ({ points, onRedeem, onClose }) => {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gradient-to-br from-purple-500 to-indigo-700 text-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-2xl border-4 border-yellow-300 mx-2 sm:mx-4">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Rewards</h1>
          <button onClick={onClose} className="text-white hover:text-yellow-300 text-2xl sm:text-3xl md:text-4xl">
            <span role="img" aria-label="close">❌</span>
          </button>
        </div>
        <div className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 bg-white/20 p-3 sm:p-4 rounded-lg flex items-center justify-center gap-2">
            You have <span role="img" aria-label="star" className="text-yellow-300">⭐</span> {points} points!
        </div>
        
        <div className="space-y-3 sm:space-y-4 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto pr-2">
            {REWARDS_DATA.map(reward => {
                const canAfford = points >= reward.cost;
                const progress = Math.min((points / reward.cost) * 100, 100);

                return (
                    <div key={reward.id} className="bg-white/10 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                        <div className="flex items-center flex-1 min-w-0">
                            <span className="text-3xl sm:text-4xl md:text-5xl mr-3 sm:mr-4 flex-shrink-0">{reward.icon}</span>
                            <div className="min-w-0 flex-1">
                                <p className="text-lg sm:text-xl md:text-2xl font-bold truncate">{reward.name}</p>
                                <p className="text-sm sm:text-base md:text-lg text-yellow-300">{reward.cost} points</p>
                                <div className="w-full mt-1">
                                    {/* Use native progress element to avoid inline styles and ensure accessibility */}
                                    <progress className="w-full h-2 sm:h-2.5 rounded-full overflow-hidden" value={Math.round(progress)} max={100} aria-label={`${reward.name} progress`} />
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => onRedeem(reward.id, reward.cost)}
                            disabled={!canAfford}
                            className={`px-4 sm:px-6 py-2 sm:py-3 font-bold rounded-lg text-sm sm:text-base md:text-lg transition-colors whitespace-nowrap ${canAfford ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
                        >
                            Redeem
                        </button>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default RewardsUI;