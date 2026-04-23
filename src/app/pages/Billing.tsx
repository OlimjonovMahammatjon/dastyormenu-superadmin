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

const statusLabels = {
  Completed: 'Bajarildi',
  Pending: 'Kutilmoqda',
  Failed: 'Xatolik'
};

const tierPricing = {
  Basic: 999,
  Pro: 1800,
  Premium: 2900
};

const tierLabels = {
  Basic: 'Oddiy',
  Pro: 'Professional',
  Premium: 'Premium'
};

const tierFeatures = {
  Basic: ['Oyiga 50 tagacha buyurtma', 'Asosiy statistika', 'Email yordam'],
  Pro: ['Oyiga 200 tagacha buyurtma', 'Kengaytirilgan statistika', 'Ustuvor yordam', 'Inventar boshqaruvi'],
  Premium: ['Cheksiz buyurtmalar', 'Real-vaqt statistika', '24/7 yordam', 'Ko\'p filial', 'API kirish']
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
    toast.success(`${tierLabels[selectedTier as keyof typeof tierLabels]} obuna sozlamalari yangilandi`);
  };

  return (
    <div className="p-8 space-y-6 bg-slate-50 dark:bg-[#121828] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">To'lovlar va Obunalar</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Tranzaksiyalar va obuna turlarini boshqaring</p>
        </div>
        <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
          <DialogTrigger asChild>
            <Button>Obunalarni Sozlash</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Obuna Turlari Sozlamalari</DialogTitle>
              <DialogDescription>
                Har bir obuna turi uchun xususiyatlar va narxlarni belgilang
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label>Obuna Turini Tanlang</Label>
                <Select value={selectedTier} onValueChange={setSelectedTier}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Oddiy - {tierPricing.Basic} so'm/oy</SelectItem>
                    <SelectItem value="Pro">Professional - {tierPricing.Pro} so'm/oy</SelectItem>
                    <SelectItem value="Premium">Premium - {tierPricing.Premium} so'm/oy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{tierLabels[selectedTier as keyof typeof tierLabels]} Obuna Xususiyatlari</Label>
                <div className="mt-2 space-y-2">
                  {tierFeatures[selectedTier as keyof typeof tierFeatures].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">✓ {feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={handleSaveTierConfig} className="w-full">
                Sozlamalarni Saqlash
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-[#1a2332] border-slate-200 dark:border-[#2a3441] hover:bg-slate-50 dark:hover:bg-[#1d2c47] transition-all">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">Jami Daromad</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalRevenue.toLocaleString()} so'm</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#0f1419] border-slate-200 dark:border-[#1e2530]">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">Kutilayotgan To'lovlar</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{pendingRevenue.toLocaleString()} so'm</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-50">
                <CreditCard className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#0f1419] border-slate-200 dark:border-[#1e2530]">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">Jami Tranzaksiyalar</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{transactions.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#0f1419] border-slate-200 dark:border-[#1e2530]">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">Shu Oy</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {transactions.filter(t => t.status === 'Completed').length > 0
                    ? Math.round(totalRevenue / transactions.filter(t => t.status === 'Completed').length * 12).toLocaleString()
                    : 0} so'm
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
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Obuna Turlari</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(tierPricing).map(([tier, price]) => (
            <Card key={tier} className="bg-white dark:bg-[#1a2332] border-2 border-slate-200 dark:border-[#2a3441] hover:bg-slate-50 dark:hover:bg-[#1d2c47] transition-all">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{tierLabels[tier as keyof typeof tierLabels]}</span>
                  <Badge variant="outline">{price} so'm/oy</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tierFeatures[tier as keyof typeof tierFeatures].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="text-blue-600 dark:text-blue-400">✓</span>
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
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Tranzaksiyalar Tarixi</h2>
        <div className="bg-white dark:bg-[#1a2332] rounded-lg border border-slate-200 dark:border-[#2a3441]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tranzaksiya ID</TableHead>
                <TableHead>Restoran</TableHead>
                <TableHead>Summa</TableHead>
                <TableHead>Obuna</TableHead>
                <TableHead>Sana</TableHead>
                <TableHead>Holat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                  <TableCell className="font-medium">{transaction.restaurantName}</TableCell>
                  <TableCell className="font-semibold">{transaction.amount.toLocaleString()} so'm</TableCell>
                  <TableCell>
                    <Badge variant="outline">{tierLabels[transaction.tier as keyof typeof tierLabels]}</Badge>
                  </TableCell>
                  <TableCell>{new Date(transaction.date).toLocaleDateString('uz-UZ')}</TableCell>
                  <TableCell>
                    <Badge
                      className={statusColors[transaction.status]}
                      variant="secondary"
                    >
                      {statusLabels[transaction.status]}
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
