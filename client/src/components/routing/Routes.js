import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Lobby from '../../pages/Lobby';
import RegistrationPage from '../../pages/RegistrationPage';
import LoginPage from '../../pages/LoginPage';
import Dashboard from '../../pages/Dashboard';
import Play from '../../pages/Play';
import ProtectedRoute from './ProtectedRoute';
import StaticPage from '../../pages/StaticPage';
import NotFoundPage from '../../pages/NotFoundPage';
import contentContext from '../../context/content/contentContext';
import AdminDashboard from '../../pages/AdminDashboard';

// Mocks for compilation
const MockPremium = () => <div>Premium Upgrade Page</div>;
const MockProfile = () => <div>User Profile</div>;
const MockGameRoom = () => <div>Game Room</div>;

const Routes = () => {
  const { staticPages } = useContext(contentContext);

  return (
    <Switch>
      <Route path="/" exact component={Lobby} />
      <Route path="/register" component={RegistrationPage} />
      <Route path="/login" component={LoginPage} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />

      {/* New Routes */}
      <ProtectedRoute path="/admin" component={AdminDashboard} />
      <ProtectedRoute path="/game/:roomId" component={MockGameRoom} />
      <ProtectedRoute path="/profile" component={MockProfile} />
      <Route path="/premium" component={MockPremium} />
      {staticPages &&
        staticPages.map((page) => (
          <Route
            key={page.slug}
            path={`/${page.slug}`}
            component={() => (
              <StaticPage title={page.title} content={page.content} />
            )}
          />
        ))}
      <ProtectedRoute path="/play" component={Play} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
