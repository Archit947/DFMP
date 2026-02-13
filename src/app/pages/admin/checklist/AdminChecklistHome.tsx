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
  FileText,
  CheckCircle,
  AlertCircle,
  Users,
  TrendingUp,
  Calendar,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Copy,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Textarea } from '../../../components/ui/textarea';

interface Checklist {
  id: string;
  title: string;
  category: string;
  items: number;
  assignedTo: number;
  submissions: number;
  compliance: number;
  status: 'Active' | 'Draft' | 'Archived';
  lastUpdated: string;
  description?: string;
}

const initialChecklists: Checklist[] = [
  {
    id: 'CL-001',
    title: 'Daily HVAC Inspection',
    category: 'HVAC',
    items: 12,
    assignedTo: 8,
    submissions: 156,
    compliance: 98,
    status: 'Active',
    lastUpdated: '2026-02-10',
    description: 'Daily inspection checklist for HVAC systems',
  },
  {
    id: 'CL-002',
    title: 'Electrical Safety Check',
    category: 'Electrical',
    items: 15,
    assignedTo: 5,
    submissions: 89,
    compliance: 95,
    status: 'Active',
    lastUpdated: '2026-02-09',
    description: 'Electrical safety inspection checklist',
  },
  {
    id: 'CL-003',
    title: 'Fire Safety Equipment',
    category: 'Safety',
    items: 10,
    assignedTo: 12,
    submissions: 203,
    compliance: 100,
    status: 'Active',
    lastUpdated: '2026-02-11',
    description: 'Fire safety equipment inspection checklist',
  },
  {
    id: 'CL-004',
    title: 'Plumbing Maintenance',
    category: 'Plumbing',
    items: 8,
    assignedTo: 3,
    submissions: 45,
    compliance: 92,
    status: 'Draft',
    lastUpdated: '2026-02-08',
    description: 'Plumbing maintenance checklist',
  },
];

