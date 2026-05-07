import React from 'react';
import { useHistory } from 'react-router-dom';

const tiers = [
  { id: 't1', name: 'Micro Stakes', buyIn: '10/20', active: 124, rooms: 22, color: 'border-green-500' },
  { id: 't2', name: 'Low Stakes', buyIn: '20/40', active: 89, rooms: 15, color: 'border-blue-500' },
  { id: 't3', name: 'Mid Stakes', buyIn: '50/100', active: 45, rooms: 8, color: 'border-yellow-500' },
  { id: 't4', name: 'High Roller', buyIn: '500/1000', active: 12, rooms: 3, color: 'border-red-500' },
];

const Lobby = () => {
  const history = useHistory();

  const handleQuickJoin = (tierId) => {
    const mockRoomId = `room_${tierId}_${Math.floor(Math.random() * 1000)}`;
    history.push(`/game/${mockRoomId}`);
  };

  const handleCreateRoom = (tierId) => {
    const newRoomId = `new_room_${tierId}_${Date.now()}`;
    history.push(`/game/${newRoomId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="flex justify-between items-center mb-10 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-green-400">MossPOK Lobby</h1>
        <div className="flex items-center gap-4 bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
          <span className="text-gray-400 text-sm">Balance:</span>
          <span className="text-green-400 font-bold font-mono">$5,420.00</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-6 text-gray-300">Select a Tier to Play</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tiers.map(tier => (
            <div key={tier.id} className={`bg-gray-800 rounded-xl border-t-4 ${tier.color} p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col`}>
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <div className="text-4xl font-mono text-gray-300 mb-6">{tier.buyIn}</div>

              <div className="flex justify-between text-sm text-gray-400 mb-6">
                <span><strong className="text-white">{tier.active}</strong> Players</span>
                <span><strong className="text-white">{tier.rooms}</strong> Rooms</span>
              </div>

              <div className="mt-auto space-y-3">
                <button
                  onClick={() => handleQuickJoin(tier.id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition-colors"
                >
                  Quick Join
                </button>
                <button
                  onClick={() => handleCreateRoom(tier.id)}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded transition-colors"
                >
                  Create Room
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-300 flex items-center gap-2">
            <span role="img" aria-label="tv" className="text-yellow-400">📺</span> Recent Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-900 p-4 rounded border border-gray-700">
                <p className="text-sm text-gray-400 mb-2">High Roller • 5 mins ago</p>
                <p className="font-bold text-green-400">Shark won $12,500 pot</p>
                <p className="text-xs text-gray-500 mt-1">with Full House, Aces full of Kings</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
