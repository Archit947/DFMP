import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import {
  Package,
  Wrench,
  AlertCircle,
  CheckCircle,
  Clock,
  Calendar,
  ChevronRight,
  Plus,
  FileText,
} from 'lucide-react';

const assignedAssets = [
  {
    id: 'AST-234',
    name: 'Industrial Air Compressor',
    category: 'Equipment',
    location: 'Building A - Workshop',
    status: 'Operational',
    health: 92,
    lastMaintenance: '2026-01-15',
    nextMaintenance: '2026-03-15',
    usageHours: 1240,
  },
  {
    id: 'AST-156',
    name: 'Forklift Model X200',
    category: 'Vehicle',
    location: 'Warehouse',
    status: 'Maintenance Required',
    health: 68,
    lastMaintenance: '2025-12-20',
    nextMaintenance: '2026-02-15',
    usageHours: 2580,
  },
  {
    id: 'AST-089',
    name: 'Electrical Generator',
    category: 'Equipment',
    location: 'Building B - Basement',
    status: 'Operational',
    health: 85,
    lastMaintenance: '2026-02-01',
    nextMaintenance: '2026-04-01',
    usageHours: 450,
  },
];

const pendingWorkOrders = [
  {
    id: 'WO-445',
    assetId: 'AST-156',
    assetName: 'Forklift Model X200',
    title: 'Hydraulic System Check',
    priority: 'High',
    status: 'Pending',
    dueDate: '2026-02-15',
    assignedTo: 'You',
  },
  {
    id: 'WO-438',
    assetId: 'AST-234',
    assetName: 'Industrial Air Compressor',
    title: 'Filter Replacement',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2026-02-18',
    assignedTo: 'You',
  },
];

const recentActivity = [
  {
    id: 'ACT-01',
    assetId: 'AST-234',
    assetName: 'Industrial Air Compressor',
    action: 'Usage logged',
    hours: 8,
    date: '2026-02-11',
  },
  {
    id: 'ACT-02',
    assetId: 'AST-089',
    assetName: 'Electrical Generator',
    action: 'Inspection completed',
    date: '2026-02-10',
  },
  {
    id: 'ACT-03',
    assetId: 'AST-156',
    assetName: 'Forklift Model X200',
    action: 'Issue reported',
    date: '2026-02-09',
  },
];

export function AssetDashboard() {
  const stats = {
    assignedAssets: assignedAssets.length,
    maintenanceRequired: assignedAssets.filter((a) => a.status === 'Maintenance Required').length,
    openWorkOrders: pendingWorkOrders.length,
    avgHealth: Math.round(assignedAssets.reduce((acc, a) => acc + a.health, 0) / assignedAssets.length),
    criticalIssues: assignedAssets.filter((a) => a.health < 60).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Assets</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage equipment and submit work orders
          </p>
        </div>
        <Link to="/end-user/asset/work-order/new">
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Plus className="w-4 h-4 mr-2" />
            Submit Work Order
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Assigned Assets</p>
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold">{stats.assignedAssets}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Maintenance Required</p>
              <Wrench className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold">{stats.maintenanceRequired}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Open Work Orders</p>
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">{stats.openWorkOrders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Avg. Asset Health</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">{stats.avgHealth}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/enduser/asset/work-order/new">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Create Work Order</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Report equipment issue
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/enduser/asset/work-orders">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">My Work Orders</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    View all requests
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Critical Issues</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {stats.criticalIssues} equipment
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Assets */}
      <Card>
        <CardHeader>
          <CardTitle>My Assets</CardTitle>
          <CardDescription>Equipment and assets assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assignedAssets.map((asset) => (
              <Link key={asset.id} to={`/end-user/asset/item/${asset.id}`} className="block">
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-orange-500 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{asset.name}</h3>
                        <Badge variant="outline">{asset.category}</Badge>
                        <Badge
                          className={
                            asset.status === 'Operational'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                          }
                        >
                          {asset.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {asset.id} • {asset.location}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Health Score</p>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            asset.health >= 80
                              ? 'bg-green-500'
                              : asset.health >= 60
                              ? 'bg-orange-500'
                              : 'bg-red-500'
                          }`}
                        />
                        <p className="font-medium">{asset.health}%</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Usage Hours</p>
                      <p className="font-medium">{asset.usageHours}h</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Next Maintenance</p>
                      <p className="font-medium text-sm">
                        {new Date(asset.nextMaintenance).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Work Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pending Work Orders</CardTitle>
              <Link to="/end-user/asset/work-orders">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingWorkOrders.map((wo) => (
                <Link key={wo.id} to={`/end-user/asset/work-order/${wo.id}`} className="block">
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-orange-500 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{wo.title}</p>
                      <Badge
                        className={
                          wo.priority === 'High'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                        }
                      >
                        {wo.priority}
                      </Badge>
                      <Badge
                        className={
                          wo.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }
                      >
                        {wo.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      {wo.assetName} • {wo.id}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Due: {new Date(wo.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-800"
                >
                  <p className="font-medium mb-1">{activity.assetName}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    {activity.action}
                    {activity.hours && ` - ${activity.hours} hours`}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}