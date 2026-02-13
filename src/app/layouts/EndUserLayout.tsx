import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Building2,
  ClipboardCheck,
  QrCode,
  Truck,
  Package,
  Moon,
  Sun,
  LogOut,
  User,
  Menu,
  X,
  ArrowLeft,
} from 'lucide-react';

interface EndUserLayoutProps {
  children: ReactNode;
}

export function EndUserLayout({ children }: EndUserLayoutProps) {
  const { user, logout, setSelectedProject } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getProjectInfo = () => {
    if (location.pathname.includes('/checklist')) {
      return { name: 'FM E-Checklist', icon: ClipboardCheck, color: 'bg-blue-600' };
    } else if (location.pathname.includes('/training')) {
      return { name: 'QR-Based OJT', icon: QrCode, color: 'bg-purple-600' };
    } else if (location.pathname.includes('/fleet')) {
      return { name: 'Fleet Management', icon: Truck, color: 'bg-green-600' };
    } else if (location.pathname.includes('/asset')) {
      return { name: 'Asset Management', icon: Package, color: 'bg-orange-600' };
    }
    return { name: 'FacilityPro', icon: Building2, color: 'bg-blue-600' };
  };

  const projectInfo = getProjectInfo();
  const ProjectIcon = projectInfo.icon;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSwitchProject = () => {
    setSelectedProject(null);
    navigate('/enduser/project-selection');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex items-center gap-3">
              <div className={`${projectInfo.color} p-2 rounded-lg text-white`}>
                <ProjectIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">{projectInfo.name}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">End User Portal</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Back to Project Selection */}
            <Button variant="outline" size="sm" onClick={handleSwitchProject}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Switch Project
            </Button>

            {/* Theme toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{user?.role}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div>
                    <p>{user?.name}</p>
                    <p className="text-xs font-normal text-slate-600 dark:text-slate-400">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSwitchProject}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Switch Project
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="p-4 lg:p-6">
        {children}
      </main>
    </div>
  );
}