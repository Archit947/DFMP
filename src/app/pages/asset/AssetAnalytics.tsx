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
  Package,
  Wrench,
  AlertTriangle,
  Download,
  Activity,
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

const maintenanceCostData = [
  { month: 'Aug', preventive: 8200, corrective: 12400, emergency: 4200 },
  { month: 'Sep', preventive: 8900, corrective: 11800, emergency: 3800 },
  { month: 'Oct', preventive: 8500, corrective: 13200, emergency: 4500 },
  { month: 'Nov', preventive: 9200, corrective: 10900, emergency: 3200 },
  { month: 'Dec', preventive: 8800, corrective: 12100, emergency: 4100 },
  { month: 'Jan', preventive: 9400, corrective: 10200, emergency: 2900 },
  { month: 'Feb', preventive: 9800, corrective: 9600, emergency: 2450 },
];

const assetHealthData = [
  { month: 'Aug', avgHealth: 88 },
  { month: 'Sep', avgHealth: 89 },
  { month: 'Oct', avgHealth: 87 },
  { month: 'Nov', avgHealth: 90 },
  { month: 'Dec', avgHealth: 91 },
  { month: 'Jan', avgHealth: 92 },
  { month: 'Feb', avgHealth: 93 },
];

const assetCategoryDistribution = [
  { name: 'HVAC', value: 35, color: '#3b82f6' },
  { name: 'Power', value: 22, color: '#f59e0b' },
  { name: 'Plumbing', value: 18, color: '#10b981' },
  { name: 'Transport', value: 12, color: '#8b5cf6' },
  { name: 'Other', value: 13, color: '#6b7280' },
];

const downtimeData = [
  { category: 'Planned Maintenance', hours: 245, percentage: 48 },
  { category: 'Unplanned Repairs', hours: 165, percentage: 32 },
  { category: 'Equipment Failure', hours: 68, percentage: 13 },
  { category: 'Other', hours: 35, percentage: 7 },
];

const criticalAssets = [
  { id: 'AS-003', name: 'Water Pump Station', health: 45, alerts: 3, status: 'Critical' },
  { id: 'AS-008', name: 'Backup Generator', health: 62, alerts: 2, status: 'Warning' },
  { id: 'AS-015', name: 'Fire Suppression System', health: 68, alerts: 1, status: 'Warning' },
];

