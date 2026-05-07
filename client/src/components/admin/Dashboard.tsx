import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const lineData = [
  { name: '1', rev: 4000 }, { name: '2', rev: 3000 }, { name: '3', rev: 2000 },
  { name: '4', rev: 2780 }, { name: '5', rev: 1890 }, { name: '6', rev: 2390 },
  { name: '7', rev: 3490 },
];

const barData = [
  { name: 'Jan', current: 4000, previous: 2400 },
  { name: 'Feb', current: 3000, previous: 1398 },
  { name: 'Mar', current: 2000, previous: 9800 },
];

const pieData = [
  { name: 'Micro (10/20)', value: 400 },
  { name: 'Low (20/40)', value: 300 },
  { name: 'Mid (50/100)', value: 300 },
  { name: 'High (500/1000)', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    liquidity: 0,
    revenue: 0,
    activeGames: 0,
    pending: 0
  });

  useEffect(() => {
    // Simulate animated counters
    let start = 0;
    const end = { liquidity: 1250000, revenue: 3450, activeGames: 42, pending: 7 };
    const duration = 1000;
    const interval = 20;
    const steps = duration / interval;

    const timer = setInterval(() => {
      start += 1;
      setMetrics({
        liquidity: Math.floor((end.liquidity / steps) * start),
        revenue: Math.floor((end.revenue / steps) * start),
        activeGames: Math.floor((end.activeGames / steps) * start),
        pending: Math.floor((end.pending / steps) * start),
      });

      if (start >= steps) {
        clearInterval(timer);
        setMetrics(end);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm">
          <h3 className="text-gray-400 text-sm font-semibold mb-1">Total Platform Liquidity</h3>
          <p className="text-3xl text-blue-400 font-bold tracking-tight">
            ${metrics.liquidity.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm">
          <h3 className="text-gray-400 text-sm font-semibold mb-1">Today's Revenue (Rake)</h3>
          <p className="text-3xl text-green-400 font-bold tracking-tight">
            ${metrics.revenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm">
          <h3 className="text-gray-400 text-sm font-semibold mb-1">Active Games</h3>
          <p className="text-3xl text-purple-400 font-bold tracking-tight">
            {metrics.activeGames}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm relative">
          <h3 className="text-gray-400 text-sm font-semibold mb-1">Pending Approvals</h3>
          <p className="text-3xl text-yellow-400 font-bold tracking-tight">
            {metrics.pending}
          </p>
          {metrics.pending > 0 && (
            <span className="absolute top-4 right-4 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-white font-bold mb-4">Daily Revenue (Last 7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                <Line type="monotone" dataKey="rev" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-white font-bold mb-4">Revenue by Tier</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-white font-bold">Recent Transactions (Last 20)</h3>
        </div>
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-gray-900 text-xs uppercase">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3,4,5].map(i => (
              <tr key={i} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="px-4 py-3 font-mono text-xs">tx_{Math.random().toString(36).substr(2, 9)}</td>
                <td className="px-4 py-3 text-white">Player_{i * 123}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${i % 2 === 0 ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'}`}>
                    {i % 2 === 0 ? 'Deposit' : 'Withdrawal'}
                  </span>
                </td>
                <td className="px-4 py-3">${(i * 150).toFixed(2)}</td>
                <td className="px-4 py-3">Just now</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
