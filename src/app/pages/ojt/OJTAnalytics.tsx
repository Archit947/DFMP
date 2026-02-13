import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Progress } from '../../components/ui/progress';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  Clock,
  Target,
  Download,
  Star,
  BookOpen,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const completionTrendData = [
  { month: 'Aug', completed: 45, certified: 38, inProgress: 12 },
  { month: 'Sep', completed: 52, certified: 44, inProgress: 15 },
  { month: 'Oct', completed: 48, certified: 40, inProgress: 18 },
  { month: 'Nov', completed: 61, certified: 53, inProgress: 14 },
  { month: 'Dec', completed: 58, certified: 49, inProgress: 16 },
  { month: 'Jan', completed: 67, certified: 58, inProgress: 19 },
  { month: 'Feb', completed: 72, certified: 63, inProgress: 21 },
];

const skillDistributionData = [
  { skill: 'Safety Protocols', value: 92 },
  { skill: 'Equipment Operation', value: 85 },
  { skill: 'Maintenance Procedures', value: 88 },
  { skill: 'Quality Control', value: 79 },
  { skill: 'Emergency Response', value: 94 },
  { skill: 'Documentation', value: 81 },
];

const trainingCategoryData = [
  { name: 'Safety', value: 35, color: '#ef4444' },
  { name: 'Technical', value: 28, color: '#3b82f6' },
  { name: 'Compliance', value: 22, color: '#f59e0b' },
  { name: 'Soft Skills', value: 15, color: '#10b981' },
];

const topPerformers = [
  { name: 'John Doe', completions: 15, avgScore: 96, certifications: 8, role: 'Technician' },
  { name: 'Sarah Williams', completions: 14, avgScore: 94, certifications: 7, role: 'Inspector' },
  { name: 'Mike Johnson', completions: 13, avgScore: 92, certifications: 6, role: 'Technician' },
  { name: 'Lisa Chen', completions: 12, avgScore: 91, certifications: 6, role: 'Manager' },
  { name: 'David Brown', completions: 11, avgScore: 89, certifications: 5, role: 'Technician' },
];

const trainingEffectiveness = [
  { category: 'Pre-Training', score: 65 },
  { category: 'Post-Training', score: 88 },
  { category: '30-Day Follow-up', score: 85 },
  { category: '90-Day Follow-up', score: 82 },
];