export function AdminChecklistHome() {
  const [checklists, setChecklists] = useState<Checklist[]>(initialChecklists);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingChecklist, setEditingChecklist] = useState<Checklist | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    items: '',
    status: 'Draft' as 'Active' | 'Draft' | 'Archived',
    description: '',
  });

  const handleCreate = () => {
    if (!formData.title || !formData.category || !formData.items) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newChecklist: Checklist = {
      id: `CL-${String(checklists.length + 1).padStart(3, '0')}`,
      title: formData.title,
      category: formData.category,
      items: parseInt(formData.items),
      assignedTo: 0,
      submissions: 0,
      compliance: 0,
      status: formData.status,
      lastUpdated: new Date().toISOString().split('T')[0],
      description: formData.description,
    };

    setChecklists([...checklists, newChecklist]);
    setIsCreateDialogOpen(false);
    resetForm();
    toast.success('Checklist created successfully');
  };

  const handleEdit = () => {
    if (!editingChecklist) return;

    if (!formData.title || !formData.category || !formData.items) {
      toast.error('Please fill in all required fields');
      return;
    }

    const updatedChecklists = checklists.map(checklist =>
      checklist.id === editingChecklist.id
        ? {
          ...checklist,
          title: formData.title,
          category: formData.category,
          items: parseInt(formData.items),
          status: formData.status,
          description: formData.description,
          lastUpdated: new Date().toISOString().split('T')[0],
        }
        : checklist
    );

    setChecklists(updatedChecklists);
    setIsEditDialogOpen(false);
    setEditingChecklist(null);
    resetForm();
    toast.success('Checklist updated successfully');
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setChecklists(checklists.filter(checklist => checklist.id !== id));
      toast.success('Checklist deleted successfully');
    }
  };

  const handleDuplicate = (checklist: Checklist) => {
    const newChecklist: Checklist = {
      ...checklist,
      id: `CL-${String(checklists.length + 1).padStart(3, '0')}`,
      title: `${checklist.title} (Copy)`,
      assignedTo: 0,
      submissions: 0,
      compliance: 0,
      status: 'Draft',
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    setChecklists([...checklists, newChecklist]);
    toast.success('Checklist duplicated successfully');
  };

  const openEditDialog = (checklist: Checklist) => {
    setEditingChecklist(checklist);
    setFormData({
      title: checklist.title,
      category: checklist.category,
      items: String(checklist.items),
      status: checklist.status,
      description: checklist.description || '',
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      items: '',
      status: 'Draft',
      description: '',
    });
  };

  const filteredChecklists = checklists.filter((checklist) =>
    checklist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    checklist.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    checklist.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSubmissions = checklists.reduce((acc, c) => acc + c.submissions, 0);
  const avgCompliance = checklists.length > 0
    ? Math.round(checklists.reduce((acc, c) => acc + c.compliance, 0) / checklists.length)
    : 0;
  const totalAssigned = checklists.reduce((acc, c) => acc + c.assignedTo, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">FM E-Checklist Admin</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Create and manage facility inspection checklists
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Checklist
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Checklists</p>
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">{checklists.length}</p>
            <p className="text-xs text-green-600 mt-1">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Submissions</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">{totalSubmissions}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Assigned Users</p>
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold">{totalAssigned}</p>
            <p className="text-xs text-purple-600 mt-1">Active users</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Avg Compliance</p>
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold">{avgCompliance}%</p>
            <p className="text-xs text-orange-600 mt-1">Excellent</p>
          </CardContent>
        </Card>
      </div>

      {/* Checklists Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Checklists</CardTitle>
              <CardDescription>Manage inspection checklists and track compliance</CardDescription>
            </div>
            <div className="w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search checklists..."
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
            {filteredChecklists.map((checklist) => (
              <div
                key={checklist.id}
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{checklist.title}</h3>
                      <Badge variant="secondary">{checklist.category}</Badge>
                      <Badge
                        className={
                          checklist.status === 'Active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : checklist.status === 'Draft'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                        }
                      >
                        {checklist.status}
                      </Badge>
                      {checklist.compliance >= 95 && (
                        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
                          High Compliance
                        </Badge>
                      )}
                    </div>
                    {checklist.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{checklist.description}</p>
                    )}
                    <div className="grid grid-cols-6 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Checklist ID</p>
                        <p className="font-medium">{checklist.id}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Items</p>
                        <p className="font-medium">{checklist.items}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Assigned To</p>
                        <p className="font-medium">{checklist.assignedTo} users</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Submissions</p>
                        <p className="font-medium">{checklist.submissions}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Compliance</p>
                        <p className={`font-medium ${checklist.compliance >= 95 ? 'text-green-600' : checklist.compliance >= 85 ? 'text-orange-600' : 'text-red-600'}`}>
                          {checklist.compliance}%
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Last Updated</p>
                        <p className="font-medium">{new Date(checklist.lastUpdated).toLocaleDateString()}</p>
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
                      <DropdownMenuItem onClick={() => toast.success('Opening checklist details...')}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openEditDialog(checklist)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Checklist
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(checklist)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(checklist.id, checklist.title)}
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
        <Link to="/admin/checklist/builder">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Checklist Builder</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Create custom checklists
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/checklist/reports">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Reports</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    View compliance reports
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/checklist/analytics">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Analytics</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    View performance metrics
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
          setEditingChecklist(null);
          resetForm();
        }
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditDialogOpen ? 'Edit Checklist' : 'Create New Checklist'}</DialogTitle>
            <DialogDescription>
              {isEditDialogOpen ? 'Update checklist details below' : 'Fill in the checklist details below'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Checklist Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Daily HVAC Inspection"
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
                    <SelectItem value="HVAC">HVAC</SelectItem>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="Plumbing">Plumbing</SelectItem>
                    <SelectItem value="Safety">Safety</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="General">General</SelectItem>
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
            <div className="grid gap-2">
              <Label htmlFor="items">Number of Items *</Label>
              <Input
                id="items"
                type="number"
                min="1"
                value={formData.items}
                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                placeholder="e.g., 12"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the checklist..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsCreateDialogOpen(false);
              setIsEditDialogOpen(false);
              setEditingChecklist(null);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={isEditDialogOpen ? handleEdit : handleCreate} className="bg-blue-600 hover:bg-blue-700">
              {isEditDialogOpen ? 'Update Checklist' : 'Create Checklist'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
