import { useNavigate } from 'react-router';
import { useAuth, ProjectType } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ClipboardCheck, QrCode, Truck, Package, ArrowRight, Building2 } from 'lucide-react';

const projects = [
  {
    id: 'fm-checklist' as ProjectType,
    name: 'FM E-Checklist',
    description: 'Complete facility inspection checklists and view your submission history',
    icon: ClipboardCheck,
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-blue-600',
    features: ['Complete Checklists', 'Track Compliance', 'View History', 'Mobile Forms'],
  },
  {
    id: 'ojt' as ProjectType,
    name: 'QR-Based OJT Training',
    description: 'Access training modules, track your progress, and earn certifications',
    icon: QrCode,
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-purple-600',
    features: ['Scan QR Codes', 'Take Courses', 'View Certificates', 'Track Progress'],
  },
  {
    id: 'fleet' as ProjectType,
    name: 'Fleet Management',
    description: 'Perform vehicle inspections, log fuel, and report maintenance issues',
    icon: Truck,
    color: 'bg-green-500',
    gradient: 'from-green-500 to-green-600',
    features: ['Vehicle Inspections', 'Fuel Logs', 'Report Issues', 'View History'],
  },
  {
    id: 'asset' as ProjectType,
    name: 'Asset Management',
    description: 'Log equipment usage, submit work orders, and track asset status',
    icon: Package,
    color: 'bg-orange-500',
    gradient: 'from-orange-500 to-orange-600',
    features: ['Log Usage', 'Submit Work Orders', 'Report Issues', 'View Status'],
  },
];

export function ProjectSelection() {
  const navigate = useNavigate();

  const handleProjectSelect = (projectId: ProjectType) => {
    // Store selected project in localStorage temporarily
    localStorage.setItem('selected-project', projectId as string);
    // Redirect to unified login
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold">FacilityPro</h1>
          </div>
          <h2 className="text-2xl font-semibold mb-2">
            End User Portal
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Select a project to get started
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <Card
                key={project.id}
                className="hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden"
                onClick={() => handleProjectSelect(project.id)}
              >
                <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`${project.color} p-4 rounded-xl text-white group-hover:scale-110 transition-transform shadow-lg`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.name}
                        </CardTitle>
                        <CardDescription className="text-base mt-1">
                          {project.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {project.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button className={`w-full ${project.color} group-hover:shadow-lg transition-shadow`}>
                    Access {project.name.split(' ')[0]}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Footer */}
        <div className="text-center">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            You can switch between projects anytime from your dashboard
          </p>
        </div>
      </div>
    </div>
  );
}