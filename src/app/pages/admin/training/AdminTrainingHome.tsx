import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  Plus,
  Search,
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  Edit,
  Trash2,
  Copy,
  QrCode as QrCodeIcon,
  MoreVertical,
  FileText,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Textarea } from '../../../components/ui/textarea';

interface Course {
  id: string;
  title: string;
  category: string;
  modules: number;
  enrolled: number;
  completed: number;
  completionRate: number;
  duration: string;
  status: 'Active' | 'Draft' | 'Archived';
  lastUpdated: string;
  description?: string;
}

const initialCourses: Course[] = [
  {
    id: 'TRN-001',
    title: 'HVAC System Maintenance',
    category: 'Technical',
    modules: 8,
    enrolled: 45,
    completed: 38,
    completionRate: 84,
    duration: '4 hours',
    status: 'Active',
    lastUpdated: '2026-02-10',
    description: 'Comprehensive training on HVAC system maintenance and troubleshooting',
  },
  {
    id: 'TRN-002',
    title: 'Fire Safety Procedures',
    category: 'Safety',
    modules: 5,
    enrolled: 62,
    completed: 55,
    completionRate: 89,
    duration: '2.5 hours',
    status: 'Active',
    lastUpdated: '2026-02-08',
    description: 'Essential fire safety protocols and emergency response procedures',
  },
  {
    id: 'TRN-003',
    title: 'Electrical Systems Basics',
    category: 'Technical',
    modules: 10,
    enrolled: 28,
    completed: 20,
    completionRate: 71,
    duration: '5 hours',
    status: 'Active',
    lastUpdated: '2026-02-11',
    description: 'Introduction to electrical systems and basic troubleshooting',
  },
  {
    id: 'TRN-004',
    title: 'Workplace Safety Standards',
    category: 'Safety',
    modules: 6,
    enrolled: 9,
    completed: 6,
    completionRate: 67,
    duration: '3 hours',
    status: 'Draft',
    lastUpdated: '2026-02-09',
    description: 'OSHA workplace safety standards and compliance requirements',
  },
  {
    id: 'TRN-005',
    title: 'Building Access Control',
    category: 'Security',
    modules: 4,
    enrolled: 28,
    completed: 22,
    completionRate: 79,
    duration: '2 hours',
    status: 'Active',
    lastUpdated: '2026-02-12',
    description: 'Access control systems and security protocols',
  },
];

