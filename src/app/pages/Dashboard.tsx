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
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Jami Restoranlar',
      value: analytics.totalRestaurants,
      change: '+3 shu oyda',
      trend: 'up',
      icon: Store,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Faol Obunalar',
      value: analytics.activeSubscriptions,
      change: `${analytics.totalRestaurants - analytics.activeSubscriptions} nofaol`,
      trend: 'neutral',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Jami Buyurtmalar',
      value: analytics.totalOrders.toLocaleString(),
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Boshqaruv Paneli</h1>
        <p className="text-gray-500 mt-1">Dastyor Super Admin Paneliga xush kelibsiz</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center gap-1 text-sm">
                    {stat.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
                    {stat.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
                    <span className={stat.trend === 'up' ? 'text-green-600' : 'text-gray-500'}>
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
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daromad O'sishi (So'nggi 12 Oy)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockMonthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value.toLocaleString()} so'm`, 'Daromad']}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ fill: '#2563eb', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performing Restaurants */}
        <Card>
          <CardHeader>
            <CardTitle>Eng Yaxshi 5 Restoran</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topRestaurants}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-15} textAnchor="end" height={80} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value: number) => [value.toLocaleString(), 'Buyurtmalar']}
                />
                <Bar dataKey="orders" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subscription Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Obuna Turlari Taqsimoti</CardTitle>
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
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Tezkor Ma'lumotlar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b">
              <span className="text-sm text-gray-600">O'rtacha Daromad (Restoran)</span>
              <span className="text-lg font-semibold text-gray-900">
                {Math.round(analytics.totalRevenue / analytics.totalRestaurants).toLocaleString()} so'm
              </span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b">
              <span className="text-sm text-gray-600">O'rtacha Buyurtmalar (Restoran)</span>
              <span className="text-lg font-semibold text-gray-900">
                {Math.round(analytics.totalOrders / analytics.totalRestaurants).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b">
              <span className="text-sm text-gray-600">Obuna Yangilanish Darajasi</span>
              <span className="text-lg font-semibold text-green-600">94.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Mijozlar Qoniqishi</span>
              <span className="text-lg font-semibold text-green-600">4.8/5.0</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
