import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  Plus,
  Search,
  Package,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Wrench,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Calendar,
  MapPin,
  DollarSign,
  FileText,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Textarea } from '../../../components/ui/textarea';

interface Asset {
  id: string;
  name: string;
  category: string;
  status: 'Operational' | 'Maintenance' | 'Service Due';
  location: string;
  lastService: string;
  nextService: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  value: number;
}

const initialAssets: Asset[] = [
  {
    id: 'AST-001',
    name: 'Industrial Chiller Unit',
    category: 'HVAC',
    status: 'Operational',
    location: 'Building A - Basement',
    lastService: '2026-02-05',
    nextService: '2026-05-05',
    condition: 'Excellent',
    value: 45000,
  },
  {
    id: 'AST-002',
    name: 'Emergency Generator',
    category: 'Electrical',
    status: 'Operational',
    location: 'Building B - Rooftop',
    lastService: '2026-01-20',
    nextService: '2026-04-20',
    condition: 'Good',
    value: 32000,
  },
  {
    id: 'AST-003',
    name: 'Water Pump System',
    category: 'Plumbing',
    status: 'Maintenance',
    location: 'Building A - Mechanical Room',
    lastService: '2026-02-10',
    nextService: '2026-02-17',
    condition: 'Fair',
    value: 18500,
  },
  {
    id: 'AST-004',
    name: 'Fire Suppression Panel',
    category: 'Safety',
    status: 'Operational',
    location: 'Building C - Main Lobby',
    lastService: '2026-02-08',
    nextService: '2026-05-08',
    condition: 'Excellent',
    value: 28000,
  },
  {
    id: 'AST-005',
    name: 'Elevator System #1',
    category: 'Mechanical',
    status: 'Service Due',
    location: 'Building A - North Wing',
    lastService: '2025-12-15',
    nextService: '2026-02-15',
    condition: 'Good',
    value: 125000,
  },
  {
    id: 'AST-006',
    name: 'Access Control Server',
    category: 'Security',
    status: 'Operational',
    location: 'Building B - IT Room',
    lastService: '2026-02-01',
    nextService: '2026-05-01',
    condition: 'Excellent',
    value: 15000,
  },
];

