import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';
import {
  ArrowLeft,
  PlayCircle,
  CheckCircle,
  Clock,
  User,
  Award,
  ChevronRight,
  Lock,
} from 'lucide-react';
import { toast } from 'sonner';

const courseData = {
  id: 'TR-002',
  title: 'Equipment Operation - HVAC',
  category: 'Technical',
  instructor: 'Sarah Johnson',
  duration: '60 min',
  progress: 65,
  status: 'In Progress',
  dueDate: '2026-02-18',
  description: 'Comprehensive training on HVAC equipment operation, maintenance procedures, and safety protocols.',
  modules: [
    {
      id: 1,
      title: 'Introduction to HVAC Systems',
      duration: '10 min',
      completed: true,
      locked: false,
    },
    {
      id: 2,
      title: 'Safety Protocols',
      duration: '15 min',
      completed: true,
      locked: false,
    },
    {
      id: 3,
      title: 'Operation Procedures',
      duration: '20 min',
      completed: true,
      locked: false,
    },
    {
      id: 4,
      title: 'Troubleshooting Common Issues',
      duration: '15 min',
      completed: false,
      locked: false,
      current: true,
    },
    {
      id: 5,
      title: 'Final Assessment',
      duration: '10 min',
      completed: false,
      locked: true,
    },
  ],
};

export function TrainingCoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [startingModule, setStartingModule] = useState(false);

  const handleStartModule = (moduleId: number, isLocked: boolean) => {
    if (isLocked) {
      toast.error('Complete previous modules to unlock this content');
      return;
    }

    setStartingModule(true);
    toast.success('Loading module...');
    
    // Simulate loading
    setTimeout(() => {
      setStartingModule(false);
      toast.success('Module started!');
    }, 1500);
  };

  const handleCompleteTraining = () => {
    toast.success('Training completed! Certificate generated.');
    setTimeout(() => {
      navigate('/enduser/training/dashboard');
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/enduser/training/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold tracking-tight">{courseData.title}</h1>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
              {courseData.category}
            </Badge>
          </div>
          <p className="text-slate-600 dark:text-slate-400">{courseData.description}</p>
        </div>
      </div>

      {/* Course Info */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Instructor</p>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <p className="font-medium">{courseData.instructor}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Duration</p>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <p className="font-medium">{courseData.duration}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Due Date</p>
              <p className="font-medium">{new Date(courseData.dueDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Status</p>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                {courseData.status}
              </Badge>
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Your Progress</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{courseData.progress}%</p>
            </div>
            <Progress value={courseData.progress} className="h-3" />
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              {courseData.modules.filter((m) => m.completed).length} of {courseData.modules.length} modules completed
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Modules */}
      <Card>
        <CardHeader>
          <CardTitle>Course Modules</CardTitle>
          <CardDescription>Complete all modules to earn your certificate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {courseData.modules.map((module) => (
              <div
                key={module.id}
                className={`p-4 rounded-lg border ${
                  module.locked
                    ? 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50'
                    : module.current
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-purple-500 hover:shadow-md transition-all cursor-pointer'
                }`}
                onClick={() => !module.completed && handleStartModule(module.id, module.locked)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        module.completed
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/20'
                          : module.locked
                          ? 'bg-slate-200 text-slate-400 dark:bg-slate-800'
                          : 'bg-purple-100 text-purple-600 dark:bg-purple-900/20'
                      }`}
                    >
                      {module.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : module.locked ? (
                        <Lock className="w-6 h-6" />
                      ) : (
                        <PlayCircle className="w-6 h-6" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{module.title}</h3>
                        {module.current && (
                          <Badge variant="secondary" className="text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {module.duration}
                        </span>
                        {module.completed && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs">
                            Completed
                          </Badge>
                        )}
                        {module.locked && (
                          <span className="text-slate-500">Complete previous modules first</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {!module.locked && !module.completed && (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {courseData.progress === 100 && (
            <div className="mt-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-800 dark:text-green-400 mb-1">
                    🎉 Congratulations! You've completed the course!
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Click below to generate your certificate
                  </p>
                </div>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleCompleteTraining}
                >
                  <Award className="w-4 h-4 mr-2" />
                  Get Certificate
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
