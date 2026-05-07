import React, { useState, useEffect } from 'react';
import { Redirect, Switch, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from '../components/admin/Dashboard';
import ApprovalQueue from '../components/admin/ApprovalQueue';
import UserSearch from '../components/admin/UserSearch';
import SpectatorView from '../components/admin/SpectatorView';
import AlertsPanel from '../components/admin/AlertsPanel';

// Mock simple icons
const Activity = () => <span role="img" aria-label="activity">📊</span>;
const Users = () => <span role="img" aria-label="users">👥</span>;
const CheckSquare = () => <span role="img" aria-label="check square">✅</span>;
const Eye = () => <span role="img" aria-label="eye">👁️</span>;
const AlertTriangle = () => <span role="img" aria-label="alert triangle">⚠️</span>;

// Mock context for user
const mockUser = { isAdmin: true };

const AdminDashboard = () => {
  const location = useLocation();
  const [stats, setStats] = useState({ online: 0, games: 0 });

  useEffect(() => {
    // In a real app, subscribe to websocket for real-time stats
    const interval = setInterval(() => {
      setStats({
        online: Math.floor(Math.random() * 1000) + 500,
        games: Math.floor(Math.random() * 50) + 10
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!mockUser || !mockUser.isAdmin) {
    return <Redirect to="/" />;
  }

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: Activity, exact: true },
    { path: '/admin/approvals', label: 'Approvals', icon: CheckSquare },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/monitor', label: 'Game Monitor', icon: Eye },
    { path: '/admin/alerts', label: 'Alerts', icon: AlertTriangle },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-400">Admin Portal</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header ticker */}
        <header className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center shadow-sm">
          <div className="text-sm font-mono text-green-400">
            System Normal
          </div>
          <div className="flex gap-6 text-sm">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> {stats.online} Users Online</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> {stats.games} Active Games</span>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <div className="flex-1 overflow-auto p-6 bg-gray-900">
          <Switch>
            <Route exact path="/admin" component={Dashboard} />
            <Route path="/admin/approvals" component={ApprovalQueue} />
            <Route path="/admin/users" component={UserSearch} />
            <Route path="/admin/monitor" component={SpectatorView} />
            <Route path="/admin/alerts" component={AlertsPanel} />
          </Switch>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