export default function AdminAssetHome() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isWorkOrderDialogOpen, setIsWorkOrderDialogOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [workOrderAsset, setWorkOrderAsset] = useState<Asset | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    value: '',
    condition: 'Good' as 'Excellent' | 'Good' | 'Fair' | 'Poor',
    status: 'Operational' as 'Operational' | 'Maintenance' | 'Service Due',
  });
  const [workOrderData, setWorkOrderData] = useState({
    type: '',
    priority: 'Medium',
    description: '',
    scheduledDate: '',
  });

  const handleCreate = () => {
    if (!formData.name || !formData.category || !formData.location || !formData.value) {
      toast.error('Please fill in all required fields');
      return;
    }

    const today = new Date();
    const nextService = new Date(today);
    nextService.setMonth(nextService.getMonth() + 3);

    const newAsset: Asset = {
      id: `AST-${String(assets.length + 1).padStart(3, '0')}`,
      name: formData.name,
      category: formData.category,
      status: formData.status,
      location: formData.location,
      lastService: today.toISOString().split('T')[0],
      nextService: nextService.toISOString().split('T')[0],
      condition: formData.condition,
      value: parseInt(formData.value),
    };

    setAssets([...assets, newAsset]);
    setIsCreateDialogOpen(false);
    resetForm();
    toast.success('Asset registered successfully');
  };

  const handleEdit = () => {
    if (!editingAsset) return;

    if (!formData.name || !formData.category || !formData.location || !formData.value) {
      toast.error('Please fill in all required fields');
      return;
    }

    const updatedAssets = assets.map(asset =>
      asset.id === editingAsset.id
        ? {
          ...asset,
          name: formData.name,
          category: formData.category,
          location: formData.location,
          value: parseInt(formData.value),
          condition: formData.condition,
          status: formData.status,
        }
        : asset
    );

    setAssets(updatedAssets);
    setIsEditDialogOpen(false);
    setEditingAsset(null);
    resetForm();
    toast.success('Asset updated successfully');
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from the asset registry?`)) {
      setAssets(assets.filter(asset => asset.id !== id));
      toast.success('Asset removed successfully');
    }
  };

  const handleCreateWorkOrder = () => {
    if (!workOrderAsset || !workOrderData.type || !workOrderData.scheduledDate || !workOrderData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Update asset status to Maintenance
    const updatedAssets = assets.map(asset =>
      asset.id === workOrderAsset.id
        ? { ...asset, status: 'Maintenance' as 'Operational' | 'Maintenance' | 'Service Due' }
        : asset
    );

    setAssets(updatedAssets);
    setIsWorkOrderDialogOpen(false);
    setWorkOrderAsset(null);
    resetWorkOrderForm();
    toast.success('Work order created successfully');
  };

  const openEditDialog = (asset: Asset) => {
    setEditingAsset(asset);
    setFormData({
      name: asset.name,
      category: asset.category,
      location: asset.location,
      value: String(asset.value),
      condition: asset.condition,
      status: asset.status,
    });
    setIsEditDialogOpen(true);
  };

  const openWorkOrderDialog = (asset: Asset) => {
    setWorkOrderAsset(asset);
    setWorkOrderData({
      type: '',
      priority: 'Medium',
      description: '',
      scheduledDate: new Date().toISOString().split('T')[0],
    });
    setIsWorkOrderDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      location: '',
      value: '',
      condition: 'Good',
      status: 'Operational',
    });
  };

  const resetWorkOrderForm = () => {
    setWorkOrderData({
      type: '',
      priority: 'Medium',
      description: '',
      scheduledDate: '',
    });
  };

  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const operationalAssets = assets.filter(a => a.status === 'Operational').length;
  const activeWorkOrders = assets.filter(a => a.status === 'Maintenance').length;
  const pendingRequests = assets.filter(a => a.status === 'Service Due').length;
  const totalValue = assets.reduce((acc, a) => acc + a.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Asset Management Admin</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage equipment inventory, work orders, and maintenance schedules
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Register Asset
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Assets</p>
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold">{assets.length}</p>
            <p className="text-xs text-green-600 mt-1">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Active Work Orders</p>
              <Wrench className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">{activeWorkOrders}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Pending Requests</p>
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold">{pendingRequests}</p>
            <p className="text-xs text-orange-600 mt-1">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Asset Value</p>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">${(totalValue / 1000).toFixed(0)}K</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Inventory value</p>
          </CardContent>
        </Card>
      </div>

      {/* Assets Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Asset Inventory</CardTitle>
              <CardDescription>Monitor and manage your equipment and assets</CardDescription>
            </div>
            <div className="w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search assets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{asset.name}</h3>
                      <Badge variant="secondary">{asset.category}</Badge>
                      <Badge
                        className={
                          asset.status === 'Operational'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : asset.status === 'Maintenance'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                              : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                        }
                      >
                        {asset.status}
                      </Badge>
                      <Badge
                        className={
                          asset.condition === 'Excellent'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                            : asset.condition === 'Good'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                              : asset.condition === 'Fair'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }
                      >
                        {asset.condition}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Asset ID</p>
                        <p className="font-medium">{asset.id}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Location</p>
                        <p className="font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {asset.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Value</p>
                        <p className="font-medium flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          ${asset.value.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Last Service</p>
                        <p className="font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(asset.lastService).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Next Service</p>
                        <p className={`font-medium ${asset.status === 'Service Due' ? 'text-orange-600' : ''}`}>
                          {new Date(asset.nextService).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast.success('Opening asset details...')}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openEditDialog(asset)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Asset
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openWorkOrderDialog(asset)}>
                        <FileText className="w-4 h-4 mr-2" />
                        Create Work Order
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.success('Opening service history...')}>
                        <Calendar className="w-4 h-4 mr-2" />
                        Service History
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(asset.id, asset.name)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Asset
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/admin/asset/work-orders">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Work Orders</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Manage maintenance requests
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/asset/analytics">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Asset Analytics</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    View reports and trends
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/asset/reports">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Generate Reports</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Export asset data
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Create/Edit Asset Dialog */}
      <Dialog open={isCreateDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsCreateDialogOpen(false);
          setIsEditDialogOpen(false);
          setEditingAsset(null);
          resetForm();
        }
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditDialogOpen ? 'Edit Asset' : 'Register New Asset'}</DialogTitle>
            <DialogDescription>
              {isEditDialogOpen ? 'Update asset details below' : 'Fill in the asset details below'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Asset Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Industrial Chiller Unit"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HVAC">HVAC</SelectItem>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="Plumbing">Plumbing</SelectItem>
                    <SelectItem value="Safety">Safety</SelectItem>
                    <SelectItem value="Mechanical">Mechanical</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status *</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Operational">Operational</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Service Due">Service Due</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Building A - Basement"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="value">Asset Value ($) *</Label>
                <Input
                  id="value"
                  type="number"
                  min="0"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="e.g., 45000"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="condition">Asset Condition *</Label>
              <Select value={formData.condition} onValueChange={(value: any) => setFormData({ ...formData, condition: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsCreateDialogOpen(false);
              setIsEditDialogOpen(false);
              setEditingAsset(null);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={isEditDialogOpen ? handleEdit : handleCreate} className="bg-orange-600 hover:bg-orange-700">
              {isEditDialogOpen ? 'Update Asset' : 'Register Asset'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Work Order Dialog */}
      <Dialog open={isWorkOrderDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsWorkOrderDialogOpen(false);
          setWorkOrderAsset(null);
          resetWorkOrderForm();
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Work Order</DialogTitle>
            <DialogDescription>
              Create a maintenance work order for {workOrderAsset?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Work Order Type *</Label>
              <Select value={workOrderData.type} onValueChange={(value) => setWorkOrderData({ ...workOrderData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Preventive Maintenance">Preventive Maintenance</SelectItem>
                  <SelectItem value="Corrective Maintenance">Corrective Maintenance</SelectItem>
                  <SelectItem value="Emergency Repair">Emergency Repair</SelectItem>
                  <SelectItem value="Inspection">Inspection</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select value={workOrderData.priority} onValueChange={(value) => setWorkOrderData({ ...workOrderData, priority: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="scheduledDate">Scheduled Date *</Label>
                <Input
                  id="scheduledDate"
                  type="date"
                  value={workOrderData.scheduledDate}
                  onChange={(e) => setWorkOrderData({ ...workOrderData, scheduledDate: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={workOrderData.description}
                onChange={(e) => setWorkOrderData({ ...workOrderData, description: e.target.value })}
                placeholder="Describe the work to be performed..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsWorkOrderDialogOpen(false);
              setWorkOrderAsset(null);
              resetWorkOrderForm();
            }}>
              Cancel
            </Button>
            <Button onClick={handleCreateWorkOrder} className="bg-orange-600 hover:bg-orange-700">
              Create Work Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
