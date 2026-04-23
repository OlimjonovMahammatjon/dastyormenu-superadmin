import { Outlet, NavLink, useNavigate, useLocation } from 'react-router';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Store,
  CreditCard,
  Settings,
  HelpCircle,
  Menu,
  LogOut,
  User,
  Moon,
  Sun,
  Bell,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { cn } from '../components/ui/utils';
import { toast } from 'sonner';
import { useTheme } from '../../contexts/ThemeContext';

const navigation = [
  { name: 'Boshqaruv Paneli', href: '/', icon: LayoutDashboard },
  { name: 'Restoranlar', href: '/restaurants', icon: Store },
  { name: 'To\'lovlar', href: '/billing', icon: CreditCard },
  { name: 'Yordam', href: '/support', icon: HelpCircle },
  { name: 'Sozlamalar', href: '/settings', icon: Settings },
  { name: 'Profil', href: '/profile', icon: User },
];

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast.success('Tizimdan chiqdingiz');
    navigate('/login');
  };

  const currentPage = navigation.find(item => item.href === location.pathname);

  return (
    <div className="flex h-screen bg-white dark:bg-[#121828]">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0, width: sidebarCollapsed ? 80 : 280 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
        className="bg-white dark:bg-[#1a2332] border-r border-slate-200 dark:border-[#2a3441] flex flex-col"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-[#2a3441]">
          {!sidebarCollapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-white text-lg">Dastyor</span>
            </motion.div>
          ) : (
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">D</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1d2c47] hover:text-slate-900 dark:hover:text-white'
                  )
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="font-medium text-sm">{item.name}</span>}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-slate-200 dark:border-[#2a3441]">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-100 dark:bg-[#252d3f] hover:bg-slate-200 dark:hover:bg-[#1d2c47] transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">Super Admin</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">admin@dastyor.uz</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mx-auto cursor-pointer">
              <User className="h-5 w-5 text-white" />
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="h-16 bg-white dark:bg-[#1a2332] border-b border-slate-200 dark:border-[#2a3441] flex items-center justify-between px-6"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1d2c47]"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {currentPage?.name || 'Dashboard'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1d2c47]"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1d2c47] relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* Logout */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-slate-600 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-50 dark:bg-[#121828]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
