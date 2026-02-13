import { useParams, Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Progress } from '../../components/ui/progress';
import {
  ArrowLeft,
  Package,
  MapPin,
  Calendar,
  Wrench,
  AlertTriangle,
  FileText,
  Download,
  Edit,
  Activity,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { date: 'Jan', uptime: 98, efficiency: 95 },
  { date: 'Feb', uptime: 97, efficiency: 96 },
  { date: 'Mar', uptime: 99, efficiency: 97 },
  { date: 'Apr', uptime: 96, efficiency: 94 },
  { date: 'May', uptime: 98, efficiency: 96 },
  { date: 'Jun', uptime: 99, efficiency: 98 },
];

const maintenanceHistory = [
  {
    date: '2026-01-28',
    type: 'Preventive Maintenance',
    description: 'Filter replacement and system check',
    cost: '$450',
    technician: 'Mike Johnson',
    status: 'Completed',
  },
  {
    date: '2025-12-15',
    type: 'Inspection',
    description: 'Quarterly safety inspection',
    cost: '$200',
    technician: 'Sarah Lee',
    status: 'Completed',
  },
  {
    date: '2025-11-10',
    type: 'Corrective Maintenance',
    description: 'Replaced worn bearings',
    cost: '$780',
    technician: 'Mike Johnson',
    status: 'Completed',
  },
];

const workOrders = [
  {
    id: 'WO-234',
    type: 'Preventive',
    priority: 'Medium',
    status: 'Scheduled',
    dueDate: '2026-03-01',
    assignedTo: 'Mike Johnson',
  },
  {
    id: 'WO-189',
    type: 'Inspection',
    priority: 'Low',
    status: 'Scheduled',
    dueDate: '2026-03-15',
    assignedTo: 'Sarah Lee',
  },
];

const documents = [
  { name: 'Installation Manual', type: 'PDF', date: '2023-06-15', size: '4.2 MB' },
  { name: 'Warranty Certificate', type: 'PDF', date: '2023-06-15', size: '1.5 MB' },
  { name: 'Maintenance Schedule', type: 'PDF', date: '2024-01-10', size: '800 KB' },
  { name: 'Specifications Sheet', type: 'PDF', date: '2023-06-15', size: '2.1 MB' },
];

