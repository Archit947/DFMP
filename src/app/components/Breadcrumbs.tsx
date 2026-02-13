import { Link, useLocation } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap: Record<string, string> = {
    dashboard: 'Dashboard',
    'fm-checklist': 'FM E-Checklist',
    ojt: 'QR-Based OJT',
    fleet: 'Fleet Management',
    asset: 'Asset Management',
    settings: 'Settings',
    builder: 'Checklist Builder',
    inspection: 'Inspection',
    reports: 'Reports',
    scanner: 'QR Scanner',
    training: 'Training',
    analytics: 'Analytics',
    vehicle: 'Vehicle',
    item: 'Asset',
    register: 'Register Asset',
    'work-orders': 'Work Orders',
  };

  if (pathnames.length === 0 || pathnames[0] === '') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      <Link
        to="/dashboard"
        className="flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = breadcrumbNameMap[name] || name;

        // Skip IDs in breadcrumbs
        if (name.match(/^[A-Z]{2,3}-\d+$/) || !isNaN(Number(name))) {
          return null;
        }

        return (
          <div key={name} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />
            {isLast ? (
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {displayName}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                {displayName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
