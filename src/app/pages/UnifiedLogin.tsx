import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth, ProjectType } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ClipboardCheck, QrCode, Truck, Package, ArrowLeft, Building2, Eye, EyeOff, UserCircle, Shield } from 'lucide-react';
import { toast } from 'sonner';

const projectIcons = {
  'fm-checklist': { icon: ClipboardCheck, name: 'FM E-Checklist', color: 'bg-blue-600' },
  'ojt': { icon: QrCode, name: 'QR-Based OJT Training', color: 'bg-purple-600' },
  'fleet': { icon: Truck, name: 'Fleet Management', color: 'bg-green-600' },
  'asset': { icon: Package, name: 'Asset Management', color: 'bg-orange-600' },
};

export function UnifiedLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<'user' | 'admin'>('user');
  const [selectedProject, setSelectedProject] = useState<ProjectType>(null);
  const { login, setSelectedProject: setUserProject } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Get selected project from localStorage
    const project = localStorage.getItem('selected-project') as ProjectType;
    if (!project) {
      // If no project selected, redirect back to project selection
      navigate('/project-selection');
      return;
    }
    setSelectedProject(project);
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    setLoading(true);
    
    try {
      if (userType === 'admin') {
        // Login as Admin
        await login(email, password, 'Admin');
        
        // Set the selected project
        setUserProject(selectedProject);
        
        toast.success('Admin login successful');
        
        // Redirect to admin panel based on project
        const adminRoutes = {
          'fm-checklist': '/admin/checklist',
          'ojt': '/admin/training',
          'fleet': '/admin/fleet',
          'asset': '/admin/asset',
        };
        
        navigate(adminRoutes[selectedProject as keyof typeof adminRoutes]);
      } else {
        // Login as End User
        await login(email, password, 'End User');
        
        // Set the selected project
        setUserProject(selectedProject);
        
        toast.success('Login successful');
        
        // Redirect to end user dashboard based on project
        const userRoutes = {
          'fm-checklist': '/enduser/checklist/dashboard',
          'ojt': '/enduser/training/dashboard',
          'fleet': '/enduser/fleet/dashboard',
          'asset': '/enduser/asset/dashboard',
        };
        
        navigate(userRoutes[selectedProject as keyof typeof userRoutes]);
      }
      
      // Clear temporary storage
      localStorage.removeItem('selected-project');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToProjects = () => {
    localStorage.removeItem('selected-project');
    navigate('/project-selection');
  };

  if (!selectedProject) {
    return null;
  }

  const projectInfo = projectIcons[selectedProject];
  const ProjectIcon = projectInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={handleBackToProjects}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Building2 className="w-10 h-10 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">Catalyst</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">Facility Management</p>
          </div>
        </div>

        {/* Selected Project Card */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`${projectInfo.color} p-3 rounded-lg text-white`}>
                <ProjectIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Selected Project</p>
                <p className="font-semibold">{projectInfo.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Login Card with Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Choose your access level and enter credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={(v) => setUserType(v as 'user' | 'admin')} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user" className="flex items-center gap-2">
                  <UserCircle className="w-4 h-4" />
                  End User
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Admin
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user" className="mt-4">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-400">
                    <strong>End User Access:</strong> View assigned tasks, complete checklists, and submit reports.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="admin" className="mt-4">
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                  <p className="text-sm text-purple-800 dark:text-purple-400">
                    <strong>Admin Access:</strong> Full control with create, read, update, and delete permissions.
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={userType === 'admin' ? 'admin@company.com' : 'user@company.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className={`w-full ${userType === 'admin' ? 'bg-purple-600 hover:bg-purple-700' : projectInfo.color}`}
                disabled={loading}
              >
                {loading ? 'Signing in...' : `Sign In as ${userType === 'admin' ? 'Admin' : 'End User'}`}
              </Button>

              {/* Demo Credentials */}
              <div className="mt-4 p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Demo Credentials:
                </p>
                {userType === 'admin' ? (
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Email: admin@catalyst.com<br />
                    Password: admin123
                  </p>
                ) : (
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Email: user@catalyst.com<br />
                    Password: user123
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}