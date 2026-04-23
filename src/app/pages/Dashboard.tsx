import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  DollarSign,
  Store,
  CreditCard,
  ShoppingCart,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  getAnalyticsSummary,
  mockMonthlyRevenue,
  getTopRestaurants,
  getSubscriptionDistribution
} from '../../lib/mock-data';

const COLORS = {
  Basic: '#94a3b8',
  Pro: '#3b82f6',
  Premium: '#8b5cf6'
};

export default function Dashboard() {
  const analytics = getAnalyticsSummary();
  const topRestaurants = getTopRestaurants();
  const subscriptionDistribution = getSubscriptionDistribution();

  const stats = [
    {
      title: 'Jami Daromad (Oylik)',
      value: `${analytics.totalRevenue.toLocaleString()} so'm`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Jami Restoranlar',
      value: analytics.totalRestaurants,
      change: '+3 shu oyda',
      trend: 'up',
      icon: Store,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Faol Obunalar',
      value: analytics.activeSubscriptions,
      change: `${analytics.totalRestaurants - analytics.activeSubscriptions} nofaol`,
      trend: 'neutral',
      icon: CreditCard,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Jami Buyurtmalar',
      value: analytics.totalOrders.toLocaleString(),
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    }
  ];

  return (
    <div className="p-8 space-y-8 bg-slate-50 dark:bg-[#121828] min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Boshqaruv Paneli</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Dastyor Super Admin Paneliga xush kelibsiz</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white dark:bg-[#1a2332] border-slate-200 dark:border-[#2a3441] hover:bg-slate-50 dark:hover:bg-[#1d2c47] transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600 dark:text-slate-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    <div className="flex items-center gap-1 text-sm">
                      {stat.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />}
                      {stat.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500 dark:text-red-400" />}
                      <span className={stat.trend === 'up' ? 'text-green-500 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white dark:bg-[#1a2332] border-slate-200 dark:border-[#2a3441] hover:bg-slate-50 dark:hover:bg-[#1d2c47] transition-all">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Daromad O'sishi (So'nggi 12 Oy)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockMonthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3441" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a2332', border: '1px solid #2a3441', borderRadius: '8px', color: '#fff' }}
                    formatter={(value: number) => [`${value.toLocaleString()} so'm`, 'Daromad']}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Performing Restaurants */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white dark:bg-[#1a2332] border-slate-200 dark:border-[#2a3441] hover:bg-slate-50 dark:hover:bg-[#1d2c47] transition-all">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Eng Yaxshi 5 Restoran</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topRestaurants}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3441" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} angle={-15} textAnchor="end" height={80} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a2332', border: '1px solid #2a3441', borderRadius: '8px', color: '#fff' }}
                    formatter={(value: number) => [value.toLocaleString(), 'Buyurtmalar']}
                  />
                  <Bar dataKey="orders" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subscription Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-white dark:bg-[#1a2332] border-slate-200 dark:border-[#2a3441] hover:bg-slate-50 dark:hover:bg-[#1d2c47] transition-all">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Obuna Turlari Taqsimoti</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subscriptionDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ tier, count }) => `${tier}: ${count}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {subscriptionDistribution.map((entry) => (
                      <Cell key={entry.tier} fill={COLORS[entry.tier as keyof typeof COLORS]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1a2332', border: '1px solid #2a3441', borderRadius: '8px', color: '#fff' }} />
                  <Legend wrapperStyle={{ color: '#94a3b8' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-white dark:bg-[#1a2332] border-slate-200 dark:border-[#2a3441] hover:bg-slate-50 dark:hover:bg-[#1d2c47] transition-all">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Tezkor Ma'lumotlar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-[#2a3441]">
                <span className="text-sm text-slate-600 dark:text-slate-400">O'rtacha Daromad (Restoran)</span>
                <span className="text-lg font-semibold text-slate-900 dark:text-white">
                  {Math.round(analytics.totalRevenue / analytics.totalRestaurants).toLocaleString()} so'm
                </span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-[#2a3441]">
                <span className="text-sm text-slate-600 dark:text-slate-400">O'rtacha Buyurtmalar (Restoran)</span>
                <span className="text-lg font-semibold text-slate-900 dark:text-white">
                  {Math.round(analytics.totalOrders / analytics.totalRestaurants).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-[#2a3441]">
                <span className="text-sm text-slate-600 dark:text-slate-400">Obuna Yangilanish Darajasi</span>
                <span className="text-lg font-semibold text-green-600 dark:text-green-400">94.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Mijozlar Qoniqishi</span>
                <span className="text-lg font-semibold text-green-600 dark:text-green-400">4.8/5.0</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
