import React, { useState } from 'react';

const mockRooms = [
  { id: 'room_1', name: 'Micro Stakes (10/20)', players: 6, pot: 450 },
  { id: 'room_2', name: 'High Roller (500/1000)', players: 4, pot: 12500 },
];

const SpectatorView = () => {
  const [spectating, setSpectating] = useState<any>(null);

  if (spectating) {
    return (
      <div className="relative h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">God Mode Spectator: {spectating}</h2>
          <button
            onClick={() => setSpectating(null)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Exit Spectate
          </button>
        </div>

        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-600 text-white font-bold px-4 py-1 rounded-full z-50 animate-pulse border-2 border-red-400">
          ADMIN SPECTATING - SESSION LOGGED
        </div>

        <div className="flex-1 bg-green-900 border-4 border-green-800 rounded-3xl relative overflow-hidden flex items-center justify-center">
          <div className="text-center text-white opacity-50">
            <p>Game Canvas Placeholder</p>
            <p className="text-sm">All hole cards, IPs, and balances are visible to Admin.</p>
          </div>

          {/* Mock Player UI with God Mode Info */}
          <div className="absolute bottom-10 right-1/4 bg-black bg-opacity-80 p-2 rounded text-xs text-green-400 border border-red-500">
            <p>User: Player_1</p>
            <p>Bal: $5,400</p>
            <p>IP: 192.168.1.5</p>
            <div className="flex gap-1 mt-1">
              <span className="bg-white text-black px-1 rounded font-bold">A♠</span>
              <span className="bg-white text-black px-1 rounded font-bold">K♠</span>
            </div>
          </div>
        </div>

        <div className="h-48 mt-4 bg-gray-900 border border-gray-700 rounded p-4 overflow-y-auto font-mono text-xs">
          <h3 className="text-white mb-2">Action Log</h3>
          <p className="text-gray-400">[14:32:01] Player_1 (192.168.1.5) raised to 200</p>
          <p className="text-gray-400">[14:32:05] Player_2 (10.0.0.4) folded</p>
          <p className="text-gray-400">[14:32:10] Player_3 (172.16.0.2) called 200</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Active Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockRooms.map(room => (
          <div key={room.id} className="bg-gray-800 border border-gray-700 p-4 rounded-lg flex flex-col justify-between hover:border-blue-500 transition-colors">
            <div>
              <h3 className="text-lg font-bold text-white">{room.name}</h3>
              <p className="text-gray-400 text-sm">Players: {room.players}/6</p>
              <p className="text-green-400 text-sm font-bold">Current Pot: ${room.pot}</p>
            </div>
            <button
              onClick={() => setSpectating(room.id)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center gap-2"
            >
              Enter God Mode
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpectatorView;
