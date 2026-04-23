import { useState } from 'react';
import { mockRestaurants, Restaurant, RestaurantStatus } from '../../lib/mock-data';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import {
  Search,
  Plus,
  Edit,
  UserCircle,
  Power,
  MoreVertical,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  ShoppingCart,
  Mail,
  User
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { toast } from 'sonner';

const statusColors: Record<RestaurantStatus, string> = {
  Active: 'bg-green-100 text-green-700',
  Suspended: 'bg-red-100 text-red-700',
  Expired: 'bg-gray-100 text-gray-700'
};

const statusLabels: Record<RestaurantStatus, string> = {
  Active: 'Faol',
  Suspended: 'To\'xtatilgan',
  Expired: 'Muddati o\'tgan'
};

const tierColors = {
  Basic: 'bg-gray-100 text-gray-700 border-gray-300',
  Pro: 'bg-blue-100 text-blue-700 border-blue-300',
  Premium: 'bg-purple-100 text-purple-700 border-purple-300'
};

export default function RestaurantsNew() {
  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    owner: '',
    ownerEmail: '',
    location: '',
    tier: 'Basic' as const
  });

  // Filter restaurants
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || restaurant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddRestaurant = () => {
    if (!newRestaurant.name || !newRestaurant.owner || !newRestaurant.ownerEmail || !newRestaurant.location) {
      toast.error('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    const restaurant: Restaurant = {
      id: `${restaurants.length + 1}`,
      ...newRestaurant,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      monthlyRevenue: 0,
      totalOrders: 0
    };
    setRestaurants([...restaurants, restaurant]);
    setIsAddDialogOpen(false);
    setNewRestaurant({ name: '', owner: '', ownerEmail: '', location: '', tier: 'Basic' });
    toast.success(`"${restaurant.name}" muvaffaqiyatli qo'shildi`);
  };

  const handleToggleStatus = (restaurant: Restaurant) => {
    const newStatus: RestaurantStatus = restaurant.status === 'Active' ? 'Suspended' : 'Active';
    setRestaurants(restaurants.map(r =>
      r.id === restaurant.id ? { ...r, status: newStatus } : r
    ));
    toast.success(`"${restaurant.name}" ${newStatus === 'Active' ? 'faollashtirildi' : 'to\'xtatildi'}`);
  };

  const handleLoginAs = (restaurant: Restaurant) => {
    toast.info(`${restaurant.name} sifatida kirish...`, {
      description: 'Bu restoran boshqaruv paneliga yo\'naltiradi'
    });
  };

  const handleEditRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsEditDialogOpen(true);
  };

  const saveEdit = () => {
    if (selectedRestaurant) {
      setRestaurants(restaurants.map(r =>
        r.id === selectedRestaurant.id ? selectedRestaurant : r
      ));
      setIsEditDialogOpen(false);
      toast.success(`"${selectedRestaurant.name}" yangilandi`);
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Restoranlar Boshqaruvi</h1>
          <p className="text-gray-500 mt-1">Barcha restoranlar va ularning obunalarini boshqaring</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 h-11 px-6">
              <Plus className="h-5 w-5" />
              Restoran Qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Yangi Restoran Qo'shish</DialogTitle>
              <DialogDescription>Yangi restoran ma'lumotlarini kiriting</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="name">Restoran Nomi *</Label>
                <Input
                  id="name"
                  value={newRestaurant.name}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
                  placeholder="Masalan: Oltin Qoshiq"
                />
              </div>
              <div>
                <Label htmlFor="owner">Egasi *</Label>
                <Input
                  id="owner"
                  value={newRestaurant.owner}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, owner: e.target.value })}
                  placeholder="Masalan: Ahmad Hasanov"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Manzil *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newRestaurant.ownerEmail}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, ownerEmail: e.target.value })}
                  placeholder="Masalan: ahmad@example.com"
                />
              </div>
              <div>
                <Label htmlFor="location">Manzil *</Label>
                <Input
                  id="location"
                  value={newRestaurant.location}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, location: e.target.value })}
                  placeholder="Masalan: Toshkent, O'zbekiston"
                />
              </div>
              <div>
                <Label htmlFor="tier">Obuna Turi *</Label>
                <Select
                  value={newRestaurant.tier}
                  onValueChange={(value) => setNewRestaurant({ ...newRestaurant, tier: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Oddiy</SelectItem>
                    <SelectItem value="Pro">Professional</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddRestaurant} className="w-full h-11">
                Restoran Qo'shish
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Restoran nomi yoki egasi bo'yicha qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48 h-11">
              <SelectValue placeholder="Holat bo'yicha filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha Holatlar</SelectItem>
              <SelectItem value="Active">Faol</SelectItem>
              <SelectItem value="Suspended">To'xtatilgan</SelectItem>
              <SelectItem value="Expired">Muddati o'tgan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <Card key={restaurant.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{restaurant.name}</CardTitle>
                  <Badge className={`${tierColors[restaurant.tier]} border`} variant="outline">
                    {restaurant.tier === 'Basic' ? 'Oddiy' : restaurant.tier === 'Pro' ? 'Professional' : 'Premium'}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditRestaurant(restaurant)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Tahrirlash
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLoginAs(restaurant)}>
                      <UserCircle className="h-4 w-4 mr-2" />
                      Kirish
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleStatus(restaurant)}>
                      <Power className="h-4 w-4 mr-2" />
                      {restaurant.status === 'Active' ? 'To\'xtatish' : 'Faollashtirish'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between pb-3 border-b">
                <span className="text-sm text-gray-600">Holat:</span>
                <Badge className={statusColors[restaurant.status]} variant="secondary">
                  {statusLabels[restaurant.status]}
                </Badge>
              </div>

              {/* Owner Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900 font-medium">{restaurant.owner}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{restaurant.ownerEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{restaurant.location}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <DollarSign className="h-3 w-3" />
                    <span>Oylik Daromad</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {restaurant.monthlyRevenue.toLocaleString()} so'm
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <ShoppingCart className="h-3 w-3" />
                    <span>Buyurtmalar</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {restaurant.totalOrders.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Join Date */}
              <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t">
                <Calendar className="h-3 w-3" />
                <span>Qo'shilgan: {new Date(restaurant.joinDate).toLocaleDateString('uz-UZ')}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredRestaurants.length === 0 && (
        <Card className="p-12">
          <div className="text-center space-y-3">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Hech narsa topilmadi</h3>
            <p className="text-gray-500">Qidiruv mezonlaringizga mos restoran yo'q</p>
          </div>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Restoran Tahrirlash</DialogTitle>
            <DialogDescription>Restoran ma'lumotlarini yangilang</DialogDescription>
          </DialogHeader>
          {selectedRestaurant && (
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="edit-name">Restoran Nomi</Label>
                <Input
                  id="edit-name"
                  value={selectedRestaurant.name}
                  onChange={(e) => setSelectedRestaurant({ ...selectedRestaurant, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-location">Manzil</Label>
                <Input
                  id="edit-location"
                  value={selectedRestaurant.location}
                  onChange={(e) => setSelectedRestaurant({ ...selectedRestaurant, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-tier">Obuna Turi</Label>
                <Select
                  value={selectedRestaurant.tier}
                  onValueChange={(value) => setSelectedRestaurant({ ...selectedRestaurant, tier: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Oddiy</SelectItem>
                    <SelectItem value="Pro">Professional</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={saveEdit} className="w-full h-11">
                O'zgarishlarni Saqlash
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
