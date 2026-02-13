import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Fuel,
  Wrench,
  AlertTriangle,
  Download,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const fuelTrendData = [
  { month: 'Aug', cost: 7200, consumption: 2800 },
  { month: 'Sep', cost: 7800, consumption: 3100 },
  { month: 'Oct', cost: 8200, consumption: 3200 },
  { month: 'Nov', cost: 7500, consumption: 2950 },
  { month: 'Dec', cost: 9100, consumption: 3500 },
  { month: 'Jan', cost: 8900, consumption: 3400 },
  { month: 'Feb', cost: 8450, consumption: 3280 },
];

const maintenanceCostData = [
  { month: 'Aug', preventive: 2100, corrective: 3200, emergency: 1500 },
  { month: 'Sep', preventive: 2400, corrective: 2800, emergency: 1200 },
  { month: 'Oct', preventive: 2200, corrective: 3500, emergency: 1800 },
  { month: 'Nov', preventive: 2600, corrective: 2900, emergency: 1100 },
  { month: 'Dec', preventive: 2300, corrective: 3100, emergency: 1600 },
  { month: 'Jan', preventive: 2500, corrective: 2700, emergency: 900 },
  { month: 'Feb', preventive: 2800, corrective: 2400, emergency: 750 },
];

const vehicleUtilizationData = [
  { name: 'Operational', value: 38, color: '#10b981' },
  { name: 'In Use', value: 28, color: '#3b82f6' },
  { name: 'Maintenance', value: 4, color: '#f59e0b' },
  { name: 'Idle', value: 10, color: '#6b7280' },
];

