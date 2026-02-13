import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth, ProjectType } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { ClipboardCheck, QrCode, Truck, Package, ArrowLeft, Building2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const projectIcons = {
  'fm-checklist': { icon: ClipboardCheck, name: 'FM E-Checklist', color: 'bg-blue-600' },
  'ojt': { icon: QrCode, name: 'QR-Based OJT Training', color: 'bg-purple-600' },
  'fleet': { icon: Truck, name: 'Fleet Management', color: 'bg-green-600' },
  'asset': { icon: Package, name: 'Asset Management', color: 'bg-orange-600' },
};

export function EndUserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType>(null);
  const { login, setSelectedProject: setUserProject } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Get selected project from localStorage
    const project = localStorage.getItem('selected-project') as ProjectType;
    if (!project) {
      // If no project selected, redirect back to project selection
      navigate('/enduser/project-selection');
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
      // Login as End User
      await login(email, password, 'End User');
      
      // Set the selected project
      setUserProject(selectedProject);
      
      // Clear temporary storage
      localStorage.removeItem('selected-project');
      
      toast.success('Login successful');
      
      // Redirect to appropriate dashboard based on project
      const projectRoutes = {
        'fm-checklist': '/enduser/checklist/dashboard',
        'ojt': '/enduser/training/dashboard',
        'fleet': '/enduser/fleet/dashboard',
        'asset': '/enduser/asset/dashboard',
      };
      
      navigate(projectRoutes[selectedProject as keyof typeof projectRoutes]);
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToProjects = () => {
    localStorage.removeItem('selected-project');
    navigate('/enduser/project-selection');
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
            <h1 className="text-3xl font-bold">FacilityPro</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">End User Portal</p>
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

        {/* Login Card */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@company.com"
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
                className={`w-full ${projectInfo.color}`}
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

              {/* Demo Credentials */}
              <div className="mt-4 p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Demo Credentials:
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Email: user@example.com<br />
                  Password: any password
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
