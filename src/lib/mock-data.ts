// Mock Data Service for Dastyor Super Admin Dashboard

export type SubscriptionTier = 'Basic' | 'Pro' | 'Premium';
export type RestaurantStatus = 'Active' | 'Suspended' | 'Expired';

export interface Restaurant {
  id: string;
  name: string;
  owner: string;
  ownerEmail: string;
  location: string;
  joinDate: string;
  status: RestaurantStatus;
  tier: SubscriptionTier;
  expiryDate: string;
  monthlyRevenue: number;
  totalOrders: number;
}

export interface Transaction {
  id: string;
  restaurantId: string;
  restaurantName: string;
  amount: number;
  date: string;
  tier: SubscriptionTier;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}

export interface SupportTicket {
  id: string;
  restaurantName: string;
  subject: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  type: 'Info' | 'Warning' | 'Error';
  message: string;
}

// Mock Restaurants
export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Golden Spoon',
    owner: 'Ahmad Hassan',
    ownerEmail: 'ahmad@goldenspoon.com',
    location: 'Kabul, Afghanistan',
    joinDate: '2025-01-15',
    status: 'Active',
    tier: 'Premium',
    expiryDate: '2026-01-15',
    monthlyRevenue: 2500,
    totalOrders: 3420
  },
  {
    id: '2',
    name: 'Kabul Kitchen',
    owner: 'Fatima Ahmadi',
    ownerEmail: 'fatima@kabulkitchen.com',
    location: 'Kabul, Afghanistan',
    joinDate: '2025-03-20',
    status: 'Active',
    tier: 'Pro',
    expiryDate: '2026-03-20',
    monthlyRevenue: 1800,
    totalOrders: 2850
  },
  {
    id: '3',
    name: 'Herat Palace Restaurant',
    owner: 'Mohammad Karimi',
    ownerEmail: 'mohammad@heratpalace.com',
    location: 'Herat, Afghanistan',
    joinDate: '2024-11-10',
    status: 'Active',
    tier: 'Premium',
    expiryDate: '2025-11-10',
    monthlyRevenue: 3100,
    totalOrders: 4200
  },
  {
    id: '4',
    name: 'Mazar Delights',
    owner: 'Khalid Rahimi',
    ownerEmail: 'khalid@mazardelights.com',
    location: 'Mazar-i-Sharif, Afghanistan',
    joinDate: '2025-02-05',
    status: 'Suspended',
    tier: 'Basic',
    expiryDate: '2026-02-05',
    monthlyRevenue: 950,
    totalOrders: 1200
  },
  {
    id: '5',
    name: 'Kandahar Cuisine',
    owner: 'Hamid Nazari',
    ownerEmail: 'hamid@kandaharcuisine.com',
    location: 'Kandahar, Afghanistan',
    joinDate: '2024-08-12',
    status: 'Active',
    tier: 'Pro',
    expiryDate: '2025-08-12',
    monthlyRevenue: 2200,
    totalOrders: 2980
  },
  {
    id: '6',
    name: 'Jalalabad Grill',
    owner: 'Noor Ali',
    ownerEmail: 'noor@jalalabadgrill.com',
    location: 'Jalalabad, Afghanistan',
    joinDate: '2025-04-18',
    status: 'Expired',
    tier: 'Basic',
    expiryDate: '2026-01-18',
    monthlyRevenue: 0,
    totalOrders: 850
  },
  {
    id: '7',
    name: 'Silk Road Bistro',
    owner: 'Zainab Hussaini',
    ownerEmail: 'zainab@silkroadbistro.com',
    location: 'Kabul, Afghanistan',
    joinDate: '2025-01-22',
    status: 'Active',
    tier: 'Premium',
    expiryDate: '2026-01-22',
    monthlyRevenue: 2900,
    totalOrders: 3750
  },
  {
    id: '8',
    name: 'Afghan Heritage Cafe',
    owner: 'Rashid Popal',
    ownerEmail: 'rashid@afghanheritagecafe.com',
    location: 'Kabul, Afghanistan',
    joinDate: '2024-12-01',
    status: 'Active',
    tier: 'Pro',
    expiryDate: '2025-12-01',
    monthlyRevenue: 1650,
    totalOrders: 2100
  },
  {
    id: '9',
    name: 'Mountain View Restaurant',
    owner: 'Jamila Safi',
    ownerEmail: 'jamila@mountainview.com',
    location: 'Bamyan, Afghanistan',
    joinDate: '2025-03-10',
    status: 'Active',
    tier: 'Basic',
    expiryDate: '2026-03-10',
    monthlyRevenue: 1100,
    totalOrders: 1450
  },
  {
    id: '10',
    name: 'Pamir Garden',
    owner: 'Abdul Wahid',
    ownerEmail: 'abdul@pamirgarden.com',
    location: 'Faizabad, Afghanistan',
    joinDate: '2024-10-25',
    status: 'Active',
    tier: 'Pro',
    expiryDate: '2025-10-25',
    monthlyRevenue: 1900,
    totalOrders: 2400
  }
];

