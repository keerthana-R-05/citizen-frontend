import React from 'react';
import { Trophy, Star } from 'lucide-react';

export default function Rewards({ complaints }) {
    const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;
    const totalPoints = resolvedCount * 10;
    const level = resolvedCount < 5 ? 'Novice' : resolvedCount < 15 ? 'Helper' : 'Champion';

    const achievements = [
        { name: 'First Reporter', required: 1, earned: resolvedCount >= 1 },
        { name: 'Community Helper', required: 10, earned: resolvedCount >= 10 },
        { name: 'Civic Champion', required: 25, earned: resolvedCount >= 25 },
    ];

    return (
        <div className="p-4 bg-white rounded-xl shadow-lg border-t-4 border-yellow-500">
            <h3 className="text-xl font-bold mb-3 flex items-center"><Trophy className="w-5 h-5 mr-2 text-yellow-500" /> Your Recognition</h3>
            
            <div className="flex justify-between items-end mb-4 border-b pb-2">
                <div>
                    <p className="text-3xl font-extrabold text-blue-600">{totalPoints}</p>
                    <p className="text-sm text-gray-500">Total Points</p>
                </div>
                <div>
                    <p className="text-lg font-semibold text-gray-700">{level}</p>
                    <p className="text-xs text-gray-500">Level</p>
                </div>
            </div>

            <h4 className="font-semibold text-gray-700 mb-2">Achievements:</h4>
            <div className="space-y-2">
                {achievements.map((a) => (
                    <div key={a.name} className="flex justify-between items-center text-sm">
                        <span className={`flex items-center ${a.earned ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                            <Star className={`w-4 h-4 mr-2 ${a.earned ? 'fill-yellow-400 text-yellow-500' : 'text-gray-400'}`} />
                            {a.name}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${a.earned ? 'bg-green-200' : 'bg-gray-200'}`}>
                            {a.earned ? 'EARNED' : `Goal: ${a.required}`}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}