export default function AdminTrainingHome() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    modules: '',
    duration: '',
    status: 'Draft' as 'Active' | 'Draft' | 'Archived',
    description: '',
  });

  const handleCreate = () => {
    if (!formData.title || !formData.category || !formData.modules || !formData.duration) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newCourse: Course = {
      id: `TRN-${String(courses.length + 1).padStart(3, '0')}`,
      title: formData.title,
      category: formData.category,
      modules: parseInt(formData.modules),
      enrolled: 0,
      completed: 0,
      completionRate: 0,
      duration: formData.duration,
      status: formData.status,
      lastUpdated: new Date().toISOString().split('T')[0],
      description: formData.description,
    };

    setCourses([...courses, newCourse]);
    setIsCreateDialogOpen(false);
    resetForm();
    toast.success('Course created successfully');
  };

  const handleEdit = () => {
    if (!editingCourse) return;

    if (!formData.title || !formData.category || !formData.modules || !formData.duration) {
      toast.error('Please fill in all required fields');
      return;
    }

    const updatedCourses = courses.map(course =>
      course.id === editingCourse.id
        ? {
          ...course,
          title: formData.title,
          category: formData.category,
          modules: parseInt(formData.modules),
          duration: formData.duration,
          status: formData.status,
          description: formData.description,
          lastUpdated: new Date().toISOString().split('T')[0],
        }
        : course
    );

    setCourses(updatedCourses);
    setIsEditDialogOpen(false);
    setEditingCourse(null);
    resetForm();
    toast.success('Course updated successfully');
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setCourses(courses.filter(course => course.id !== id));
      toast.success('Course deleted successfully');
    }
  };

  const handleDuplicate = (course: Course) => {
    const newCourse: Course = {
      ...course,
      id: `TRN-${String(courses.length + 1).padStart(3, '0')}`,
      title: `${course.title} (Copy)`,
      enrolled: 0,
      completed: 0,
      completionRate: 0,
      status: 'Draft',
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    setCourses([...courses, newCourse]);
    toast.success('Course duplicated successfully');
  };

  const openEditDialog = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      category: course.category,
      modules: String(course.modules),
      duration: course.duration,
      status: course.status,
      description: course.description || '',
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      modules: '',
      duration: '',
      status: 'Draft',
      description: '',
    });
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalEnrolled = courses.reduce((acc, c) => acc + c.enrolled, 0);
  const totalCompleted = courses.reduce((acc, c) => acc + c.completed, 0);
  const avgCompletion = courses.length > 0
    ? Math.round(courses.reduce((acc, c) => acc + c.completionRate, 0) / courses.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">OJT Training Admin</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage QR-based training courses, analytics, and employee progress
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Courses</p>
              <GraduationCap className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold">{courses.length}</p>
            <p className="text-xs text-green-600 mt-1">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Enrolled Employees</p>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">{totalEnrolled}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Across all courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Certificates Issued</p>
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">{totalCompleted}</p>
            <p className="text-xs text-green-600 mt-1">+15 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Avg Completion</p>
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold">{avgCompletion}%</p>
            <p className="text-xs text-orange-600 mt-1">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Training Courses</CardTitle>
              <CardDescription>Manage your training curriculum and track progress</CardDescription>
            </div>
            <div className="w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      <Badge variant="secondary">{course.category}</Badge>
                      <Badge
                        className={
                          course.status === 'Active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : course.status === 'Draft'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                        }
                      >
                        {course.status}
                      </Badge>
                    </div>
                    {course.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{course.description}</p>
                    )}
                    <div className="grid grid-cols-6 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Course ID</p>
                        <p className="font-medium">{course.id}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Modules</p>
                        <p className="font-medium">{course.modules}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Enrolled</p>
                        <p className="font-medium">{course.enrolled}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Completed</p>
                        <p className="font-medium">{course.completed}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Completion Rate</p>
                        <p className="font-medium">{course.completionRate}%</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Duration</p>
                        <p className="font-medium">{course.duration}</p>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(course)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Course
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(course)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.success('QR codes generated!')}>
                        <QrCodeIcon className="w-4 h-4 mr-2" />
                        Generate QR Codes
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(course.id, course.title)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/admin/training/qr-codes">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <QrCodeIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Manage QR Codes</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Generate and manage QR codes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/training/analytics">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Analytics</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    View training analytics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/training/employees">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Manage Employees</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Track employee progress
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsCreateDialogOpen(false);
          setIsEditDialogOpen(false);
          setEditingCourse(null);
          resetForm();
        }
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditDialogOpen ? 'Edit Course' : 'Create New Course'}</DialogTitle>
            <DialogDescription>
              {isEditDialogOpen ? 'Update course details below' : 'Fill in the course details below'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Course Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., HVAC System Maintenance"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Safety">Safety</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status *</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="modules">Number of Modules *</Label>
                <Input
                  id="modules"
                  type="number"
                  min="1"
                  value={formData.modules}
                  onChange={(e) => setFormData({ ...formData, modules: e.target.value })}
                  placeholder="e.g., 8"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 4 hours"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the course..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsCreateDialogOpen(false);
              setIsEditDialogOpen(false);
              setEditingCourse(null);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={isEditDialogOpen ? handleEdit : handleCreate} className="bg-purple-600 hover:bg-purple-700">
              {isEditDialogOpen ? 'Update Course' : 'Create Course'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
