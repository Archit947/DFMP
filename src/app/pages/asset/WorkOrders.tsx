import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Wrench,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  User,
} from 'lucide-react';
import { toast } from 'sonner';

const workOrders = [
  {
    id: 'WO-101',
    asset: 'Generator #1',
    assetId: 'AS-002',
    type: 'Preventive',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'Mike Johnson',
    dueDate: '2026-02-15',
    createdDate: '2026-02-01',
    description: 'Scheduled oil change and filter replacement',
  },
  {
    id: 'WO-102',
    asset: 'Water Pump Station',
    assetId: 'AS-003',
    type: 'Corrective',
    priority: 'Critical',
    status: 'Pending',
    assignedTo: 'Sarah Lee',
    dueDate: '2026-02-10',
    createdDate: '2026-02-08',
    description: 'Low pressure issue, requires immediate inspection',
  },
  {
    id: 'WO-103',
    asset: 'HVAC Unit - Building A',
    assetId: 'AS-001',
    type: 'Inspection',
    priority: 'Medium',
    status: 'Scheduled',
    assignedTo: 'Mike Johnson',
    dueDate: '2026-03-01',
    createdDate: '2026-02-05',
    description: 'Quarterly maintenance inspection',
  },
  {
    id: 'WO-098',
    asset: 'Elevator System #2',
    assetId: 'AS-004',
    type: 'Preventive',
    priority: 'Low',
    status: 'Completed',
    assignedTo: 'Tom Brown',
    dueDate: '2026-02-05',
    createdDate: '2026-01-20',
    description: 'Monthly safety inspection and lubrication',
    completedDate: '2026-02-04',
  },
  {
    id: 'WO-097',
    asset: 'Generator #1',
    assetId: 'AS-002',
    type: 'Corrective',
    priority: 'High',
    status: 'Completed',
    assignedTo: 'Mike Johnson',
    dueDate: '2026-01-28',
    createdDate: '2026-01-25',
    description: 'Replace worn belt',
    completedDate: '2026-01-27',
  },
];