export function AssetAnalytics() {
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
            <h1 className="text-3xl font-bold tracking-tight">Asset Analytics</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Performance insights and cost analysis
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
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Assets</p>
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold">1,234</p>
            <div className="flex items-center gap-1 text-sm mt-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600">8 new</span>
              <span className="text-slate-600 dark:text-slate-400">this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Avg. Health Score</p>
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold">93%</p>
            <div className="flex items-center gap-1 text-sm mt-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600">+2.5%</span>
              <span className="text-slate-600 dark:text-slate-400">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Maintenance Cost</p>
              <Wrench className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">$21,850</p>
            <div className="flex items-center gap-1 text-sm mt-1">
              <TrendingDown className="w-4 h-4 text-green-600" />
              <span className="text-green-600">15% lower</span>
              <span className="text-slate-600 dark:text-slate-400">than average</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">System Uptime</p>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold">96.4%</p>
            <div className="flex items-center gap-1 text-sm mt-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600">+1.2%</span>
              <span className="text-slate-600 dark:text-slate-400">improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="costs" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="health">Asset Health</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>

        {/* Cost Analysis Tab */}
        <TabsContent value="costs" className="space-y-6">
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
                    <Bar dataKey="preventive" fill="#10b981" name="Preventive" stackId="a" />
                    <Bar dataKey="corrective" fill="#f59e0b" name="Corrective" stackId="a" />
                    <Bar dataKey="emergency" fill="#ef4444" name="Emergency" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Preventive</span>
                    <span className="font-medium text-green-600">$9,800 (45%)</span>
                  </div>
                  <div className="bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Corrective</span>
                    <span className="font-medium text-orange-600">$9,600 (44%)</span>
                  </div>
                  <div className="bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '44%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Emergency</span>
                    <span className="font-medium text-red-600">$2,450 (11%)</span>
                  </div>
                  <div className="bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '11%' }} />
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between">
                    <span className="font-medium">Total This Month</span>
                    <span className="font-bold">$21,850</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Cost Savings (YTD)</p>
                  <p className="text-3xl font-bold text-green-600">$28,340</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    vs. reactive maintenance approach
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Avoided Downtime</span>
                    <span className="font-medium">$15,200</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Reduced Emergency Repairs</span>
                    <span className="font-medium">$8,900</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Extended Asset Life</span>
                    <span className="font-medium">$4,240</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Cost Drivers</CardTitle>
              <CardDescription>Assets with highest maintenance costs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 'AS-002', name: 'Generator #1', category: 'Power', cost: 4250, percentage: 19 },
                  { id: 'AS-003', name: 'Water Pump Station', category: 'Plumbing', cost: 3890, percentage: 18 },
                  { id: 'AS-001', name: 'HVAC Unit - Building A', category: 'HVAC', cost: 3120, percentage: 14 },
                  { id: 'AS-015', name: 'Fire Suppression System', category: 'Safety', cost: 2840, percentage: 13 },
                ].map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-medium">{asset.name}</p>
                        <Badge variant="outline">{asset.category}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                          <div
                            className="bg-orange-600 h-2 rounded-full"
                            style={{ width: `${asset.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-16 text-right">${asset.cost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Asset Health Tab */}
        <TabsContent value="health" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Average Asset Health Trend</CardTitle>
              <CardDescription>Overall asset health score over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={assetHealthData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fill: 'currentColor' }} />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: 'currentColor' }}
                      label={{ value: 'Health Score (%)', angle: -90, position: 'insideLeft' }}
                      domain={[80, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="avgHealth"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Avg. Health"
                      dot={{ fill: '#10b981', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Critical Assets Requiring Attention</CardTitle>
              <CardDescription>Assets with low health scores or multiple alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalAssets.map((asset) => (
                  <Link key={asset.id} to={`/asset/item/${asset.id}`}>
                    <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{asset.name}</h3>
                            <Badge variant={asset.status === 'Critical' ? 'destructive' : 'secondary'}>
                              {asset.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{asset.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{asset.health}%</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Health Score</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="text-red-600">{asset.alerts} active alert{asset.alerts > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Excellent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-green-600">892</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Assets (72%)</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Health score 90-100%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Good</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-blue-600">278</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Assets (23%)</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Health score 70-89%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Needs Attention</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-red-600">64</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Assets (5%)</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Health score below 70%</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Uptime</CardTitle>
                <CardDescription>Overall facility uptime percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-6xl font-bold text-green-600">96.4%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Current Month</p>
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Target</span>
                      <span className="font-medium">95.0%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Last Month</span>
                      <span className="font-medium">95.2%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">YTD Average</span>
                      <span className="font-medium">95.8%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Downtime Analysis</CardTitle>
                <CardDescription>Breakdown of downtime causes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {downtimeData.map((item) => (
                    <div key={item.category}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600 dark:text-slate-400">{item.category}</span>
                        <span className="font-medium">
                          {item.hours}h ({item.percentage}%)
                        </span>
                      </div>
                      <div className="bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-orange-600 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between">
                      <span className="font-medium">Total Downtime</span>
                      <span className="font-bold">513 hours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">MTBF</p>
                  <p className="text-3xl font-bold">2,450h</p>
                  <p className="text-sm text-green-600 mt-1">+8% improvement</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">MTTR</p>
                  <p className="text-3xl font-bold">4.2h</p>
                  <p className="text-sm text-green-600 mt-1">-12% faster</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Work Order Completion</p>
                  <p className="text-3xl font-bold">94%</p>
                  <p className="text-sm text-green-600 mt-1">On-time delivery</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">PM Compliance</p>
                  <p className="text-3xl font-bold">98.5%</p>
                  <p className="text-sm text-green-600 mt-1">Above target</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Distribution by Category</CardTitle>
                <CardDescription>Breakdown of asset types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={assetCategoryDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {assetCategoryDistribution.map((entry, index) => (
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
                <CardTitle>Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Asset Value</p>
                  <p className="text-4xl font-bold">$8.4M</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Current replacement value</p>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Purchase Value</span>
                    <span className="font-medium">$10.2M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Depreciation</span>
                    <span className="font-medium text-red-600">-$1.8M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Avg. Asset Age</span>
                    <span className="font-medium">4.2 years</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Asset Lifecycle Status</CardTitle>
              <CardDescription>Distribution by age and expected lifespan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { phase: 'New (0-2 years)', count: 342, percentage: 28, color: 'bg-green-600' },
                  { phase: 'Optimal (3-5 years)', count: 548, percentage: 44, color: 'bg-blue-600' },
                  { phase: 'Aging (6-8 years)', count: 278, percentage: 23, color: 'bg-orange-600' },
                  { phase: 'End of Life (9+ years)', count: 66, percentage: 5, color: 'bg-red-600' },
                ].map((phase) => (
                  <div key={phase.phase}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-400">{phase.phase}</span>
                      <span className="font-medium">
                        {phase.count} assets ({phase.percentage}%)
                      </span>
                    </div>
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                      <div
                        className={`${phase.color} h-2 rounded-full`}
                        style={{ width: `${phase.percentage}%` }}
                      />
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