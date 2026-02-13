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
  Truck,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Edit,
  Trash2,
  Calendar,
  MoreVertical,
  Wrench,
  FileText,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { toast } from 'sonner';

interface Vehicle {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Maintenance' | 'Inspection Due';
  lastInspection: string;
  nextInspection: string;
  mileage: number;
  driver: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
}

const initialVehicles: Vehicle[] = [
  {
    id: 'VEH-001',
    name: 'Delivery Van #1',
    type: 'Van',
    status: 'Active',
    lastInspection: '2026-02-01',
    nextInspection: '2026-05-01',
    mileage: 45200,
    driver: 'John Smith',
    condition: 'Good',
  },
  {
    id: 'VEH-002',
    name: 'Service Truck #1',
    type: 'Pickup',
    status: 'Active',
    lastInspection: '2026-01-28',
    nextInspection: '2026-04-28',
    mileage: 67800,
    driver: 'Sarah Johnson',
    condition: 'Excellent',
  },
  {
    id: 'VEH-003',
    name: 'Cargo Van #2',
    type: 'Van',
    status: 'Maintenance',
    lastInspection: '2026-02-10',
    nextInspection: '2026-02-17',
    mileage: 52300,
    driver: 'Mike Wilson',
    condition: 'Fair',
  },
  {
    id: 'VEH-004',
    name: 'Heavy Duty Truck',
    type: 'Truck',
    status: 'Active',
    lastInspection: '2026-02-05',
    nextInspection: '2026-05-05',
    mileage: 38900,
    driver: 'Robert Brown',
    condition: 'Excellent',
  },
  {
    id: 'VEH-005',
    name: 'Utility Van #3',
    type: 'Van',
    status: 'Inspection Due',
    lastInspection: '2026-01-15',
    nextInspection: '2026-02-15',
    mileage: 91200,
    driver: 'Emily Davis',
    condition: 'Good',
  },
];

