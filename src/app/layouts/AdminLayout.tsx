import { Outlet, useNavigate, useLocation } from 'react-router';
import { useAuth, ProjectType } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  ClipboardCheck,
  QrCode,
  Truck,
  Package,
  Building2,
  LogOut,
  Shield,
  ChevronLeft,
} from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';

const projectIcons = {
  'fm-checklist': { icon: ClipboardCheck, name: 'FM E-Checklist', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/20' },
  'ojt': { icon: QrCode, name: 'QR Training', color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/20' },
  'fleet': { icon: Truck, name: 'Fleet Management', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' },
  'asset': { icon: Package, name: 'Asset Management', color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/20' },
};

export function AdminLayout() {
  const { user, selectedProject, setSelectedProject, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Detect project from URL if not set
  useEffect(() => {
    if (!selectedProject && location.pathname) {
      let detectedProject: ProjectType = null;

      if (location.pathname.includes('/admin/checklist')) {
        detectedProject = 'fm-checklist';
      } else if (location.pathname.includes('/admin/training')) {
        detectedProject = 'ojt';
      } else if (location.pathname.includes('/admin/fleet')) {
        detectedProject = 'fleet';
      } else if (location.pathname.includes('/admin/asset')) {
        detectedProject = 'asset';
      }

      if (detectedProject) {
        setSelectedProject(detectedProject);
      }
    }
  }, [selectedProject, location.pathname, setSelectedProject]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleBackToProjectSelection = () => {
    if (confirm('Are you sure you want to switch projects? Any unsaved changes will be lost.')) {
      logout();
      navigate('/project-selection');
    }
  };

  // Get current project from selectedProject or detect from URL
  const getCurrentProject = (): ProjectType => {
    if (selectedProject) return selectedProject;

    // Fallback: detect from URL
    if (location.pathname.includes('/admin/checklist')) return 'fm-checklist';
    if (location.pathname.includes('/admin/training')) return 'ojt';
    if (location.pathname.includes('/admin/fleet')) return 'fleet';
    if (location.pathname.includes('/admin/asset')) return 'asset';

    return null;
  };

  const currentProject = getCurrentProject();

  // If we still can't determine the project, show a loading state instead of blank
  if (!currentProject) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <p className="text-lg font-semibold">Loading Admin Panel...</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            If this persists, please return to <button onClick={() => navigate('/project-selection')} className="text-blue-600 underline">project selection</button>
          </p>
        </div>
      </div>
    );
  }

  const projectInfo = projectIcons[currentProject];
  const ProjectIcon = projectInfo.icon;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo + Project */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold">Catalyst</h1>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Admin Panel</p>
                </div>
              </div>

              <div className="h-10 w-px bg-slate-300 dark:bg-slate-700" />

              <div className="flex items-center gap-3">
                <div className={`${projectInfo.bg} p-2 rounded-lg`}>
                  <ProjectIcon className={`w-5 h-5 ${projectInfo.color}`} />
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Managing</p>
                  <p className="font-semibold">{projectInfo.name}</p>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </Badge>

              <Button
                variant="outline"
                size="sm"
                onClick={handleBackToProjectSelection}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Switch Project
              </Button>

              <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />

              <div className="text-right mr-2">
                <p className="text-sm font-medium">{user?.email}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{user?.role}</p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