export function WorkOrders() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newWOAsset, setNewWOAsset] = useState('');
  const [newWOType, setNewWOType] = useState('');
  const [newWOPriority, setNewWOPriority] = useState('');
  const [newWOAssignee, setNewWOAssignee] = useState('');
  const [newWODueDate, setNewWODueDate] = useState('');
  const [newWODescription, setNewWODescription] = useState('');

  const handleCreateWorkOrder = () => {
    if (!newWOAsset || !newWOType || !newWOPriority || !newWOAssignee || !newWODueDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Work order created successfully');
    setIsCreateDialogOpen(false);
    
    // Reset form
    setNewWOAsset('');
    setNewWOType('');
    setNewWOPriority('');
    setNewWOAssignee('');
    setNewWODueDate('');
    setNewWODescription('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'In Progress':
        return <Wrench className="w-5 h-5 text-blue-600" />;
      case 'Pending':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'Scheduled':
        return <Calendar className="w-5 h-5 text-purple-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-slate-600" />;
    }
  };

  const filterByStatus = (status: string) => {
    if (status === 'active') {
      return workOrders.filter((wo) => wo.status !== 'Completed');
    } else if (status === 'completed') {
      return workOrders.filter((wo) => wo.status === 'Completed');
    }
    return workOrders;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/asset">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Work Orders</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage maintenance and repair tasks
            </p>
          </div>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Work Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Work Order</DialogTitle>
              <DialogDescription>Fill in the details to create a new work order</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="wo-asset">Asset *</Label>
                  <Select value={newWOAsset} onValueChange={setNewWOAsset}>
                    <SelectTrigger id="wo-asset">
                      <SelectValue placeholder="Select asset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AS-001">AS-001 - HVAC Unit - Building A</SelectItem>
                      <SelectItem value="AS-002">AS-002 - Generator #1</SelectItem>
                      <SelectItem value="AS-003">AS-003 - Water Pump Station</SelectItem>
                      <SelectItem value="AS-004">AS-004 - Elevator System #2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wo-type">Type *</Label>
                  <Select value={newWOType} onValueChange={setNewWOType}>
                    <SelectTrigger id="wo-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preventive">Preventive</SelectItem>
                      <SelectItem value="corrective">Corrective</SelectItem>
                      <SelectItem value="inspection">Inspection</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wo-priority">Priority *</Label>
                  <Select value={newWOPriority} onValueChange={setNewWOPriority}>
                    <SelectTrigger id="wo-priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wo-assignee">Assign To *</Label>
                  <Select value={newWOAssignee} onValueChange={setNewWOAssignee}>
                    <SelectTrigger id="wo-assignee">
                      <SelectValue placeholder="Select technician" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mike">Mike Johnson</SelectItem>
                      <SelectItem value="sarah">Sarah Lee</SelectItem>
                      <SelectItem value="tom">Tom Brown</SelectItem>
                      <SelectItem value="lisa">Lisa Chen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="wo-due-date">Due Date *</Label>
                  <Input
                    id="wo-due-date"
                    type="date"
                    value={newWODueDate}
                    onChange={(e) => setNewWODueDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wo-description">Description</Label>
                <Textarea
                  id="wo-description"
                  value={newWODescription}
                  onChange={(e) => setNewWODescription(e.target.value)}
                  placeholder="Describe the work to be done..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateWorkOrder}>Create Work Order</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Active</p>
                <p className="text-2xl font-bold mt-1">
                  {filterByStatus('active').length}
                </p>
              </div>
              <Wrench className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">In Progress</p>
                <p className="text-2xl font-bold mt-1">
                  {workOrders.filter((wo) => wo.status === 'In Progress').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Completed</p>
                <p className="text-2xl font-bold mt-1">
                  {filterByStatus('completed').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Critical</p>
                <p className="text-2xl font-bold mt-1">
                  {workOrders.filter((wo) => wo.priority === 'Critical' && wo.status !== 'Completed').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Work Orders List */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Work Orders</CardTitle>
                  <CardDescription>Complete list of work orders</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="Search work orders..." className="pl-10" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workOrders.map((wo) => (
                  <div
                    key={wo.id}
                    className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          {getStatusIcon(wo.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{wo.id}</h3>
                            <Badge variant="outline">{wo.type}</Badge>
                            <Badge
                              variant={
                                wo.priority === 'Critical' || wo.priority === 'High'
                                  ? 'destructive'
                                  : 'secondary'
                              }
                            >
                              {wo.priority}
                            </Badge>
                            <Badge
                              variant={
                                wo.status === 'Completed'
                                  ? 'default'
                                  : wo.status === 'In Progress'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {wo.status}
                            </Badge>
                          </div>
                          <Link to={`/asset/item/${wo.assetId}`}>
                            <p className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400">
                              {wo.asset} ({wo.assetId})
                            </p>
                          </Link>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            {wo.description}
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-sm">
                            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                              <User className="w-4 h-4" />
                              {wo.assignedTo}
                            </span>
                            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                              <Calendar className="w-4 h-4" />
                              Due: {new Date(wo.dueDate).toLocaleDateString()}
                            </span>
                            {wo.completedDate && (
                              <span className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="w-4 h-4" />
                                Completed: {new Date(wo.completedDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Work Orders</CardTitle>
              <CardDescription>Work orders that are pending, scheduled, or in progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filterByStatus('active').map((wo) => (
                  <div
                    key={wo.id}
                    className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          {getStatusIcon(wo.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{wo.id}</h3>
                            <Badge variant="outline">{wo.type}</Badge>
                            <Badge
                              variant={
                                wo.priority === 'Critical' || wo.priority === 'High'
                                  ? 'destructive'
                                  : 'secondary'
                              }
                            >
                              {wo.priority}
                            </Badge>
                            <Badge
                              variant={wo.status === 'In Progress' ? 'default' : 'secondary'}
                            >
                              {wo.status}
                            </Badge>
                          </div>
                          <Link to={`/asset/item/${wo.assetId}`}>
                            <p className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400">
                              {wo.asset} ({wo.assetId})
                            </p>
                          </Link>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            {wo.description}
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-sm">
                            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                              <User className="w-4 h-4" />
                              {wo.assignedTo}
                            </span>
                            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                              <Calendar className="w-4 h-4" />
                              Due: {new Date(wo.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Work Orders</CardTitle>
              <CardDescription>Work orders that have been finished</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filterByStatus('completed').map((wo) => (
                  <div
                    key={wo.id}
                    className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                          {getStatusIcon(wo.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{wo.id}</h3>
                            <Badge variant="outline">{wo.type}</Badge>
                            <Badge variant="default">Completed</Badge>
                          </div>
                          <Link to={`/asset/item/${wo.assetId}`}>
                            <p className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400">
                              {wo.asset} ({wo.assetId})
                            </p>
                          </Link>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            {wo.description}
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-sm">
                            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                              <User className="w-4 h-4" />
                              {wo.assignedTo}
                            </span>
                            {wo.completedDate && (
                              <span className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="w-4 h-4" />
                                Completed: {new Date(wo.completedDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}