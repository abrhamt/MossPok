import React from 'react';

const AlertTriangle = () => <span role="img" aria-label="alert">⚠️</span>;
const Info = () => <span role="img" aria-label="info">ℹ️</span>;
const ShieldAlert = () => <span role="img" aria-label="shield alert">🛡️</span>;

const mockAlerts = [
  { id: 1, type: 'collusion', severity: 'high', msg: 'IP Collusion: Users Player_A, Player_B sharing IP in Room #123', time: '10 mins ago' },
  { id: 2, type: 'winrate', severity: 'medium', msg: 'Suspicious Win Rate: User Shark (87% over 200 hands)', time: '1 hour ago' },
  { id: 3, type: 'dumping', severity: 'high', msg: 'Chip Dumping: User Loser transferred 50,000 to User Winner in 5 hands', time: '2 hours ago' },
  { id: 4, type: 'balance', severity: 'low', msg: 'Rapid Balance Change: User Lucky (+500% in 1 hour)', time: '3 hours ago' },
];

const AlertsPanel = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Behavioral Alerts</h2>

      <div className="space-y-4">
        {mockAlerts.map(alert => (
          <div key={alert.id} className="bg-gray-800 border-l-4 border-gray-700 p-4 rounded-r-lg flex items-start justify-between shadow-sm"
               style={{ borderLeftColor: alert.severity === 'high' ? '#EF4444' : alert.severity === 'medium' ? '#F59E0B' : '#3B82F6' }}>
            <div className="flex gap-4 items-start">
              <div className={`mt-1 ${alert.severity === 'high' ? 'text-red-500' : alert.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'}`}>
                {alert.severity === 'high' ? <ShieldAlert /> : alert.severity === 'medium' ? <AlertTriangle /> : <Info />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${
                    alert.severity === 'high' ? 'bg-red-900 text-red-300' :
                    alert.severity === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-blue-900 text-blue-300'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="text-gray-500 text-xs">{alert.time}</span>
                </div>
                <p className="text-white text-sm">{alert.msg}</p>
              </div>
            </div>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm font-bold transition-colors">
              Investigate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