export function OJTAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/ojt">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Training Analytics</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Performance metrics and skill development insights
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="7days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Trainees</p>
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold">248</p>
            <div className="flex items-center gap-1 text-sm mt-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600">+12%</span>
              <span className="text-slate-600 dark:text-slate-400">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Avg. Completion Rate</p>
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">87%</p>
            <div className="flex items-center gap-1 text-sm mt-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600">+5%</span>
              <span className="text-slate-600 dark:text-slate-400">improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Certifications Issued</p>
              <Award className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold">145</p>
            <div className="flex items-center gap-1 text-sm mt-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600">+23</span>
              <span className="text-slate-600 dark:text-slate-400">this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Avg. Training Hours</p>
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold">24.5h</p>
            <div className="flex items-center gap-1 text-sm mt-1">
              <TrendingDown className="w-4 h-4 text-green-600" />
              <span className="text-green-600">-2h</span>
              <span className="text-slate-600 dark:text-slate-400">more efficient</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skill Development</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="effectiveness">Effectiveness</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Training Completion Trend</CardTitle>
              <CardDescription>Monthly training completions and certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={completionTrendData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fill: 'currentColor' }} />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: 'currentColor' }}
                      label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="completed"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Completed"
                      dot={{ fill: '#3b82f6' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="certified"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Certified"
                      dot={{ fill: '#10b981' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="inProgress"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name="In Progress"
                      dot={{ fill: '#f59e0b' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Categories Distribution</CardTitle>
                <CardDescription>Breakdown by training type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trainingCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {trainingCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--background)',
                          border: '1px solid var(--border)',
                          borderRadius: '6px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Training Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Overall Completion Rate</p>
                  <div className="flex items-center gap-4">
                    <Progress value={87} className="flex-1" />
                    <span className="text-2xl font-bold">87%</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Active Trainings</span>
                    <span className="font-medium">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Pending Certifications</span>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Avg. Score</span>
                    <span className="font-medium">89%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Pass Rate</span>
                    <span className="font-medium">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Competency Analysis</CardTitle>
              <CardDescription>Average skill scores across all trainees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillDistributionData}>
                    <PolarGrid stroke="currentColor" className="stroke-slate-200 dark:stroke-slate-800" />
                    <PolarAngleAxis
                      dataKey="skill"
                      tick={{ fill: 'currentColor', fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fill: 'currentColor' }}
                    />
                    <Radar
                      name="Skill Score"
                      dataKey="value"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.5}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skill Development Progress</CardTitle>
              <CardDescription>Individual skill progression over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillDistributionData.map((skill) => (
                  <div key={skill.skill}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        <span className="font-medium">{skill.skill}</span>
                      </div>
                      <span className="text-sm font-bold">{skill.value}%</span>
                    </div>
                    <Progress value={skill.value} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Trainees with highest completion rates and scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div
                    key={performer.name}
                    className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{performer.name}</p>
                        <Badge variant="outline">{performer.role}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Completions</p>
                          <p className="font-medium">{performer.completions}</p>
                        </div>
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Avg. Score</p>
                          <p className="font-medium flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            {performer.avgScore}%
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Certifications</p>
                          <p className="font-medium flex items-center gap-1">
                            <Award className="w-3 h-3 text-orange-600" />
                            {performer.certifications}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-5xl font-bold text-blue-600">87%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Overall average</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Safety Training</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Technical Training</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Compliance Training</span>
                      <span className="font-medium">84%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pass Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-5xl font-bold text-green-600">94%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">First attempt pass rate</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Passed</span>
                      <span className="font-medium text-green-600">233</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Failed</span>
                      <span className="font-medium text-red-600">15</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Retake Success</span>
                      <span className="font-medium">93%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-5xl font-bold text-purple-600">89%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Active participation</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Active Users</span>
                      <span className="font-medium">221/248</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Avg. Session Time</span>
                      <span className="font-medium">42 min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Completion Time</span>
                      <span className="font-medium">24.5 hrs</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Effectiveness Tab */}
        <TabsContent value="effectiveness" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Training Effectiveness Over Time</CardTitle>
              <CardDescription>Knowledge retention and skill application metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trainingEffectiveness}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                    <XAxis dataKey="category" className="text-xs" tick={{ fill: 'currentColor' }} />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: 'currentColor' }}
                      label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                      }}
                    />
                    <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">30-Day Retention Rate</p>
                  <div className="flex items-center gap-4">
                    <Progress value={85} className="flex-1" />
                    <span className="text-2xl font-bold">85%</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">Above industry average (78%)</p>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Immediate Post-Training</span>
                      <span className="font-medium">88%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">30 Days Later</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">90 Days Later</span>
                      <span className="font-medium">82%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Training Investment ROI</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">3.2x</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Return on training investment
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Cost Savings</span>
                    <span className="font-medium">$124,500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Productivity Gain</span>
                    <span className="font-medium">+18%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Error Reduction</span>
                    <span className="font-medium">-24%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Incident Reduction</span>
                    <span className="font-medium">-31%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Impact Summary</CardTitle>
              <CardDescription>Key improvements after training implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Safety Incidents</p>
                  <p className="text-2xl font-bold text-green-600">-31%</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Year over year</p>
                </div>
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Task Completion</p>
                  <p className="text-2xl font-bold text-blue-600">+18%</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Faster completion</p>
                </div>
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Quality Score</p>
                  <p className="text-2xl font-bold text-purple-600">+22%</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Improvement</p>
                </div>
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Employee Confidence</p>
                  <p className="text-2xl font-bold text-orange-600">+34%</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Self-reported</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
