import { useState } from 'react';
import { mockRestaurants, Restaurant, RestaurantStatus } from '../../lib/mock-data';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
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
  Filter
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

export default function Restaurants() {
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
    toast.success(`Restaurant "${restaurant.name}" added successfully`);
  };

  const handleToggleStatus = (restaurant: Restaurant) => {
    const newStatus: RestaurantStatus = restaurant.status === 'Active' ? 'Suspended' : 'Active';
    setRestaurants(restaurants.map(r =>
      r.id === restaurant.id ? { ...r, status: newStatus } : r
    ));
    toast.success(`Restaurant "${restaurant.name}" ${newStatus === 'Active' ? 'activated' : 'suspended'}`);
  };

  const handleLoginAs = (restaurant: Restaurant) => {
    toast.info(`Logging in as ${restaurant.name}...`, {
      description: 'This would redirect to the restaurant manager dashboard'
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
      toast.success(`Restaurant "${selectedRestaurant.name}" updated successfully`);
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Restaurant Management</h1>
          <p className="text-gray-500 mt-1">Manage all restaurants and their subscriptions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Restaurant
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Restaurant</DialogTitle>
              <DialogDescription>Enter the details for the new restaurant</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="name">Restaurant Name</Label>
                <Input
                  id="name"
                  value={newRestaurant.name}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
                  placeholder="e.g., The Golden Spoon"
                />
              </div>
              <div>
                <Label htmlFor="owner">Owner Name</Label>
                <Input
                  id="owner"
                  value={newRestaurant.owner}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, owner: e.target.value })}
                  placeholder="e.g., Ahmad Hassan"
                />
              </div>
              <div>
                <Label htmlFor="email">Owner Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newRestaurant.ownerEmail}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, ownerEmail: e.target.value })}
                  placeholder="e.g., ahmad@example.com"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newRestaurant.location}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, location: e.target.value })}
                  placeholder="e.g., Kabul, Afghanistan"
                />
              </div>
              <div>
                <Label htmlFor="tier">Subscription Tier</Label>
                <Select
                  value={newRestaurant.tier}
                  onValueChange={(value) => setNewRestaurant({ ...newRestaurant, tier: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddRestaurant} className="w-full">Add Restaurant</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by restaurant name or owner..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
              <SelectItem value="Expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Restaurant Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRestaurants.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell className="font-medium">{restaurant.name}</TableCell>
                <TableCell>
                  <div>
                    <div>{restaurant.owner}</div>
                    <div className="text-xs text-gray-500">{restaurant.ownerEmail}</div>
                  </div>
                </TableCell>
                <TableCell>{restaurant.location}</TableCell>
                <TableCell>{new Date(restaurant.joinDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant="outline">{restaurant.tier}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[restaurant.status]} variant="secondary">
                    {restaurant.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditRestaurant(restaurant)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleLoginAs(restaurant)}>
                        <UserCircle className="h-4 w-4 mr-2" />
                        Login as Manager
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleStatus(restaurant)}>
                        <Power className="h-4 w-4 mr-2" />
                        {restaurant.status === 'Active' ? 'Suspend' : 'Activate'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Restaurant</DialogTitle>
            <DialogDescription>Update restaurant details</DialogDescription>
          </DialogHeader>
          {selectedRestaurant && (
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="edit-name">Restaurant Name</Label>
                <Input
                  id="edit-name"
                  value={selectedRestaurant.name}
                  onChange={(e) => setSelectedRestaurant({ ...selectedRestaurant, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={selectedRestaurant.location}
                  onChange={(e) => setSelectedRestaurant({ ...selectedRestaurant, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-tier">Subscription Tier</Label>
                <Select
                  value={selectedRestaurant.tier}
                  onValueChange={(value) => setSelectedRestaurant({ ...selectedRestaurant, tier: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={saveEdit} className="w-full">Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