export default function AdminFleetHome() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isInspectionDialogOpen, setIsInspectionDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [schedulingVehicle, setSchedulingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    driver: '',
    mileage: '',
    condition: 'Good' as 'Excellent' | 'Good' | 'Fair' | 'Poor',
    status: 'Active' as 'Active' | 'Maintenance' | 'Inspection Due',
  });
  const [inspectionDate, setInspectionDate] = useState('');

  const handleCreate = () => {
    if (!formData.name || !formData.type || !formData.driver || !formData.mileage) {
      toast.error('Please fill in all required fields');
      return;
    }

    const today = new Date();
    const nextInspection = new Date(today);
    nextInspection.setMonth(nextInspection.getMonth() + 3);

    const newVehicle: Vehicle = {
      id: `VEH-${String(vehicles.length + 1).padStart(3, '0')}`,
      name: formData.name,
      type: formData.type,
      status: formData.status,
      lastInspection: today.toISOString().split('T')[0],
      nextInspection: nextInspection.toISOString().split('T')[0],
      mileage: parseInt(formData.mileage),
      driver: formData.driver,
      condition: formData.condition,
    };

    setVehicles([...vehicles, newVehicle]);
    setIsCreateDialogOpen(false);
    resetForm();
    toast.success('Vehicle added successfully');
  };

  const handleEdit = () => {
    if (!editingVehicle) return;

    if (!formData.name || !formData.type || !formData.driver || !formData.mileage) {
      toast.error('Please fill in all required fields');
      return;
    }

    const updatedVehicles = vehicles.map(vehicle =>
      vehicle.id === editingVehicle.id
        ? {
          ...vehicle,
          name: formData.name,
          type: formData.type,
          driver: formData.driver,
          mileage: parseInt(formData.mileage),
          condition: formData.condition,
          status: formData.status,
        }
        : vehicle
    );

    setVehicles(updatedVehicles);
    setIsEditDialogOpen(false);
    setEditingVehicle(null);
    resetForm();
    toast.success('Vehicle updated successfully');
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from the fleet?`)) {
      setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
      toast.success('Vehicle removed successfully');
    }
  };

  const handleScheduleInspection = () => {
    if (!schedulingVehicle || !inspectionDate) {
      toast.error('Please select an inspection date');
      return;
    }

    const updatedVehicles = vehicles.map(vehicle =>
      vehicle.id === schedulingVehicle.id
        ? {
          ...vehicle,
          nextInspection: inspectionDate,
          status: 'Active' as 'Active' | 'Maintenance' | 'Inspection Due',
        }
        : vehicle
    );

    setVehicles(updatedVehicles);
    setIsInspectionDialogOpen(false);
    setSchedulingVehicle(null);
    setInspectionDate('');
    toast.success('Inspection scheduled successfully');
  };

  const openEditDialog = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      type: vehicle.type,
      driver: vehicle.driver,
      mileage: String(vehicle.mileage),
      condition: vehicle.condition,
      status: vehicle.status,
    });
    setIsEditDialogOpen(true);
  };

  const openInspectionDialog = (vehicle: Vehicle) => {
    setSchedulingVehicle(vehicle);
    setInspectionDate(vehicle.nextInspection);
    setIsInspectionDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      driver: '',
      mileage: '',
      condition: 'Good',
      status: 'Active',
    });
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeVehicles = vehicles.filter(v => v.status === 'Active').length;
  const maintenanceVehicles = vehicles.filter(v => v.status === 'Maintenance').length;
  const inspectionDue = vehicles.filter(v => v.status === 'Inspection Due').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fleet Management Admin</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage vehicle fleet, inspections, and maintenance schedules
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Vehicles</p>
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">{vehicles.length}</p>
            <p className="text-xs text-green-600 mt-1">Fleet size</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Active Vehicles</p>
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">{activeVehicles}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Pending Inspections</p>
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold">{inspectionDue}</p>
            <p className="text-xs text-orange-600 mt-1">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Maintenance Alerts</p>
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold">{maintenanceVehicles}</p>
            <p className="text-xs text-red-600 mt-1">In maintenance</p>
          </CardContent>
        </Card>
      </div>

      {/* Vehicles Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Vehicle Fleet</CardTitle>
              <CardDescription>Monitor and manage your vehicle fleet</CardDescription>
            </div>
            <div className="w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search vehicles..."
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
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{vehicle.name}</h3>
                      <Badge variant="secondary">{vehicle.type}</Badge>
                      <Badge
                        className={
                          vehicle.status === 'Active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : vehicle.status === 'Maintenance'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                              : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                        }
                      >
                        {vehicle.status}
                      </Badge>
                      <Badge
                        className={
                          vehicle.condition === 'Excellent'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                            : vehicle.condition === 'Good'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                              : vehicle.condition === 'Fair'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }
                      >
                        {vehicle.condition}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Vehicle ID</p>
                        <p className="font-medium">{vehicle.id}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Driver</p>
                        <p className="font-medium">{vehicle.driver}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Mileage</p>
                        <p className="font-medium">{vehicle.mileage.toLocaleString()} km</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Last Inspection</p>
                        <p className="font-medium">{new Date(vehicle.lastInspection).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Next Inspection</p>
                        <p className={`font-medium ${vehicle.status === 'Inspection Due' ? 'text-orange-600' : ''}`}>
                          {new Date(vehicle.nextInspection).toLocaleDateString()}
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
                      <DropdownMenuItem onClick={() => openEditDialog(vehicle)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Vehicle
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openInspectionDialog(vehicle)}>
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Inspection
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.success('Opening maintenance history...')}>
                        <Wrench className="w-4 h-4 mr-2" />
                        Maintenance History
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(vehicle.id, vehicle.name)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Vehicle
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
        <Link to="/admin/fleet/schedule">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Inspection Schedule</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    View inspection calendar
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/fleet/analytics">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Fleet Analytics</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    View fleet performance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/fleet/reports">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Maintenance Reports</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Generate reports
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Create/Edit Vehicle Dialog */}
      <Dialog open={isCreateDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsCreateDialogOpen(false);
          setIsEditDialogOpen(false);
          setEditingVehicle(null);
          resetForm();
        }
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditDialogOpen ? 'Edit Vehicle' : 'Add New Vehicle'}</DialogTitle>
            <DialogDescription>
              {isEditDialogOpen ? 'Update vehicle details below' : 'Fill in the vehicle details below'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Vehicle Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Delivery Van #1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Vehicle Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Van">Van</SelectItem>
                    <SelectItem value="Truck">Truck</SelectItem>
                    <SelectItem value="Pickup">Pickup</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
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
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Inspection Due">Inspection Due</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="driver">Assigned Driver *</Label>
                <Input
                  id="driver"
                  value={formData.driver}
                  onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                  placeholder="e.g., John Smith"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mileage">Current Mileage (km) *</Label>
                <Input
                  id="mileage"
                  type="number"
                  min="0"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                  placeholder="e.g., 45200"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="condition">Vehicle Condition *</Label>
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
              setEditingVehicle(null);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={isEditDialogOpen ? handleEdit : handleCreate} className="bg-green-600 hover:bg-green-700">
              {isEditDialogOpen ? 'Update Vehicle' : 'Add Vehicle'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Inspection Dialog */}
      <Dialog open={isInspectionDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsInspectionDialogOpen(false);
          setSchedulingVehicle(null);
          setInspectionDate('');
        }
      }}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Schedule Inspection</DialogTitle>
            <DialogDescription>
              Set the next inspection date for {schedulingVehicle?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="inspectionDate">Inspection Date *</Label>
              <Input
                id="inspectionDate"
                type="date"
                value={inspectionDate}
                onChange={(e) => setInspectionDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsInspectionDialogOpen(false);
              setSchedulingVehicle(null);
              setInspectionDate('');
            }}>
              Cancel
            </Button>
            <Button onClick={handleScheduleInspection} className="bg-green-600 hover:bg-green-700">
              Schedule Inspection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
