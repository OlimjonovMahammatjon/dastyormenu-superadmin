import { createBrowserRouter } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Restaurants from './pages/Restaurants';
import Billing from './pages/Billing';
import Support from './pages/Support';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'restaurants', Component: Restaurants },
      { path: 'billing', Component: Billing },
      { path: 'support', Component: Support },
      { path: 'settings', Component: Settings },
      { path: '*', Component: NotFound },
    ],
  },
]);
