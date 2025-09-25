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
                <div className="bg-slate-700 text-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center">
                    <div className="text-6xl mx-auto mb-4 text-cyan-400" role="img" aria-label="shield">🛡️</div>
                    <h1 className="text-3xl font-bold mb-4">Parent's Corner</h1>
                    <p className="mb-6">Please enter the PIN to continue.</p>
                    <label htmlFor="parent-pin" className="sr-only">Parent PIN</label>
                    <input 
                        id="parent-pin"
                        aria-label="Parent PIN"
                        placeholder="Enter 4-digit PIN"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded-lg text-center text-2xl bg-slate-800 text-white mb-4"
                    />
                    <div className="flex gap-4">
                        <button onClick={onClose} className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 font-bold rounded-lg text-lg">Back</button>
                        <button onClick={handleLogin} className="flex-1 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 font-bold rounded-lg text-lg">Enter</button>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-600 to-slate-800 text-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-2xl border-4 border-cyan-400">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Redeemed Rewards</h1>
          <button onClick={onClose} className="text-white hover:text-cyan-300 text-4xl">
            <span role="img" aria-label="close">❌</span>
          </button>
        </div>
        
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {redeemedRewards.length === 0 && <p className="text-center text-xl p-8 text-slate-300">No rewards redeemed yet.</p>}
            {[...redeemedRewards].reverse().map((reward, index) => {
                const rewardInfo = REWARDS_DATA.find(r => r.id === reward.id);
                if (!rewardInfo) return null;

                return (
                    <div key={index} className={`p-4 rounded-lg flex items-center justify-between ${reward.fulfilled ? 'bg-green-800/50' : 'bg-white/10'}`}>
                        <div className="flex items-center">
                            <span className="text-5xl mr-4">{rewardInfo.icon}</span>
                            <div>
                                <p className="text-2xl font-bold">{rewardInfo.name}</p>
                                <p className="text-sm text-slate-300">Redeemed: {new Date(reward.date).toLocaleString()}</p>
                            </div>
                        </div>
                        {!reward.fulfilled ? (
                             <button 
                                onClick={() => onFulfill(reward.id)}
                                className="px-4 py-2 font-bold rounded-lg text-lg bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
                            >
                                <span role="img" aria-label="check mark" className="mr-1">✔️</span> Mark as Fulfilled
                            </button>
                        ) : (
                            <p className="font-bold text-green-300">Fulfilled!</p>
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