// Mock Monthly Revenue Data (Last 12 Months)
export const mockMonthlyRevenue: MonthlyRevenue[] = [
  { month: 'May 2025', revenue: 12500 },
  { month: 'Jun 2025', revenue: 14200 },
  { month: 'Jul 2025', revenue: 15800 },
  { month: 'Aug 2025', revenue: 16900 },
  { month: 'Sep 2025', revenue: 18200 },
  { month: 'Oct 2025', revenue: 19500 },
  { month: 'Nov 2025', revenue: 21000 },
  { month: 'Dec 2025', revenue: 22800 },
  { month: 'Jan 2026', revenue: 24100 },
  { month: 'Feb 2026', revenue: 25600 },
  { month: 'Mar 2026', revenue: 27300 },
  { month: 'Apr 2026', revenue: 29100 }
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 'txn_001',
    restaurantId: '1',
    restaurantName: 'The Golden Spoon',
    amount: 2500,
    date: '2026-04-01',
    tier: 'Premium',
    status: 'Completed'
  },
  {
    id: 'txn_002',
    restaurantId: '2',
    restaurantName: 'Kabul Kitchen',
    amount: 1800,
    date: '2026-04-02',
    tier: 'Pro',
    status: 'Completed'
  },
  {
    id: 'txn_003',
    restaurantId: '3',
    restaurantName: 'Herat Palace Restaurant',
    amount: 3100,
    date: '2026-04-03',
    tier: 'Premium',
    status: 'Completed'
  },
  {
    id: 'txn_004',
    restaurantId: '5',
    restaurantName: 'Kandahar Cuisine',
    amount: 2200,
    date: '2026-04-05',
    tier: 'Pro',
    status: 'Pending'
  },
  {
    id: 'txn_005',
    restaurantId: '7',
    restaurantName: 'Silk Road Bistro',
    amount: 2900,
    date: '2026-04-06',
    tier: 'Premium',
    status: 'Completed'
  }
];

// Mock Support Tickets
export const mockSupportTickets: SupportTicket[] = [
  {
    id: 'ticket_001',
    restaurantName: 'Kabul Kitchen',
    subject: 'Payment gateway not working',
    status: 'Open',
    priority: 'High',
    createdAt: '2026-04-22T10:30:00Z'
  },
  {
    id: 'ticket_002',
    restaurantName: 'Mountain View Restaurant',
    subject: 'Need help with inventory management',
    status: 'In Progress',
    priority: 'Medium',
    createdAt: '2026-04-21T14:15:00Z'
  },
  {
    id: 'ticket_003',
    restaurantName: 'Herat Palace Restaurant',
    subject: 'Request for feature: custom menu categories',
    status: 'Open',
    priority: 'Low',
    createdAt: '2026-04-20T09:00:00Z'
  },
  {
    id: 'ticket_004',
    restaurantName: 'Afghan Heritage Cafe',
    subject: 'Cannot generate monthly reports',
    status: 'Resolved',
    priority: 'Medium',
    createdAt: '2026-04-19T16:45:00Z'
  }
];

// Mock System Logs
export const mockSystemLogs: SystemLog[] = [
  {
    id: 'log_001',
    timestamp: '2026-04-23T08:15:23Z',
    type: 'Info',
    message: 'Restaurant "The Golden Spoon" connected to WebSocket'
  },
  {
    id: 'log_002',
    timestamp: '2026-04-23T08:20:45Z',
    type: 'Info',
    message: 'Payment received from Restaurant "Silk Road Bistro" - Amount: $2900'
  },
  {
    id: 'log_003',
    timestamp: '2026-04-23T08:25:12Z',
    type: 'Warning',
    message: 'Restaurant "Mazar Delights" exceeded API rate limit'
  },
  {
    id: 'log_004',
    timestamp: '2026-04-23T08:30:00Z',
    type: 'Info',
    message: 'Subscription renewed for Restaurant "Kabul Kitchen"'
  },
  {
    id: 'log_005',
    timestamp: '2026-04-23T08:35:18Z',
    type: 'Error',
    message: 'Failed to process payment for Restaurant "Kandahar Cuisine"'
  },
  {
    id: 'log_006',
    timestamp: '2026-04-23T08:40:33Z',
    type: 'Info',
    message: 'New restaurant "Pamir Garden" registered successfully'
  }
];

// Analytics Summary
export const getAnalyticsSummary = () => {
  const totalRevenue = mockRestaurants.reduce((sum, r) => sum + r.monthlyRevenue, 0);
  const totalRestaurants = mockRestaurants.length;
  const activeSubscriptions = mockRestaurants.filter(r => r.status === 'Active').length;
  const totalOrders = mockRestaurants.reduce((sum, r) => sum + r.totalOrders, 0);

  return {
    totalRevenue,
    totalRestaurants,
    activeSubscriptions,
    totalOrders
  };
};

// Subscription Tier Distribution
export const getSubscriptionDistribution = () => {
  const distribution = mockRestaurants.reduce((acc, restaurant) => {
    acc[restaurant.tier] = (acc[restaurant.tier] || 0) + 1;
    return acc;
  }, {} as Record<SubscriptionTier, number>);

  return Object.entries(distribution).map(([tier, count]) => ({
    tier,
    count
  }));
};

// Top Performing Restaurants
export const getTopRestaurants = (limit: number = 5) => {
  return [...mockRestaurants]
    .sort((a, b) => b.totalOrders - a.totalOrders)
    .slice(0, limit)
    .map(r => ({
      name: r.name,
      orders: r.totalOrders
    }));
};