export function AssetDetail() {
  const { id } = useParams();

  const assetData = {
    id: 'AS-001',
    name: 'HVAC Unit - Building A',
    category: 'HVAC',
    status: 'Operational',
    location: 'Building A - Roof',
    condition: 95,
    lastMaintenance: '5 days ago',
    nextMaintenance: '2026-03-01',
    manufacturer: 'Carrier',
    model: 'AquaSnap 30RBP080',
    serialNumber: 'CAR-2023-RBP-45678',
    installDate: '2023-06-15',
    warranty: 'Active until 2028-06-15',
    purchasePrice: '$45,000',
    currentValue: '$38,500',
    criticality: 'High',
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
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold tracking-tight">{assetData.name}</h1>
              <Badge variant="default">{assetData.status}</Badge>
              <Badge variant="outline">{assetData.category}</Badge>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              {assetData.id} • {assetData.location}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Link to="/asset/work-orders">
            <Button>
              <Wrench className="w-4 h-4 mr-2" />
              Create Work Order
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Condition</p>
                <p className="text-xl font-bold">{assetData.condition}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Criticality</p>
                <p className="text-xl font-bold">{assetData.criticality}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                <Wrench className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Last Service</p>
                <p className="text-sm font-bold">{assetData.lastMaintenance}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Next Service</p>
                <p className="text-sm font-bold">
                  {new Date(assetData.nextMaintenance).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="workorders">Work Orders</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Manufacturer</p>
                    <p className="font-medium">{assetData.manufacturer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Model</p>
                    <p className="font-medium">{assetData.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Serial Number</p>
                    <p className="font-medium">{assetData.serialNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Category</p>
                    <p className="font-medium">{assetData.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Install Date</p>
                    <p className="font-medium">{assetData.installDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Warranty</p>
                    <p className="font-medium text-green-600">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location & Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Location</p>
                    <p className="font-medium flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {assetData.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Status</p>
                    <p className="font-medium">{assetData.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Criticality</p>
                    <Badge variant="destructive">{assetData.criticality}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Condition Score</p>
                    <p className="font-medium">{assetData.condition}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Purchase Price</p>
                    <p className="font-medium">{assetData.purchasePrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Current Value</p>
                    <p className="font-medium">{assetData.currentValue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Depreciation</p>
                    <p className="font-medium text-red-600">-$6,500</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Warranty Status</p>
                    <p className="font-medium text-green-600">Valid</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Asset Condition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Overall Health</span>
                      <span className="text-2xl font-bold">{assetData.condition}%</span>
                    </div>
                    <Progress value={assetData.condition} className="h-3" />
                    <p className="text-sm text-green-600 mt-2">Excellent condition</p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Last Inspection</span>
                      <span className="font-medium">{assetData.lastMaintenance}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-slate-600 dark:text-slate-400">Operating Hours</span>
                      <span className="font-medium">12,450 hrs</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Maintenance History</CardTitle>
                  <CardDescription>All completed maintenance activities</CardDescription>
                </div>
                <Button>
                  <Wrench className="w-4 h-4 mr-2" />
                  Schedule Maintenance
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceHistory.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                          <Wrench className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{item.type}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {new Date(item.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {item.description}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Technician: {item.technician}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="default">{item.status}</Badge>
                        <p className="text-sm font-medium mt-2">{item.cost}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { task: 'Filter Replacement', due: '2026-03-01', type: 'Preventive' },
                  { task: 'System Inspection', due: '2026-03-15', type: 'Inspection' },
                  { task: 'Quarterly Service', due: '2026-04-01', type: 'Preventive' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800"
                  >
                    <div>
                      <p className="font-medium">{item.task}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{item.type}</p>
                    </div>
                    <Badge variant="secondary">{new Date(item.due).toLocaleDateString()}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Work Orders Tab */}
        <TabsContent value="workorders" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Work Orders</CardTitle>
                  <CardDescription>Current and scheduled work orders</CardDescription>
                </div>
                <Link to="/asset/work-orders">
                  <Button>
                    <Wrench className="w-4 h-4 mr-2" />
                    Create Work Order
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workOrders.map((wo) => (
                  <div
                    key={wo.id}
                    className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{wo.id}</h3>
                            <Badge variant="secondary">{wo.type}</Badge>
                            <Badge
                              variant={
                                wo.priority === 'High' || wo.priority === 'Critical'
                                  ? 'destructive'
                                  : 'secondary'
                              }
                            >
                              {wo.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Due: {new Date(wo.dueDate).toLocaleDateString()} • Assigned: {wo.assignedTo}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{wo.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>

              {workOrders.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 mx-auto text-slate-400 mb-2" />
                  <p className="text-slate-600 dark:text-slate-400">No active work orders</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Uptime and efficiency trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                    <XAxis dataKey="date" className="text-xs" tick={{ fill: 'currentColor' }} />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: 'currentColor' }}
                      label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
                      domain={[90, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="uptime"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Uptime %"
                      dot={{ fill: '#10b981' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="efficiency"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Efficiency %"
                      dot={{ fill: '#3b82f6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Uptime</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">98.5%</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Last 6 months</p>
                <p className="text-sm text-green-600 mt-2">Above target (95%)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">96.2%</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Average performance</p>
                <p className="text-sm text-green-600 mt-2">Excellent rating</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mean Time Between Failures</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">2,450</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Operating hours</p>
                <p className="text-sm text-blue-600 mt-2">Industry leading</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Asset Documents</CardTitle>
                  <CardDescription>Manuals, warranties, and certificates</CardDescription>
                </div>
                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{doc.name}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {doc.type} • {doc.size} • {new Date(doc.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
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
