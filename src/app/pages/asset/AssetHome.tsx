import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Progress } from '../../components/ui/progress';
import {
  Package,
  Plus,
  Search,
  Filter,
  Wrench,
  TrendingUp,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
} from 'lucide-react';

const stats = [
  { label: 'Total Assets', value: '1,234', icon: Package, color: 'text-orange-600' },
  { label: 'Active Work Orders', value: '18', icon: Wrench, color: 'text-blue-600' },
  { label: 'Uptime', value: '96%', icon: CheckCircle, color: 'text-green-600' },
  { label: 'Maintenance Cost', value: '$24.5K', icon: DollarSign, color: 'text-purple-600' },
];

const assets = [
  {
    id: 'AS-001',
    name: 'HVAC Unit - Building A',
    category: 'HVAC',
    status: 'Operational',
    location: 'Building A - Roof',
    condition: 95,
    lastMaintenance: '5 days ago',
    nextMaintenance: '2026-03-01',
    workOrders: 0,
    alerts: [],
  },
  {
    id: 'AS-002',
    name: 'Generator #1',
    category: 'Power',
    status: 'Maintenance',
    location: 'Building B - Basement',
    condition: 75,
    lastMaintenance: '2 weeks ago',
    nextMaintenance: '2026-02-15',
    workOrders: 2,
    alerts: ['Oil change required'],
  },
  {
    id: 'AS-003',
    name: 'Water Pump Station',
    category: 'Plumbing',
    status: 'Critical',
    location: 'Building C - Ground Floor',
    condition: 45,
    lastMaintenance: '1 month ago',
    nextMaintenance: '2026-02-10',
    workOrders: 3,
    alerts: ['Pressure low', 'Maintenance overdue'],
  },
  {
    id: 'AS-004',
    name: 'Elevator System #2',
    category: 'Transport',
    status: 'Operational',
    location: 'Building A - Shaft 2',
    condition: 88,
    lastMaintenance: '1 week ago',
    nextMaintenance: '2026-04-01',
    workOrders: 0,
    alerts: [],
  },
];

export function AssetHome() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Asset Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Track and maintain all facility assets
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/asset/register">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Register Asset
            </Button>
          </Link>
          <Link to="/asset/work-orders">
            <Button variant="outline">
              <Wrench className="w-4 h-4 mr-2" />
              Work Orders
            </Button>
          </Link>
          <Link to="/asset/analytics">
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Asset List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Asset Registry</CardTitle>
              <CardDescription>All registered facility assets</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Search assets..." className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assets.map((asset) => (
              <Link key={asset.id} to={`/asset/item/${asset.id}`}>
                <div
                  className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                    asset.status === 'Critical'
                      ? 'border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-4 flex-1">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          asset.status === 'Operational'
                            ? 'bg-green-100 dark:bg-green-900/20'
                            : asset.status === 'Critical'
                            ? 'bg-red-100 dark:bg-red-900/20'
                            : 'bg-orange-100 dark:bg-orange-900/20'
                        }`}
                      >
                        <Package
                          className={`w-6 h-6 ${
                            asset.status === 'Operational'
                              ? 'text-green-600'
                              : asset.status === 'Critical'
                              ? 'text-red-600'
                              : 'text-orange-600'
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{asset.name}</h3>
                          <Badge
                            variant={
                              asset.status === 'Operational'
                                ? 'default'
                                : asset.status === 'Critical'
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {asset.status}
                          </Badge>
                          <Badge variant="outline">{asset.category}</Badge>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {asset.id}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {asset.location} • Last maintained: {asset.lastMaintenance}
                        </p>
                        
                        {asset.alerts.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {asset.alerts.map((alert, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {alert}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="grid grid-cols-3 gap-4 mt-3">
                          <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Next Maintenance</p>
                            <p className="text-sm font-medium">
                              {new Date(asset.nextMaintenance).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Work Orders</p>
                            <p className="text-sm font-medium">
                              {asset.workOrders} {asset.workOrders === 0 ? '✓' : 'active'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Condition</p>
                            <p className="text-sm font-medium">{asset.condition}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Condition indicator */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Asset Condition</span>
                      <span className="font-medium">{asset.condition}%</span>
                    </div>
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          asset.condition < 50
                            ? 'bg-red-600'
                            : asset.condition < 80
                            ? 'bg-orange-600'
                            : 'bg-green-600'
                        }`}
                        style={{ width: `${asset.condition}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Work Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: 'WO-101', asset: 'Generator #1', type: 'Preventive', priority: 'High', status: 'In Progress' },
                { id: 'WO-102', asset: 'Water Pump', type: 'Corrective', priority: 'Critical', status: 'Pending' },
                { id: 'WO-103', asset: 'HVAC Unit', type: 'Inspection', priority: 'Medium', status: 'Scheduled' },
              ].map((wo) => (
                <div
                  key={wo.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800"
                >
                  <div>
                    <p className="font-medium">{wo.id}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {wo.asset} • {wo.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={wo.priority === 'Critical' ? 'destructive' : 'secondary'}
                      className="mb-1"
                    >
                      {wo.priority}
                    </Badge>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{wo.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Downtime Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">This Month</p>
                <p className="text-2xl font-bold">24 hours</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  18% improvement
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                {['HVAC', 'Power', 'Plumbing'].map((category, index) => (
                  <div key={category}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-400">{category}</span>
                      <span className="font-medium">{[8, 10, 6][index]}h</span>
                    </div>
                    <Progress value={[33, 42, 25][index]} />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ROI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Maintenance Savings</p>
                <p className="text-2xl font-bold">$12,340</p>
                <p className="text-sm text-green-600">vs. reactive maintenance</p>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Preventive</span>
                    <span className="font-medium text-green-600">$8,200</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Corrective</span>
                    <span className="font-medium text-orange-600">$16,300</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Emergency</span>
                    <span className="font-medium text-red-600">$4,500</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}