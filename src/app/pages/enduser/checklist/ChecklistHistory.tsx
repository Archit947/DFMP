import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import {
  ArrowLeft,
  Search,
  Download,
  FileText,
  Calendar,
  CheckCircle,
  AlertCircle,
  Filter,
  ChevronRight,
} from 'lucide-react';

const submissionHistory = [
  {
    id: 'CL-099',
    title: 'Daily HVAC Inspection',
    location: 'Building A - 3rd Floor',
    submittedDate: '2026-02-11',
    submittedTime: '13:45',
    score: 98,
    status: 'Approved',
    issues: 0,
    completedItems: 12,
    totalItems: 12,
  },
  {
    id: 'CL-098',
    title: 'Safety Equipment Check',
    location: 'Building B - Ground Floor',
    submittedDate: '2026-02-10',
    submittedTime: '15:30',
    score: 95,
    status: 'Approved',
    issues: 1,
    completedItems: 10,
    totalItems: 10,
  },
  {
    id: 'CL-097',
    title: 'Lighting System Check',
    location: 'Building C - All Floors',
    submittedDate: '2026-02-09',
    submittedTime: '11:20',
    score: 92,
    status: 'Approved',
    issues: 2,
    completedItems: 15,
    totalItems: 15,
  },
  {
    id: 'CL-096',
    title: 'Fire Extinguisher Inspection',
    location: 'All Buildings',
    submittedDate: '2026-02-08',
    submittedTime: '10:15',
    score: 100,
    status: 'Approved',
    issues: 0,
    completedItems: 8,
    totalItems: 8,
  },
  {
    id: 'CL-095',
    title: 'Electrical Panel Check',
    location: 'Building A - Basement',
    submittedDate: '2026-02-07',
    submittedTime: '14:50',
    score: 88,
    status: 'Approved',
    issues: 3,
    completedItems: 14,
    totalItems: 14,
  },
  {
    id: 'CL-094',
    title: 'Daily HVAC Inspection',
    location: 'Building A - 3rd Floor',
    submittedDate: '2026-02-06',
    submittedTime: '13:30',
    score: 96,
    status: 'Approved',
    issues: 1,
    completedItems: 12,
    totalItems: 12,
  },
  {
    id: 'CL-093',
    title: 'Plumbing System Check',
    location: 'Building B - All Floors',
    submittedDate: '2026-02-05',
    submittedTime: '09:45',
    score: 94,
    status: 'Approved',
    issues: 1,
    completedItems: 11,
    totalItems: 11,
  },
  {
    id: 'CL-092',
    title: 'Safety Equipment Check',
    location: 'Building B - Ground Floor',
    submittedDate: '2026-02-04',
    submittedTime: '16:00',
    score: 97,
    status: 'Approved',
    issues: 0,
    completedItems: 10,
    totalItems: 10,
  },
];

export function ChecklistHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredSubmissions = submissionHistory.filter((submission) => {
    const matchesSearch =
      submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
    }
  };

  const stats = {
    totalSubmissions: submissionHistory.length,
    averageScore: Math.round(
      submissionHistory.reduce((acc, s) => acc + s.score, 0) / submissionHistory.length
    ),
    totalIssues: submissionHistory.reduce((acc, s) => acc + s.issues, 0),
    approvalRate: Math.round(
      (submissionHistory.filter((s) => s.status === 'Approved').length / submissionHistory.length) *
        100
    ),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/end-user/checklist">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Submission History</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              View all your completed checklists
            </p>
          </div>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Submissions</p>
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">{stats.totalSubmissions}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Average Score</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">{stats.averageScore}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Issues Found</p>
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold">{stats.totalIssues}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Approval Rate</p>
              <CheckCircle className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold">{stats.approvalRate}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by title, ID, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Submission List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Submissions</CardTitle>
              <CardDescription>
                Showing {filteredSubmissions.length} of {submissionHistory.length} submissions
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredSubmissions.map((submission) => (
              <Link
                key={submission.id}
                to={`/enduser/checklist/submission/${submission.id}`}
                className="block"
              >
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{submission.title}</h3>
                        <Badge className={getStatusColor(submission.status)}>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {submission.status}
                        </Badge>
                        {submission.issues > 0 && (
                          <Badge variant="outline" className="text-orange-600">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {submission.issues} issue{submission.issues !== 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {submission.location} • {submission.id}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                          <Calendar className="w-3 h-3" />
                          {new Date(submission.submittedDate).toLocaleDateString()} at{' '}
                          {submission.submittedTime}
                        </span>
                        <span className="font-medium text-green-600">Score: {submission.score}%</span>
                        <span className="text-slate-600 dark:text-slate-400">
                          {submission.completedItems}/{submission.totalItems} items
                        </span>
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