const downtimeData = [
  { category: 'Scheduled Maintenance', hours: 120, percentage: 45 },
  { category: 'Unscheduled Repairs', hours: 85, percentage: 32 },
  { category: 'Accidents', hours: 32, percentage: 12 },
  { category: 'Other', hours: 28, percentage: 11 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#6b7280'];

export function FleetAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/fleet">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Fleet Analytics</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Performance metrics and cost analysis
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="7days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Fleet Cost</p>
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold">$32,450</p>
            <div className="flex items-center gap-1 text-sm mt-1">
              <TrendingDown className="w-4 h-4 text-green-600" />
              <span className="text-green-600">12% lower</span>
              <span className="text-slate-600 dark:text-slate-400">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Fuel Costs</p>
              <Fuel className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold">$8,450</p>
            <div className="flex items-center gap-1 text-sm mt-1">
              <TrendingDown className="w-4 h-4 text-green-600" />
              <span className="text-green-600">5% decrease</span>
              <span className="text-slate-600 dark:text-slate-400">this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Maintenance Cost</p>
              <Wrench className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">$5,950</p>
            <div className="flex items-center gap-1 text-sm mt-1">
              <TrendingDown className="w-4 h-4 text-green-600" />
              <span className="text-green-600">18% lower</span>
              <span className="text-slate-600 dark:text-slate-400">than average</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Fleet Uptime</p>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold">94.8%</p>
            <div className="flex items-center gap-1 text-sm mt-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600">2.1% increase</span>
              <span className="text-slate-600 dark:text-slate-400">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="fuel" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="fuel">Fuel Analysis</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Fuel Analysis Tab */}
        <TabsContent value="fuel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fuel Cost & Consumption Trend</CardTitle>
              <CardDescription>Monthly fuel costs and consumption patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fuelTrendData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fill: 'currentColor' }} />
                    <YAxis
                      yAxisId="left"
                      className="text-xs"
                      tick={{ fill: 'currentColor' }}
                      label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft' }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      className="text-xs"
                      tick={{ fill: 'currentColor' }}
                      label={{ value: 'Consumption (L)', angle: 90, position: 'insideRight' }}
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
                      yAxisId="left"
                      type="monotone"
                      dataKey="cost"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name="Cost ($)"
                      dot={{ fill: '#f59e0b' }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="consumption"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Consumption (L)"
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
                <CardTitle>This Month Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Total Cost</span>
                  <span className="font-medium">$8,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Total Consumption</span>
                  <span className="font-medium">3,280 L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Avg. Price/Liter</span>
                  <span className="font-medium">$2.58</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Avg. per Vehicle</span>
                  <span className="font-medium">$201</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Efficient Vehicles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: 'VH-003', name: 'Pickup Truck #3', efficiency: '7.2 L/100km' },
                    { id: 'VH-001', name: 'Delivery Truck #1', efficiency: '8.5 L/100km' },
                    { id: 'VH-005', name: 'Cargo Van #5', efficiency: '9.1 L/100km' },
                  ].map((vehicle, index) => (
                    <div key={vehicle.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{vehicle.name}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{vehicle.id}</p>
                      </div>
                      <Badge variant="secondary">{vehicle.efficiency}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Fuel Price</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Inefficiency</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '30%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Distance</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '25%' }} />
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
              <CardTitle>Maintenance Cost Breakdown</CardTitle>
              <CardDescription>Preventive vs corrective maintenance costs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={maintenanceCostData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fill: 'currentColor' }} />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: 'currentColor' }}
                      label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="preventive" fill="#10b981" name="Preventive" />
                    <Bar dataKey="corrective" fill="#f59e0b" name="Corrective" />
                    <Bar dataKey="emergency" fill="#ef4444" name="Emergency" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Preventive</span>
                    <span className="font-medium text-green-600">$2,800 (47%)</span>
                  </div>
                  <div className="bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '47%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Corrective</span>
                    <span className="font-medium text-orange-600">$2,400 (40%)</span>
                  </div>
                  <div className="bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Emergency</span>
                    <span className="font-medium text-red-600">$750 (13%)</span>
                  </div>
                  <div className="bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '13%' }} />
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between">
                    <span className="font-medium">Total This Month</span>
                    <span className="font-bold">$5,950</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Downtime Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {downtimeData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-slate-600 dark:text-slate-400">{item.category}</span>
                          <span className="text-sm font-medium">{item.hours}h ({item.percentage}%)</span>
                        </div>
                        <div className="bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between">
                      <span className="font-medium">Total Downtime</span>
                      <span className="font-bold">265 hours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Utilization Tab */}
        <TabsContent value="utilization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fleet Utilization</CardTitle>
                <CardDescription>Current vehicle status distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={vehicleUtilizationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {vehicleUtilizationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--background)',
                          border: '1px solid var(--border)',
                          borderRadius: '6px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Utilization Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Average Daily Usage</p>
                  <p className="text-3xl font-bold">6.8 hours</p>
                  <p className="text-sm text-green-600 mt-1">12% above target</p>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Active Vehicles</span>
                    <span className="font-medium">28/42 (67%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Idle Time/Day</span>
                    <span className="font-medium">2.3 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Utilization Rate</span>
                    <span className="font-medium">74.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Vehicle Performance Rankings</CardTitle>
              <CardDescription>Top performers by utilization rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 'VH-008', name: 'Service Van #8', utilization: 92, hours: 7.4 },
                  { id: 'VH-001', name: 'Delivery Truck #1', utilization: 88, hours: 7.0 },
                  { id: 'VH-015', name: 'Pickup Truck #15', utilization: 85, hours: 6.8 },
                  { id: 'VH-003', name: 'Pickup Truck #3', utilization: 82, hours: 6.6 },
                  { id: 'VH-022', name: 'Cargo Van #22', utilization: 78, hours: 6.2 },
                ].map((vehicle, index) => (
                  <div
                    key={vehicle.id}
                    className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{vehicle.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {vehicle.id} • {vehicle.hours}h avg/day
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{vehicle.utilization}%</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">utilization</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Safety Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-5xl font-bold text-green-600">A+</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Excellent Performance</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Incidents</span>
                      <span className="font-medium">2 this year</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Violations</span>
                      <span className="font-medium">5 this year</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-5xl font-bold">98.5%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Inspection compliance</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completed</span>
                      <span className="font-medium">412/418</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pending</span>
                      <span className="font-medium">6</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-5xl font-bold text-green-600">+18%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Cost savings YTD</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Saved</span>
                      <span className="font-medium">$24,300</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Target</span>
                      <span className="font-medium">$28,000</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Critical Alerts & Actions</CardTitle>
              <CardDescription>Items requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    vehicle: 'VH-004',
                    issue: 'Maintenance Overdue',
                    severity: 'Critical',
                    action: 'Schedule immediately',
                  },
                  {
                    vehicle: 'VH-012',
                    issue: 'Inspection Due',
                    severity: 'High',
                    action: 'Due in 2 days',
                  },
                  {
                    vehicle: 'VH-018',
                    issue: 'Low Fuel Efficiency',
                    severity: 'Medium',
                    action: 'Check engine',
                  },
                ].map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-4">
                      <AlertTriangle
                        className={`w-5 h-5 ${
                          alert.severity === 'Critical'
                            ? 'text-red-600'
                            : alert.severity === 'High'
                            ? 'text-orange-600'
                            : 'text-yellow-600'
                        }`}
                      />
                      <div>
                        <p className="font-medium">{alert.issue}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {alert.vehicle} • {alert.action}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        alert.severity === 'Critical'
                          ? 'destructive'
                          : alert.severity === 'High'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {alert.severity}
                    </Badge>
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
