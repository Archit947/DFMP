import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Separator } from '../../components/ui/separator';
import { Checkbox } from '../../components/ui/checkbox';
import {
  ArrowLeft,
  Play,
  FileText,
  CheckCircle,
  Clock,
  Award,
  Users,
  Video,
  BookOpen,
  Download,
} from 'lucide-react';
import { toast } from 'sonner';

const trainingModules = [
  {
    id: 1,
    title: 'Introduction to Safety Equipment',
    duration: '15 min',
    type: 'video',
    completed: true,
  },
  {
    id: 2,
    title: 'Equipment Operation Guidelines',
    duration: '20 min',
    type: 'document',
    completed: true,
  },
  {
    id: 3,
    title: 'Hands-on Practice Session',
    duration: '30 min',
    type: 'practical',
    completed: true,
  },
  {
    id: 4,
    title: 'Safety Protocols & Emergency Procedures',
    duration: '25 min',
    type: 'video',
    completed: false,
  },
  {
    id: 5,
    title: 'Final Assessment',
    duration: '20 min',
    type: 'assessment',
    completed: false,
  },
];

export function TrainingDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentModule, setCurrentModule] = useState(3);
  const completedModules = trainingModules.filter(m => m.completed).length;
  const progress = (completedModules / trainingModules.length) * 100;

  const handleStartModule = (moduleId: number) => {
    toast.success('Starting module...');
    setCurrentModule(moduleId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/ojt')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">Safety Equipment Operation</h1>
            <Badge>In Progress</Badge>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Training ID: #{id} • Safety Category • 2 hours total
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Overall Progress</p>
              <p className="text-2xl font-bold">
                {completedModules} of {trainingModules.length} modules completed
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">{Math.round(progress)}%</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Complete</p>
            </div>
          </div>
          <Progress value={progress} className="h-3" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="modules">
            <TabsList>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Training Modules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trainingModules.map((module, index) => (
                      <div
                        key={module.id}
                        className={`p-4 rounded-lg border transition-colors ${
                          module.completed
                            ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10'
                            : module.id === currentModule
                            ? 'border-blue-500 dark:border-blue-500'
                            : 'border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                module.completed
                                  ? 'bg-green-600 text-white'
                                  : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              {module.completed ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <span>{index + 1}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{module.title}</h3>
                                {module.type === 'video' && <Video className="w-4 h-4 text-slate-400" />}
                                {module.type === 'document' && <FileText className="w-4 h-4 text-slate-400" />}
                                {module.type === 'assessment' && <Award className="w-4 h-4 text-slate-400" />}
                              </div>
                              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {module.duration}
                                </span>
                                <span className="capitalize">{module.type}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            {module.completed ? (
                              <Button variant="ghost" size="sm">
                                Review
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => handleStartModule(module.id)}
                                disabled={index > 0 && !trainingModules[index - 1].completed}
                              >
                                <Play className="w-4 h-4 mr-1" />
                                Start
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Training Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      This comprehensive training program covers the proper operation and safety protocols
                      for all safety equipment used in facility operations. Participants will learn
                      equipment functions, emergency procedures, and best practices for maintaining a safe
                      working environment.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3">Learning Objectives</h3>
                    <div className="space-y-2">
                      {[
                        'Understand the purpose and function of each safety equipment',
                        'Demonstrate proper operation and handling techniques',
                        'Identify potential hazards and emergency procedures',
                        'Apply safety protocols in real-world scenarios',
                        'Pass the final safety certification assessment',
                      ].map((objective, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <p className="text-slate-600 dark:text-slate-400">{objective}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3">Prerequisites</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox checked disabled />
                        <span className="text-slate-600 dark:text-slate-400">
                          Basic safety orientation completed
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox checked disabled />
                        <span className="text-slate-600 dark:text-slate-400">
                          Supervisor approval obtained
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox checked disabled />
                        <span className="text-slate-600 dark:text-slate-400">PPE training completed</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Training Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Safety Equipment Manual', type: 'PDF', size: '2.4 MB' },
                      { name: 'Quick Reference Guide', type: 'PDF', size: '1.1 MB' },
                      { name: 'Emergency Procedures Checklist', type: 'PDF', size: '856 KB' },
                      { name: 'Video Tutorial - Equipment Setup', type: 'Video', size: '45 MB' },
                    ].map((resource, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-slate-400" />
                          <div>
                            <p className="font-medium">{resource.name}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {resource.type} • {resource.size}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Training Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Duration</p>
                <p className="text-lg font-semibold">2 hours</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Category</p>
                <Badge>Safety Training</Badge>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Certification</p>
                <p className="text-sm font-medium">Safety Equipment Level 2</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Valid Until</p>
                <p className="text-sm font-medium">1 year from completion</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-slate-400" />
                <span className="font-medium">12 enrolled</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'John Doe', progress: 100 },
                  { name: 'Jane Smith', progress: 100 },
                  { name: 'You', progress: 60 },
                  { name: 'Mike Johnson', progress: 40 },
                ].map((participant, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{participant.name}</span>
                      <span className="text-slate-600 dark:text-slate-400">{participant.progress}%</span>
                    </div>
                    <Progress value={participant.progress} className="h-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <span className="font-semibold text-blue-600">SM</span>
                </div>
                <div>
                  <p className="font-medium">Sarah Martinez</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Safety Manager</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
