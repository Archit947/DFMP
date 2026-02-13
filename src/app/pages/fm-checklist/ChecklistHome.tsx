import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  ClipboardCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  TrendingUp,
  BarChart3,
} from 'lucide-react';

const checklists = [
  {
    id: 1,
    title: 'Daily Safety Inspection',
    category: 'Safety',
    status: 'Active',
    dueDate: '2026-02-11',
    completionRate: 85,
    assignedTo: 'John Doe',
    lastCompleted: '2 hours ago',
    priority: 'High',
  },
  {
    id: 2,
    title: 'HVAC System Check',
    category: 'Maintenance',
    status: 'Pending',
    dueDate: '2026-02-12',
    completionRate: 0,
    assignedTo: 'Jane Smith',
    lastCompleted: '1 day ago',
    priority: 'Medium',
  },
  {
    id: 3,
    title: 'Fire Safety Audit',
    category: 'Compliance',
    status: 'Overdue',
    dueDate: '2026-02-10',
    completionRate: 60,
    assignedTo: 'Mike Johnson',
    lastCompleted: '3 days ago',
    priority: 'High',
  },
  {
    id: 4,
    title: 'Electrical Panel Inspection',
    category: 'Maintenance',
    status: 'Active',
    dueDate: '2026-02-13',
    completionRate: 40,
    assignedTo: 'Sarah Williams',
    lastCompleted: '5 hours ago',
    priority: 'Low',
  },
];

const stats = [
  { label: 'Total Checklists', value: '23', icon: ClipboardCheck, color: 'text-blue-600' },
  { label: 'Completed Today', value: '12', icon: CheckCircle, color: 'text-green-600' },
  { label: 'Pending', value: '8', icon: Clock, color: 'text-orange-600' },
  { label: 'Overdue', value: '3', icon: AlertCircle, color: 'text-red-600' },
];

export function ChecklistHome() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">FM E-Checklist</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage inspections, compliance, and audits
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/fm-checklist/builder">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Checklist
            </Button>
          </Link>
          <Link to="/fm-checklist/reports">
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Reports
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

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Checklists</CardTitle>
              <CardDescription>Manage and track all your checklists</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Search checklists..." className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-4">
              {checklists.map((checklist) => (
                <Link key={checklist.id} to={`/fm-checklist/inspection/${checklist.id}`}>
                  <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{checklist.title}</h3>
                          <Badge variant={
                            checklist.status === 'Active' ? 'default' :
                            checklist.status === 'Overdue' ? 'destructive' : 'secondary'
                          }>
                            {checklist.status}
                          </Badge>
                          <Badge variant="outline">{checklist.priority}</Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {checklist.category} • Assigned to {checklist.assignedTo}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Due: {new Date(checklist.dueDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          Last completed: {checklist.lastCompleted}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${checklist.completionRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{checklist.completionRate}%</span>
                    </div>
                  </div>
                </Link>
              ))}
            </TabsContent>

            <TabsContent value="active" className="mt-4">
              <p className="text-center text-slate-600 dark:text-slate-400 py-8">
                Filter: Active checklists
              </p>
            </TabsContent>

            <TabsContent value="pending" className="mt-4">
              <p className="text-center text-slate-600 dark:text-slate-400 py-8">
                Filter: Pending checklists
              </p>
            </TabsContent>

            <TabsContent value="overdue" className="mt-4">
              <p className="text-center text-slate-600 dark:text-slate-400 py-8">
                Filter: Overdue checklists
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Rate</CardTitle>
            <CardDescription>Overall compliance tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Safety', 'Maintenance', 'Quality', 'Environmental'].map((category, index) => {
                const rate = [94, 87, 91, 89][index];
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{category}</span>
                      <span className="text-sm font-bold">{rate}%</span>
                    </div>
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${rate}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Audits</CardTitle>
            <CardDescription>Latest audit activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: 'Safety Audit - Building A', date: '2 hours ago', status: 'Passed' },
                { title: 'Fire System Check', date: '5 hours ago', status: 'Passed' },
                { title: 'HVAC Inspection', date: '1 day ago', status: 'Failed' },
                { title: 'Electrical Safety', date: '2 days ago', status: 'Passed' },
              ].map((audit, index) => (
                <div key={index} className="flex items-center justify-between pb-3 border-b last:border-0 border-slate-200 dark:border-slate-800">
                  <div>
                    <p className="text-sm font-medium">{audit.title}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{audit.date}</p>
                  </div>
                  <Badge variant={audit.status === 'Passed' ? 'default' : 'destructive'}>
                    {audit.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
