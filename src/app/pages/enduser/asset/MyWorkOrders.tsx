import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Search, Package, Calendar, Clock, CheckCircle, AlertCircle, Eye, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';

const workOrders = [
  {
    id: 'WO-001',
    equipment: { id: 'EQ-001', name: 'HVAC Unit - Floor 3', location: 'Building A - Floor 3' },
    title: 'HVAC not cooling properly',
    category: 'Malfunction',
    priority: 'High',
    status: 'In Progress',
    createdDate: '2026-02-12',
    assignedTo: 'Mike Johnson',
    estimatedCompletion: '2026-02-15',
    description: 'HVAC unit is running but not producing cold air. Temperature in the area is 28°C.',
  },
  {
    id: 'WO-002',
    equipment: { id: 'EQ-002', name: 'Elevator #1', location: 'Building A - Main Lobby' },
    title: 'Strange noise during operation',
    category: 'Inspection',
    priority: 'Medium',
    status: 'Assigned',
    createdDate: '2026-02-13',
    assignedTo: 'Sarah Chen',
    estimatedCompletion: '2026-02-16',
    description: 'Elevator making unusual squeaking noise when ascending.',
  },
  {
    id: 'WO-003',
    equipment: { id: 'EQ-004', name: 'Backup Generator', location: 'Building A - Rooftop' },
    title: 'Scheduled maintenance',
    category: 'Preventive Maintenance',
    priority: 'Low',
    status: 'Completed',
    createdDate: '2026-02-08',
    completedDate: '2026-02-10',
    assignedTo: 'David Martinez',
    description: 'Quarterly preventive maintenance check.',
  },
  {
    id: 'WO-004',
    equipment: { id: 'EQ-003', name: 'Fire Pump', location: 'Building A - Basement' },
    title: 'Pressure gauge malfunction',
    category: 'Repair',
    priority: 'Urgent',
    status: 'Open',
    createdDate: '2026-02-13',
    assignedTo: 'Unassigned',
    description: 'Pressure gauge showing incorrect readings. Requires immediate inspection.',
  },
];

export function MyWorkOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredWorkOrders = workOrders.filter((wo) => {
    const matchesSearch =
      wo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wo.equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wo.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || wo.status.toLowerCase().replace(' ', '-') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalOrders = workOrders.length;
  const openOrders = workOrders.filter((wo) => wo.status === 'Open' || wo.status === 'In Progress' || wo.status === 'Assigned').length;
  const completedOrders = workOrders.filter((wo) => wo.status === 'Completed').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
      case 'Assigned':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'In Progress':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'High':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Work Orders</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Track all your submitted maintenance requests
          </p>
        </div>
        <Link to="/enduser/asset/work-order/new">
          <Button className="bg-orange-600 hover:bg-orange-700">Create Work Order</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Work Orders</p>
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">{totalOrders}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Active</p>
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold">{openOrders}</p>
            <p className="text-xs text-orange-600 mt-1">In progress or pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Completed</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">{completedOrders}</p>
            <p className="text-xs text-green-600 mt-1">Successfully resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search work orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Work Orders List */}
      <div className="space-y-4">
        {filteredWorkOrders.map((wo) => (
          <Card key={wo.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{wo.title}</h3>
                        <Badge className={getStatusColor(wo.status)}>{wo.status}</Badge>
                        <Badge className={getPriorityColor(wo.priority)}>{wo.priority}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {wo.equipment.name} • {wo.id}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                    {wo.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Category</p>
                      <p className="font-medium">{wo.category}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Created</p>
                      <p className="font-medium">
                        {new Date(wo.createdDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Assigned To</p>
                      <p className="font-medium">{wo.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">
                        {wo.status === 'Completed' ? 'Completed' : 'Est. Completion'}
                      </p>
                      <p className="font-medium">
                        {wo.status === 'Completed'
                          ? new Date(wo.completedDate!).toLocaleDateString()
                          : new Date(wo.estimatedCompletion!).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {wo.priority === 'Urgent' && wo.status !== 'Completed' && (
                    <div className="mt-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <p className="text-sm text-red-800 dark:text-red-400">
                          Urgent priority - requires immediate attention
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Link to={`/enduser/asset/equipment/${wo.equipment.id}`}>
                    <Button variant="outline" className="w-full">
                      <Package className="w-4 h-4 mr-2" />
                      View Equipment
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWorkOrders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <h3 className="text-lg font-semibold mb-2">No work orders found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Try adjusting your search or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
