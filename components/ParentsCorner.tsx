import React, { useState } from 'react';
import { RedeemedReward } from '../types';
import { REWARDS_DATA } from '../constants';

interface ParentsCornerProps {
  redeemedRewards: RedeemedReward[];
  onFulfill: (rewardId: string) => void;
  onClose: () => void;
}

const ParentsCorner: React.FC<ParentsCornerProps> = ({ redeemedRewards, onFulfill, onClose }) => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const handleLogin = () => {
        // Simple password, in a real app this would be more secure
        if (password === '1234') {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect PIN');
        }
    };

    if (!isAuthenticated) {
        return (
             <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-slate-700 text-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-sm text-center">
                    <div className="text-4xl sm:text-6xl mx-auto mb-4 text-cyan-400" role="img" aria-label="shield">🛡️</div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4">Parent's Corner</h1>
                    <p className="mb-6 text-sm sm:text-base">Please enter the PIN to continue.</p>
                    <label htmlFor="parent-pin" className="sr-only">Parent PIN</label>
                    <input 
                        id="parent-pin"
                        aria-label="Parent PIN"
                        placeholder="Enter 4-digit PIN"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded-lg text-center text-xl sm:text-2xl bg-slate-800 text-white mb-4"
                    />
                    <div className="flex gap-2 sm:gap-4">
                        <button onClick={onClose} className="flex-1 px-4 py-3 sm:px-6 sm:py-3 bg-gray-500 hover:bg-gray-600 font-bold rounded-lg text-base sm:text-lg">Back</button>
                        <button onClick={handleLogin} className="flex-1 px-4 py-3 sm:px-6 sm:py-3 bg-cyan-500 hover:bg-cyan-600 font-bold rounded-lg text-base sm:text-lg">Enter</button>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-600 to-slate-800 text-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-2xl border-4 border-cyan-400">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Redeemed Rewards</h1>
          <button onClick={onClose} className="text-white hover:text-cyan-300 text-2xl sm:text-3xl md:text-4xl">
            <span role="img" aria-label="close">❌</span>
          </button>
        </div>
        
        <div className="space-y-3 sm:space-y-4 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto pr-2">
            {redeemedRewards.length === 0 && <p className="text-center text-lg sm:text-xl p-6 sm:p-8 text-slate-300">No rewards redeemed yet.</p>}
            {[...redeemedRewards].reverse().map((reward, index) => {
                const rewardInfo = REWARDS_DATA.find(r => r.id === reward.id);
                if (!rewardInfo) return null;

                return (
                    <div key={index} className={`p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 ${reward.fulfilled ? 'bg-green-800/50' : 'bg-white/10'}`}>
                        <div className="flex items-center flex-1 min-w-0">
                            <span className="text-3xl sm:text-4xl md:text-5xl mr-3 sm:mr-4 flex-shrink-0">{rewardInfo.icon}</span>
                            <div className="min-w-0 flex-1">
                                <p className="text-lg sm:text-xl md:text-2xl font-bold truncate">{rewardInfo.name}</p>
                                <p className="text-xs sm:text-sm text-slate-300">Redeemed: {new Date(reward.date).toLocaleString()}</p>
                            </div>
                        </div>
                        {!reward.fulfilled ? (
                             <button 
                                onClick={() => onFulfill(reward.id)}
                                className="px-3 py-2 sm:px-4 sm:py-2 font-bold rounded-lg text-sm sm:text-base md:text-lg bg-green-500 hover:bg-green-600 text-white flex items-center gap-1 sm:gap-2 whitespace-nowrap"
                            >
                                <span role="img" aria-label="check mark" className="text-sm sm:text-base">✔️</span> Mark as Fulfilled
                            </button>
                        ) : (
                            <p className="font-bold text-green-300 text-sm sm:text-base whitespace-nowrap">Fulfilled!</p>
                        )}
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default ParentsCorner;