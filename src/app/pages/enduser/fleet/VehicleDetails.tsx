import { useParams, useNavigate, Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';
import {
  ArrowLeft,
  Truck,
  Calendar,
  Gauge,
  Fuel,
  Wrench,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';

const vehicleData = {
  'VH-001': {
    id: 'VH-001',
    model: 'Ford Transit Van',
    plate: 'ABC-1234',
    year: 2022,
    vin: '1FTBW2CM6HKA12345',
    status: 'Active',
    condition: 'Good',
    odometer: 45230,
    fuelLevel: 75,
    lastInspection: '2026-02-13',
    nextService: '2026-03-15',
    inspections: 24,
    issues: 0,
    maintenanceHistory: [
      { date: '2026-02-01', type: 'Oil Change', cost: 85, status: 'Completed' },
      { date: '2026-01-15', type: 'Tire Rotation', cost: 45, status: 'Completed' },
      { date: '2025-12-20', type: 'Brake Inspection', cost: 120, status: 'Completed' },
    ],
  },
  'VH-002': {
    id: 'VH-002',
    model: 'Toyota Hilux',
    plate: 'XYZ-5678',
    year: 2021,
    vin: 'JTMRFREV7MD123456',
    status: 'Maintenance',
    condition: 'Needs Attention',
    odometer: 89450,
    fuelLevel: 45,
    lastInspection: '2026-02-12',
    nextService: '2026-02-20',
    inspections: 38,
    issues: 3,
    maintenanceHistory: [
      { date: '2026-02-12', type: 'Brake Fluid Top-up', cost: 25, status: 'Pending' },
      { date: '2026-02-01', type: 'Oil Change', cost: 95, status: 'Completed' },
      { date: '2026-01-10', type: 'Battery Replacement', cost: 180, status: 'Completed' },
    ],
  },
};

export function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = vehicleData[id as keyof typeof vehicleData];

  if (!vehicle) {
    return <div>Vehicle not found</div>;
  }

  const daysUntilService = Math.floor(
    (new Date(vehicle.nextService).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/enduser/fleet/dashboard')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <Link to={`/enduser/fleet/inspect/${vehicle.id}`}>
          <Button className="bg-green-600 hover:bg-green-700">
            <FileText className="w-4 h-4 mr-2" />
            Start Inspection
          </Button>
        </Link>
      </div>

      {/* Vehicle Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{vehicle.model}</h1>
                <p className="text-slate-600 dark:text-slate-400">{vehicle.plate}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge
                className={
                  vehicle.status === 'Active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                }
              >
                {vehicle.status}
              </Badge>
              <Badge
                className={
                  vehicle.condition === 'Good'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }
              >
                {vehicle.condition}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Year</p>
              <p className="text-lg font-semibold">{vehicle.year}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">VIN</p>
              <p className="text-lg font-semibold font-mono text-sm">{vehicle.vin}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Inspections</p>
              <p className="text-lg font-semibold">{vehicle.inspections}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Open Issues</p>
              <p
                className={`text-lg font-semibold ${
                  vehicle.issues > 0 ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {vehicle.issues}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">Odometer</p>
              <Gauge className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">{vehicle.odometer.toLocaleString()}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">kilometers</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">Fuel Level</p>
              <Fuel className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold">{vehicle.fuelLevel}%</p>
            <Progress value={vehicle.fuelLevel} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">Next Service</p>
              <Wrench className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold">{daysUntilService}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              days ({new Date(vehicle.nextService).toLocaleDateString()})
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Inspection History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Inspections</CardTitle>
            <Link to="/enduser/fleet/inspections">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Passed Inspection</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {new Date(vehicle.lastInspection).toLocaleDateString()} • No issues found
                  </p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                Passed
              </Badge>
            </div>
            
            {vehicle.issues > 0 && (
              <div className="flex items-center justify-between p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium">Failed Inspection</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {vehicle.issues} issues requiring attention
                    </p>
                  </div>
                </div>
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                  Failed
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Maintenance History */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {vehicle.maintenanceHistory.map((maintenance, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">{maintenance.type}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {new Date(maintenance.date).toLocaleDateString()} • ${maintenance.cost}
                    </p>
                  </div>
                </div>
                <Badge
                  className={
                    maintenance.status === 'Completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                  }
                >
                  {maintenance.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Alert */}
      {daysUntilService <= 7 && (
        <Card className="border-orange-300 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Service Due Soon</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  This vehicle is due for service in {daysUntilService} days. Please schedule
                  maintenance to avoid any issues.
                </p>
                <Button variant="outline" className="border-orange-300">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Service
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
