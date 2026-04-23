import { useState } from 'react';
import { mockTransactions, Transaction } from '../../lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { DollarSign, CreditCard, TrendingUp, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const statusColors = {
  Completed: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Failed: 'bg-red-100 text-red-700'
};

const tierPricing = {
  Basic: 999,
  Pro: 1800,
  Premium: 2900
};

const tierFeatures = {
  Basic: ['Up to 50 orders/month', 'Basic analytics', 'Email support'],
  Pro: ['Up to 200 orders/month', 'Advanced analytics', 'Priority support', 'Inventory management'],
  Premium: ['Unlimited orders', 'Real-time analytics', '24/7 support', 'Multi-location', 'API access']
};

export default function Billing() {
  const [transactions] = useState(mockTransactions);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('Basic');

  const totalRevenue = transactions
    .filter(t => t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingRevenue = transactions
    .filter(t => t.status === 'Pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleSaveTierConfig = () => {
    setIsConfigDialogOpen(false);
    toast.success(`${selectedTier} tier configuration updated`);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Subscriptions</h1>
          <p className="text-gray-500 mt-1">Manage transactions and subscription tiers</p>
        </div>
        <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
          <DialogTrigger asChild>
            <Button>Configure Tiers</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Subscription Tier Configuration</DialogTitle>
              <DialogDescription>
                Define features and pricing for each subscription tier
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label>Select Tier</Label>
                <Select value={selectedTier} onValueChange={setSelectedTier}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic - ${tierPricing.Basic}/month</SelectItem>
                    <SelectItem value="Pro">Pro - ${tierPricing.Pro}/month</SelectItem>
                    <SelectItem value="Premium">Premium - ${tierPricing.Premium}/month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Features for {selectedTier} Tier</Label>
                <div className="mt-2 space-y-2">
                  {tierFeatures[selectedTier as keyof typeof tierFeatures].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">✓ {feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={handleSaveTierConfig} className="w-full">
                Save Configuration
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-900">${pendingRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-50">
                <CreditCard className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${transactions.filter(t => t.status === 'Completed').length > 0
                    ? Math.round(totalRevenue / transactions.filter(t => t.status === 'Completed').length * 12).toLocaleString()
                    : 0}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Tiers Overview */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscription Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(tierPricing).map(([tier, price]) => (
            <Card key={tier} className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{tier}</span>
                  <Badge variant="outline">${price}/mo</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tierFeatures[tier as keyof typeof tierFeatures].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-blue-600">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Transaction History</h2>
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Restaurant</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                  <TableCell className="font-medium">{transaction.restaurantName}</TableCell>
                  <TableCell className="font-semibold">${transaction.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{transaction.tier}</Badge>
                  </TableCell>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      className={statusColors[transaction.status]}
                      variant="secondary"
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
