import { Outlet, NavLink, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  Store,
  CreditCard,
  Settings,
  HelpCircle,
  Menu,
  LogOut,
  ChevronLeft
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { cn } from '../components/ui/utils';
import { toast } from 'sonner';

const navigation = [
  { name: 'Boshqaruv Paneli', href: '/', icon: LayoutDashboard },
  { name: 'Restoranlar', href: '/restaurants', icon: Store },
  { name: 'To\'lovlar', href: '/billing', icon: CreditCard },
  { name: 'Yordam', href: '/support', icon: HelpCircle },
  { name: 'Sozlamalar', href: '/settings', icon: Settings },
];

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast.success('Tizimdan chiqdingiz');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={cn(
          'bg-white border-r border-gray-200 transition-all duration-300 flex flex-col',
          sidebarCollapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Logo & Title */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="font-semibold text-gray-900">Dastyor Admin</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="h-8 w-8"
          >
            {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                )
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className={cn('flex items-center', sidebarCollapsed ? 'justify-center' : 'gap-3')}>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Super Admin</p>
                <p className="text-xs text-gray-500 truncate">admin@dastyor.uz</p>
              </div>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={handleLogout}>
              <LogOut className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
