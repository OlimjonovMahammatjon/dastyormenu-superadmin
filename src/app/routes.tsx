import { createBrowserRouter, Navigate } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import RestaurantsNew from './pages/RestaurantsNew';
import Billing from './pages/Billing';
import Support from './pages/Support';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Dashboard },
      { path: 'restaurants', Component: RestaurantsNew },
      { path: 'billing', Component: Billing },
      { path: 'support', Component: Support },
      { path: 'settings', Component: Settings },
      { path: 'profile', Component: Profile },
      { path: '*', Component: NotFound },
    ],
  },
]);
