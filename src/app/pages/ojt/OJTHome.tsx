import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  QrCode,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Video,
  FileText,
  Calendar,
} from 'lucide-react';

const stats = [
  { label: 'Active Trainings', value: '15', icon: BookOpen, color: 'text-purple-600' },
  { label: 'Trainees', value: '48', icon: Users, color: 'text-blue-600' },
  { label: 'Certifications', value: '32', icon: Award, color: 'text-green-600' },
  { label: 'Avg Completion', value: '87%', icon: TrendingUp, color: 'text-orange-600' },
];

const trainings = [
  {
    id: 1,
    title: 'Safety Equipment Operation',
    category: 'Safety',
    participants: 12,
    duration: '2 hours',
    completion: 75,
    status: 'In Progress',
    dueDate: '2026-02-15',
  },
  {
    id: 2,
    title: 'Emergency Response Procedures',
    category: 'Safety',
    participants: 8,
    duration: '1.5 hours',
    completion: 100,
    status: 'Completed',
    dueDate: '2026-02-10',
  },
  {
    id: 3,
    title: 'HVAC Maintenance Training',
    category: 'Technical',
    participants: 6,
    duration: '3 hours',
    completion: 45,
    status: 'In Progress',
    dueDate: '2026-02-18',
  },
];

const certifications = [
  { name: 'John Doe', certification: 'Safety Level 2', expiryDate: '2026-06-15', status: 'Active' },
  { name: 'Jane Smith', certification: 'Technical Specialist', expiryDate: '2026-03-20', status: 'Expiring Soon' },
  { name: 'Mike Johnson', certification: 'First Aid', expiryDate: '2026-01-30', status: 'Expired' },
];

export function OJTHome() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">QR-Based OJT App</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Training management and skill development
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/ojt/scanner">
            <Button>
              <QrCode className="w-4 h-4 mr-2" />
              Scan QR Code
            </Button>
          </Link>
          <Link to="/ojt/analytics">
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Trainings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Training Programs</CardTitle>
            <CardDescription>Manage ongoing training sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-4">
                {trainings.map((training) => (
                  <Link key={training.id} to={`/ojt/training/${training.id}`}>
                    <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{training.title}</h3>
                            <Badge variant={training.status === 'Completed' ? 'default' : 'secondary'}>
                              {training.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {training.category} • {training.duration} • {training.participants} participants
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Due: {new Date(training.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Completion</span>
                          <span className="font-medium">{training.completion}%</span>
                        </div>
                        <Progress value={training.completion} />
                      </div>
                    </div>
                  </Link>
                ))}
              </TabsContent>

              <TabsContent value="in-progress" className="mt-4">
                <p className="text-center text-slate-600 dark:text-slate-400 py-8">
                  Filter: In Progress trainings
                </p>
              </TabsContent>

              <TabsContent value="completed" className="mt-4">
                <p className="text-center text-slate-600 dark:text-slate-400 py-8">
                  Filter: Completed trainings
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Access */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/ojt/scanner">
                <Button variant="outline" className="w-full justify-start">
                  <QrCode className="w-4 h-4 mr-2" />
                  Scan QR Code
                </Button>
              </Link>
              <Link to="/ojt/training/new">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Create Training
                </Button>
              </Link>
              <Link to="/ojt/certifications">
                <Button variant="outline" className="w-full justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  View Certifications
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Training Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                <Video className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Video Modules</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">24 available</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">SOP Documents</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">18 documents</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                <Award className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Assessments</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">12 active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle>Certification Status</CardTitle>
          <CardDescription>Track employee certifications and renewals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{cert.certification}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      cert.status === 'Active'
                        ? 'default'
                        : cert.status === 'Expiring Soon'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {cert.status}
                  </Badge>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
