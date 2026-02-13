import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  ClipboardCheck,
  QrCode,
  Truck,
  Package,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  Calendar,
  Activity,
} from 'lucide-react';

const modules = [
  {
    id: 'fm-checklist',
    name: 'FM E-Checklist',
    description: 'Digital checklists, inspections, and compliance tracking',
    icon: ClipboardCheck,
    href: '/fm-checklist',
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-blue-600',
    stats: [
      { label: 'Active Checklists', value: '23', trend: 'up', change: '+12%' },
      { label: 'Pending Inspections', value: '8', trend: 'neutral' },
      { label: 'Compliance Rate', value: '94%', trend: 'up', change: '+3%' },
    ],
    recentActivity: 'Last inspection: 2 hours ago',
    status: 'Active',
    quickActions: [
      { label: 'New Checklist', href: '/fm-checklist/builder' },
      { label: 'View Reports', href: '/fm-checklist/reports' },
    ],
  },
  {
    id: 'ojt',
    name: 'QR-Based OJT App',
    description: 'Training modules, skill tracking, and certification management',
    icon: QrCode,
    href: '/ojt',
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-purple-600',
    stats: [
      { label: 'Active Trainings', value: '15', trend: 'up', change: '+8%' },
      { label: 'Certifications Due', value: '5', trend: 'down', change: '-2' },
      { label: 'Completion Rate', value: '87%', trend: 'up', change: '+5%' },
    ],
    recentActivity: 'Last training completed: 3 hours ago',
    status: 'Active',
    quickActions: [
      { label: 'Scan QR Code', href: '/ojt/scanner' },
      { label: 'View Analytics', href: '/ojt/analytics' },
    ],
  },
  {
    id: 'fleet',
    name: 'Fleet Management',
    description: 'Vehicle tracking, maintenance scheduling, and cost analytics',
    icon: Truck,
    href: '/fleet',
    color: 'bg-green-500',
    gradient: 'from-green-500 to-green-600',
    stats: [
      { label: 'Total Vehicles', value: '42', trend: 'neutral' },
      { label: 'Maintenance Due', value: '6', trend: 'up', change: '+2' },
      { label: 'Operational Rate', value: '91%', trend: 'down', change: '-2%' },
    ],
    recentActivity: 'Last inspection: 1 hour ago',
    status: 'Alert',
    quickActions: [
      { label: 'New Inspection', href: '/fleet/inspection/new' },
      { label: 'View Analytics', href: '/fleet/analytics' },
    ],
  },
  {
    id: 'asset',
    name: 'Asset Management',
    description: 'Asset lifecycle, work orders, and inventory management',
    icon: Package,
    href: '/asset',
    color: 'bg-orange-500',
    gradient: 'from-orange-500 to-orange-600',
    stats: [
      { label: 'Total Assets', value: '1,234', trend: 'up', change: '+15' },
      { label: 'Work Orders', value: '18', trend: 'neutral' },
      { label: 'Uptime', value: '96%', trend: 'up', change: '+1%' },
    ],
    recentActivity: 'Last work order: 30 minutes ago',
    status: 'Active',
    quickActions: [
      { label: 'Register Asset', href: '/asset/register' },
      { label: 'Work Orders', href: '/asset/work-orders' },
    ],
  },
];

const overallMetrics = [
  { label: 'Overall System Health', value: '92%', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-900/20' },
  { label: 'Active Alerts', value: '12', icon: AlertCircle, color: 'text-orange-600', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
  { label: 'Tasks Completed Today', value: '47', icon: CheckCircle, color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
  { label: 'Efficiency Score', value: '88%', icon: TrendingUp, color: 'text-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
];

const upcomingTasks = [
  { title: 'HVAC Unit Inspection', module: 'FM E-Checklist', dueIn: '2 hours', priority: 'High', icon: ClipboardCheck, color: 'text-blue-600' },
  { title: 'Safety Training Session', module: 'QR-Based OJT', dueIn: '4 hours', priority: 'Medium', icon: QrCode, color: 'text-purple-600' },
  { title: 'Vehicle #042 Service', module: 'Fleet Management', dueIn: 'Tomorrow', priority: 'High', icon: Truck, color: 'text-green-600' },
  { title: 'Generator Maintenance', module: 'Asset Management', dueIn: '2 days', priority: 'Medium', icon: Package, color: 'text-orange-600' },
];

const recentActivities = [
  { time: '10 min ago', module: 'Asset Management', action: 'Work order #WO-234 completed', user: 'John Doe', icon: Package, color: 'bg-orange-500' },
  { time: '25 min ago', module: 'Fleet Management', action: 'Vehicle #VH-042 inspection completed', user: 'Jane Smith', icon: Truck, color: 'bg-green-500' },
  { time: '1 hour ago', module: 'FM E-Checklist', action: 'Safety checklist submitted', user: 'Mike Johnson', icon: ClipboardCheck, color: 'bg-blue-500' },
  { time: '2 hours ago', module: 'QR-Based OJT', action: 'Training module completed', user: 'Sarah Williams', icon: QrCode, color: 'bg-purple-500' },
  { time: '3 hours ago', module: 'Asset Management', action: 'New asset registered', user: 'David Brown', icon: Package, color: 'bg-orange-500' },
];

export function Dashboard() {
  const user = JSON.parse(localStorage.getItem('fm-user') || '{}');
  
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user.name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            System Status
          </Button>
        </div>
      </div>

      {/* Overall Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overallMetrics.map((metric) => (
          <Card key={metric.label} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{metric.label}</p>
                  <p className="text-3xl font-bold mt-2">{metric.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Card key={module.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className={`h-1 bg-gradient-to-r ${module.gradient}`} />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`${module.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {module.name}
                      </CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={module.status === 'Alert' ? 'destructive' : 'default'} className="flex items-center gap-1">
                    {module.status === 'Alert' ? <AlertCircle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                    {module.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {module.stats.map((stat) => (
                    <div key={stat.label} className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">{stat.label}</p>
                      <div className="flex items-center justify-center gap-1">
                        <p className="text-xl font-bold">{stat.value}</p>
                        {stat.change && (
                          <span
                            className={`text-xs flex items-center ${
                              stat.trend === 'up'
                                ? 'text-green-600'
                                : stat.trend === 'down'
                                ? 'text-red-600'
                                : 'text-slate-600'
                            }`}
                          >
                            {stat.trend === 'up' ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : stat.trend === 'down' ? (
                              <TrendingDown className="w-3 h-3" />
                            ) : null}
                            {stat.change}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {module.recentActivity}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 pt-2">
                  {module.quickActions.map((action) => (
                    <Link key={action.label} to={action.href} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        {action.label}
                      </Button>
                    </Link>
                  ))}
                  <Link to={module.href}>
                    <Button size="sm" className={`${module.color}`}>
                      View All
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom Section - Upcoming Tasks & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Tasks and events scheduled for today and tomorrow</CardDescription>
              </div>
              <Badge variant="secondary">{upcomingTasks.length} tasks</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${task.color}`}>
                    <task.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{task.module}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'} className="mb-1">
                      {task.priority}
                    </Badge>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{task.dueIn}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Timeline */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates across all modules</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 border-slate-200 dark:border-slate-800">
                  <div className={`w-8 h-8 rounded-full ${activity.color} flex items-center justify-center text-white flex-shrink-0`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-2">
                      <span>{activity.module}</span>
                      <span>•</span>
                      <span>{activity.user}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
