import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';
import {
  Search,
  CheckCircle,
  Clock,
  Award,
  Calendar,
  TrendingUp,
  BookOpen,
  Filter,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';

const trainingHistory = [
  {
    id: 'course-1',
    title: 'HVAC Fundamentals Training',
    category: 'HVAC',
    status: 'Completed',
    progress: 100,
    completedDate: '2026-02-10',
    duration: '2.5 hours',
    score: 95,
    modules: 5,
    certificateId: 'CERT-001',
  },
  {
    id: 'course-2',
    title: 'Electrical Safety Procedures',
    category: 'Electrical',
    status: 'Completed',
    progress: 100,
    completedDate: '2026-02-05',
    duration: '3 hours',
    score: 88,
    modules: 6,
    certificateId: 'CERT-002',
  },
  {
    id: 'course-3',
    title: 'Fire Safety & Emergency Response',
    category: 'Safety',
    status: 'In Progress',
    progress: 65,
    startedDate: '2026-02-12',
    duration: '2 hours',
    modules: 4,
    completedModules: 2,
  },
  {
    id: 'course-4',
    title: 'Plumbing Maintenance Basics',
    category: 'Plumbing',
    status: 'In Progress',
    progress: 30,
    startedDate: '2026-02-13',
    duration: '1.5 hours',
    modules: 3,
    completedModules: 1,
  },
  {
    id: 'course-5',
    title: 'Building Automation Systems',
    category: 'Technology',
    status: 'Completed',
    progress: 100,
    completedDate: '2026-01-28',
    duration: '4 hours',
    score: 92,
    modules: 8,
    certificateId: 'CERT-003',
  },
];

export function TrainingHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredHistory = trainingHistory.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || course.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const completedCount = trainingHistory.filter((c) => c.status === 'Completed').length;
  const inProgressCount = trainingHistory.filter((c) => c.status === 'In Progress').length;
  const totalHours = trainingHistory
    .filter((c) => c.status === 'Completed')
    .reduce((acc, c) => acc + parseFloat(c.duration), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Training History</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          View all your completed and ongoing training courses
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Completed</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">{completedCount}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">In Progress</p>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">{inProgressCount}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Hours</p>
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold">{totalHours.toFixed(1)}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Certificates</p>
              <Award className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold">{completedCount}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Training History List */}
      <div className="space-y-4">
        {filteredHistory.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{course.category}</Badge>
                        <Badge
                          className={
                            course.status === 'Completed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                          }
                        >
                          {course.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Modules</p>
                      <p className="font-medium">
                        {course.status === 'Completed'
                          ? `${course.modules}/${course.modules}`
                          : `${course.completedModules}/${course.modules}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Duration</p>
                      <p className="font-medium">{course.duration}</p>
                    </div>
                    {course.status === 'Completed' && (
                      <>
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Score</p>
                          <p className="font-medium text-green-600">{course.score}%</p>
                        </div>
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Completed</p>
                          <p className="font-medium">
                            {new Date(course.completedDate!).toLocaleDateString()}
                          </p>
                        </div>
                      </>
                    )}
                    {course.status === 'In Progress' && (
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Started</p>
                        <p className="font-medium">
                          {new Date(course.startedDate!).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {course.status === 'Completed' ? (
                    <>
                      <Link to={`/enduser/training/course/${course.id}`}>
                        <Button variant="outline" className="w-full">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      </Link>
                      <Link to="/enduser/training/certificates">
                        <Button variant="outline" className="w-full">
                          <Award className="w-4 h-4 mr-2" />
                          Certificate
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Link to={`/enduser/training/course/${course.id}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Continue
                        <TrendingUp className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <h3 className="text-lg font-semibold mb-2">No courses found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Try adjusting your search or filters
            </p>
            <Link to="/enduser/training/dashboard">
              <Button>Browse Available Courses</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
