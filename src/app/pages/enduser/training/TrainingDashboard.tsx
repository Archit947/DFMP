import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';
import {
  QrCode,
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  PlayCircle,
  CheckCircle,
  Star,
  ChevronRight,
  Calendar,
} from 'lucide-react';

const assignedTrainings = [
  {
    id: 'TR-001',
    title: 'Fire Safety Protocol',
    category: 'Safety',
    instructor: 'John Smith',
    duration: '45 min',
    progress: 0,
    status: 'Not Started',
    dueDate: '2026-02-15',
    priority: 'High',
    qrCode: true,
  },
  {
    id: 'TR-002',
    title: 'Equipment Operation - HVAC',
    category: 'Technical',
    instructor: 'Sarah Johnson',
    duration: '60 min',
    progress: 65,
    status: 'In Progress',
    dueDate: '2026-02-18',
    priority: 'Medium',
    qrCode: true,
  },
  {
    id: 'TR-003',
    title: 'Emergency Response Procedures',
    category: 'Safety',
    instructor: 'Mike Davis',
    duration: '30 min',
    progress: 0,
    status: 'Not Started',
    dueDate: '2026-02-20',
    priority: 'High',
    qrCode: false,
  },
  {
    id: 'TR-004',
    title: 'Quality Control Standards',
    category: 'Compliance',
    instructor: 'Lisa Chen',
    duration: '40 min',
    progress: 30,
    status: 'In Progress',
    dueDate: '2026-02-22',
    priority: 'Medium',
    qrCode: false,
  },
];

const completedTrainings = [
  {
    id: 'TR-099',
    title: 'Basic Safety Training',
    category: 'Safety',
    completedDate: '2026-02-10',
    score: 95,
    certificateId: 'CERT-2026-099',
    duration: '30 min',
  },
  {
    id: 'TR-098',
    title: 'Electrical Safety',
    category: 'Safety',
    completedDate: '2026-02-08',
    score: 92,
    certificateId: 'CERT-2026-098',
    duration: '45 min',
  },
  {
    id: 'TR-097',
    title: 'Facility Maintenance Basics',
    category: 'Technical',
    completedDate: '2026-02-05',
    score: 88,
    certificateId: 'CERT-2026-097',
    duration: '50 min',
  },
];

export function TrainingDashboard() {
  const stats = {
    inProgress: assignedTrainings.filter((t) => t.status === 'In Progress').length,
    notStarted: assignedTrainings.filter((t) => t.status === 'Not Started').length,
    completed: completedTrainings.length,
    avgScore: Math.round(
      completedTrainings.reduce((acc, t) => acc + t.score, 0) / completedTrainings.length
    ),
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Safety':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Technical':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Compliance':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Training</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Complete courses and earn certifications
          </p>
        </div>
        <Link to="/enduser/training/scanner">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <QrCode className="w-4 h-4 mr-2" />
            Scan QR Code
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">In Progress</p>
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">{stats.inProgress}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Active courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Not Started</p>
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold">{stats.notStarted}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Pending courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Completed</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">{stats.completed}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Courses finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Average Score</p>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold">{stats.avgScore}%</p>
            <p className="text-xs text-green-600 mt-1">Excellent performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/enduser/training/scanner">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Scan QR Code</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Start a new training
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/enduser/training/history">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Training History</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    View completed courses
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/enduser/training/certificates">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">My Certificates</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Download certificates
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Assigned Trainings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Assigned Training Courses</CardTitle>
              <CardDescription>Complete these courses before the due date</CardDescription>
            </div>
            <Badge variant="secondary">{assignedTrainings.length} courses</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assignedTrainings.map((training) => (
              <Link
                key={training.id}
                to={`/enduser/training/course/${training.id}`}
                className="block"
              >
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{training.title}</h3>
                        <Badge className={getCategoryColor(training.category)}>
                          {training.category}
                        </Badge>
                        <Badge className={getPriorityColor(training.priority)}>
                          {training.priority}
                        </Badge>
                        {training.qrCode && (
                          <Badge variant="outline" className="text-purple-600">
                            <QrCode className="w-3 h-3 mr-1" />
                            QR
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-4">
                        <span>Instructor: {training.instructor}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {training.duration}
                        </span>
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>

                  {training.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-600 dark:text-slate-400">Progress</span>
                        <span className="font-medium">{training.progress}%</span>
                      </div>
                      <Progress value={training.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                      <Calendar className="w-3 h-3" />
                      Due: {new Date(training.dueDate).toLocaleDateString()}
                    </div>
                    {training.status === 'Not Started' ? (
                      <Button size="sm" variant="outline" className="text-purple-600">
                        <PlayCircle className="w-3 h-3 mr-1" />
                        Start Course
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="text-blue-600">
                        Continue Learning
                      </Button>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completed Trainings & Certificates */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Completed Trainings</CardTitle>
              <CardDescription>Your earned certificates and achievements</CardDescription>
            </div>
            <Link to="/end-user/training/certificates">
              <Button variant="outline" size="sm">
                View All Certificates
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completedTrainings.map((training) => (
              <Link
                key={training.id}
                to={`/end-user/training/certificate/${training.certificateId}`}
                className="block"
              >
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-green-500 dark:hover:border-green-500 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="w-4 h-4 text-green-600" />
                        <h3 className="font-semibold">{training.title}</h3>
                        <Badge className={getCategoryColor(training.category)}>
                          {training.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        Certificate ID: {training.certificateId}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                          <Calendar className="w-3 h-3" />
                          Completed: {new Date(training.completedDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1 font-medium text-green-600">
                          <Star className="w-3 h-3 fill-green-600" />
                          Score: {training.score}%
                        </span>
                        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                          <Clock className="w-3 h-3" />
                          {training.duration}
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