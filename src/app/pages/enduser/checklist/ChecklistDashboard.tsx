import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';
import {
  ClipboardCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  TrendingUp,
  FileText,
  ChevronRight,
} from 'lucide-react';

const assignedChecklists = [
  {
    id: 'CL-001',
    title: 'Daily HVAC Inspection',
    location: 'Building A - 3rd Floor',
    dueDate: '2026-02-12',
    dueTime: '14:00',
    priority: 'High',
    status: 'Pending',
    progress: 0,
    estimatedTime: '15 min',
  },
  {
    id: 'CL-002',
    title: 'Safety Equipment Check',
    location: 'Building B - Ground Floor',
    dueDate: '2026-02-12',
    dueTime: '16:00',
    priority: 'High',
    status: 'Pending',
    progress: 0,
    estimatedTime: '10 min',
  },
  {
    id: 'CL-003',
    title: 'Fire Extinguisher Inspection',
    location: 'All Buildings',
    dueDate: '2026-02-13',
    dueTime: '10:00',
    priority: 'Medium',
    status: 'Pending',
    progress: 0,
    estimatedTime: '30 min',
  },
  {
    id: 'CL-004',
    title: 'Electrical Panel Check',
    location: 'Building A - Basement',
    dueDate: '2026-02-13',
    dueTime: '15:00',
    priority: 'Medium',
    status: 'In Progress',
    progress: 45,
    estimatedTime: '20 min',
  },
];

const recentSubmissions = [
  {
    id: 'CL-099',
    title: 'Daily HVAC Inspection',
    location: 'Building A - 3rd Floor',
    submittedDate: '2026-02-11',
    score: 98,
    status: 'Approved',
    issues: 0,
  },
  {
    id: 'CL-098',
    title: 'Safety Equipment Check',
    location: 'Building B - Ground Floor',
    submittedDate: '2026-02-10',
    score: 95,
    status: 'Approved',
    issues: 1,
  },
  {
    id: 'CL-097',
    title: 'Lighting System Check',
    location: 'Building C - All Floors',
    submittedDate: '2026-02-09',
    score: 92,
    status: 'Approved',
    issues: 2,
  },
];

export function ChecklistDashboard() {
  const stats = {
    pending: assignedChecklists.filter((c) => c.status === 'Pending').length,
    inProgress: assignedChecklists.filter((c) => c.status === 'In Progress').length,
    completedToday: 3,
    complianceRate: 98,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Checklists</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Complete your assigned facility inspection checklists
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Pending</p>
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold">{stats.pending}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Awaiting completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">In Progress</p>
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">{stats.inProgress}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Currently working on</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Completed Today</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">{stats.completedToday}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Submitted checklists</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Compliance Rate</p>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold">{stats.complianceRate}%</p>
            <p className="text-xs text-green-600 mt-1">Above target</p>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Checklists */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Assigned Checklists</CardTitle>
              <CardDescription>Checklists you need to complete</CardDescription>
            </div>
            <Badge variant="secondary">{assignedChecklists.length} total</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assignedChecklists.map((checklist) => (
              <Link
                key={checklist.id}
                to={`/enduser/checklist/complete/${checklist.id}`}
                className="block"
              >
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{checklist.title}</h3>
                        <Badge className={getPriorityColor(checklist.priority)}>
                          {checklist.priority}
                        </Badge>
                        <Badge className={getStatusColor(checklist.status)}>
                          {checklist.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <ClipboardCheck className="w-3 h-3" />
                          {checklist.id}
                        </span>
                        <span>{checklist.location}</span>
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>

                  {checklist.status === 'In Progress' && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-600 dark:text-slate-400">Progress</span>
                        <span className="font-medium">{checklist.progress}%</span>
                      </div>
                      <Progress value={checklist.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <Calendar className="w-3 h-3" />
                        Due: {new Date(checklist.dueDate).toLocaleDateString()} at {checklist.dueTime}
                      </span>
                      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <Clock className="w-3 h-3" />
                        {checklist.estimatedTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Submissions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>Your completed checklists</CardDescription>
            </div>
            <Link to="/end-user/checklist/history">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentSubmissions.map((submission) => (
              <Link
                key={submission.id}
                to={`/end-user/checklist/view/${submission.id}`}
                className="block"
              >
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <h3 className="font-semibold">{submission.title}</h3>
                        <Badge className={getStatusColor(submission.status)}>
                          {submission.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {submission.location} • {submission.id}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          Submitted: {new Date(submission.submittedDate).toLocaleDateString()}
                        </span>
                        <span className="font-medium text-green-600">
                          Score: {submission.score}%
                        </span>
                        {submission.issues > 0 && (
                          <span className="flex items-center gap-1 text-orange-600">
                            <AlertCircle className="w-3 h-3" />
                            {submission.issues} issue{submission.issues !== 1 ? 's' : ''} found
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}