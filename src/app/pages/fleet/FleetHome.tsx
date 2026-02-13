import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import {
  Truck,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Fuel,
  Wrench,
  DollarSign,
  TrendingUp,
  Calendar,
  MapPin,
} from 'lucide-react';

const stats = [
  { label: 'Total Vehicles', value: '42', icon: Truck, color: 'text-green-600' },
  { label: 'Operational', value: '38', icon: CheckCircle, color: 'text-blue-600' },
  { label: 'In Maintenance', value: '4', icon: Wrench, color: 'text-orange-600' },
  { label: 'Critical Alerts', value: '2', icon: AlertTriangle, color: 'text-red-600' },
];

const vehicles = [
  {
    id: 'VH-001',
    name: 'Delivery Truck #1',
    type: 'Box Truck',
    status: 'Operational',
    driver: 'John Doe',
    location: 'Building A',
    mileage: '45,230 km',
    fuelLevel: 85,
    nextMaintenance: '2026-02-20',
    lastInspection: '2 days ago',
    alerts: [],
  },
  {
    id: 'VH-002',
    name: 'Cargo Van #2',
    type: 'Cargo Van',
    status: 'Maintenance',
    driver: 'Unassigned',
    location: 'Service Center',
    mileage: '67,890 km',
    fuelLevel: 45,
    nextMaintenance: '2026-02-11',
    lastInspection: '1 week ago',
    alerts: ['Oil change due', 'Tire pressure low'],
  },
  {
    id: 'VH-003',
    name: 'Pickup Truck #3',
    type: 'Pickup',
    status: 'Operational',
    driver: 'Jane Smith',
    location: 'Site B',
    mileage: '32,450 km',
    fuelLevel: 92,
    nextMaintenance: '2026-03-05',
    lastInspection: '1 day ago',
    alerts: [],
  },
  {
    id: 'VH-004',
    name: 'Service Van #4',
    type: 'Service Van',
    status: 'Critical',
    driver: 'Mike Johnson',
    location: 'En Route',
    mileage: '89,120 km',
    fuelLevel: 15,
    nextMaintenance: '2026-02-09',
    lastInspection: '2 weeks ago',
    alerts: ['Fuel low', 'Maintenance overdue', 'Inspection required'],
  },
];

export function FleetHome() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fleet Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Monitor and manage your vehicle fleet
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/fleet/inspection/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Inspection
            </Button>
          </Link>
          <Link to="/fleet/analytics">
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fleet Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Vehicle Fleet</CardTitle>
              <CardDescription>All vehicles and their current status</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Search vehicles..." className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vehicles.map((vehicle) => (
              <Link key={vehicle.id} to={`/fleet/vehicle/${vehicle.id}`}>
                <div
                  className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                    vehicle.status === 'Critical'
                      ? 'border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-green-500 dark:hover:border-green-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-4 flex-1">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          vehicle.status === 'Operational'
                            ? 'bg-green-100 dark:bg-green-900/20'
                            : vehicle.status === 'Critical'
                            ? 'bg-red-100 dark:bg-red-900/20'
                            : 'bg-orange-100 dark:bg-orange-900/20'
                        }`}
                      >
                        <Truck
                          className={`w-6 h-6 ${
                            vehicle.status === 'Operational'
                              ? 'text-green-600'
                              : vehicle.status === 'Critical'
                              ? 'text-red-600'
                              : 'text-orange-600'
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{vehicle.name}</h3>
                          <Badge
                            variant={
                              vehicle.status === 'Operational'
                                ? 'default'
                                : vehicle.status === 'Critical'
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {vehicle.status}
                          </Badge>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {vehicle.id}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {vehicle.type} • {vehicle.mileage} • Driver: {vehicle.driver}
                        </p>
                        
                        {vehicle.alerts.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {vehicle.alerts.map((alert, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {alert}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600 dark:text-slate-400">{vehicle.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Fuel className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600 dark:text-slate-400">
                              Fuel: {vehicle.fuelLevel}%
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600 dark:text-slate-400">
                              Next: {new Date(vehicle.nextMaintenance).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600 dark:text-slate-400">
                              Inspected: {vehicle.lastInspection}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fuel level indicator */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Fuel Level</span>
                      <span className="font-medium">{vehicle.fuelLevel}%</span>
                    </div>
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          vehicle.fuelLevel < 20
                            ? 'bg-red-600'
                            : vehicle.fuelLevel < 50
                            ? 'bg-orange-600'
                            : 'bg-green-600'
                        }`}
                        style={{ width: `${vehicle.fuelLevel}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { vehicle: 'VH-002', task: 'Oil Change', date: 'Today', urgent: true },
                { vehicle: 'VH-007', task: 'Tire Rotation', date: 'Tomorrow', urgent: false },
                { vehicle: 'VH-015', task: 'Annual Inspection', date: 'Feb 15', urgent: false },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800"
                >
                  <div>
                    <p className="font-medium">{item.vehicle}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.task}</p>
                  </div>
                  <Badge variant={item.urgent ? 'destructive' : 'secondary'}>{item.date}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fuel Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">This Month</p>
                <p className="text-2xl font-bold">$8,450</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  12% lower than last month
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Avg per vehicle</span>
                    <span className="font-medium">$201</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Total consumption</span>
                    <span className="font-medium">3,280 L</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Violations & Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'Speed Violation', vehicle: 'VH-012', severity: 'High' },
                { type: 'Late Inspection', vehicle: 'VH-004', severity: 'Critical' },
                { type: 'Fuel Inefficiency', vehicle: 'VH-008', severity: 'Medium' },
              ].map((violation, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800"
                >
                  <div>
                    <p className="font-medium">{violation.type}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{violation.vehicle}</p>
                  </div>
                  <Badge
                    variant={
                      violation.severity === 'Critical'
                        ? 'destructive'
                        : violation.severity === 'High'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {violation.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
