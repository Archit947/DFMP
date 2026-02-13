import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Filter, Calendar, TrendingUp } from 'lucide-react';

const complianceData = [
  { month: 'Jan', rate: 92 },
  { month: 'Feb', rate: 94 },
  { month: 'Mar', rate: 91 },
  { month: 'Apr', rate: 95 },
  { month: 'May', rate: 93 },
  { month: 'Jun', rate: 96 },
];

const categoryData = [
  { name: 'Safety', completed: 156, pending: 12 },
  { name: 'Maintenance', completed: 98, pending: 8 },
  { name: 'Quality', completed: 134, pending: 6 },
  { name: 'Environmental', completed: 87, pending: 4 },
];

const statusData = [
  { name: 'Completed', value: 475, color: '#22c55e' },
  { name: 'In Progress', value: 30, color: '#3b82f6' },
  { name: 'Overdue', value: 12, color: '#ef4444' },
];

export function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Comprehensive insights and compliance tracking
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Inspections</p>
            <p className="text-3xl font-bold mt-2">517</p>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4" />
              +12% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">Compliance Rate</p>
            <p className="text-3xl font-bold mt-2">94%</p>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4" />
              +3% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">Avg Response Time</p>
            <p className="text-3xl font-bold mt-2">2.4h</p>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4" />
              18% faster
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">Issues Resolved</p>
            <p className="text-3xl font-bold mt-2">89%</p>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4" />
              +5% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Trend</CardTitle>
                <CardDescription>Monthly compliance rate over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={complianceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[85, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} name="Compliance %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
                <CardDescription>Current inspection status breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance by Category</CardTitle>
              <CardDescription>Detailed compliance metrics across all categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#22c55e" name="Completed" />
                  <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['Safety', 'Maintenance', 'Quality', 'Environmental'].map((category, index) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                  <CardDescription>Detailed metrics for {category.toLowerCase()}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Completion Rate</span>
                      <span className="text-sm font-bold">{[94, 87, 91, 89][index]}%</span>
                    </div>
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${[94, 87, 91, 89][index]}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Total</p>
                      <p className="text-xl font-bold">{[156, 98, 134, 87][index]}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Pending</p>
                      <p className="text-xl font-bold">{[12, 8, 6, 4][index]}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Team performance and efficiency indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { metric: 'Average Time to Complete', value: '45 min', target: '60 min', performance: 75 },
                  { metric: 'First-Time Pass Rate', value: '87%', target: '80%', performance: 109 },
                  { metric: 'Issue Resolution Time', value: '2.4 hours', target: '3 hours', performance: 80 },
                  { metric: 'Recurring Issues', value: '8%', target: '10%', performance: 80 },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{item.metric}</span>
                      <div className="text-right">
                        <span className="font-bold">{item.value}</span>
                        <span className="text-xs text-slate-600 dark:text-slate-400 ml-2">
                          Target: {item.target}
                        </span>
                      </div>
                    </div>
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.performance >= 100 ? 'bg-green-600' : 'bg-blue-600'
                        }`}
                        style={{ width: `${Math.min(item.performance, 100)}%` }}
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
