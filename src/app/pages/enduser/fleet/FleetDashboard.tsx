import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import {
  Truck,
  Fuel,
  Wrench,
  AlertCircle,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Plus,
} from 'lucide-react';

const assignedVehicles = [
  {
    id: 'VH-042',
    name: 'Ford Transit Van',
    type: 'Cargo Van',
    plate: 'ABC-1234',
    mileage: 45230,
    fuelLevel: 65,
    nextMaintenance: '2026-02-20',
    status: 'Active',
    lastInspection: '2026-02-10',
    issues: 0,
  },
  {
    id: 'VH-018',
    name: 'Toyota Hilux',
    type: 'Pickup Truck',
    plate: 'XYZ-5678',
    mileage: 32100,
    fuelLevel: 40,
    nextMaintenance: '2026-02-15',
    status: 'Maintenance Due',
    lastInspection: '2026-02-08',
    issues: 2,
  },
];

const recentInspections = [
  {
    id: 'INS-099',
    vehicleId: 'VH-042',
    vehicleName: 'Ford Transit Van',
    date: '2026-02-10',
    type: 'Daily Pre-Trip',
    status: 'Passed',
    issues: 0,
  },
  {
    id: 'INS-098',
    vehicleId: 'VH-018',
    vehicleName: 'Toyota Hilux',
    date: '2026-02-08',
    type: 'Daily Pre-Trip',
    status: 'Issues Found',
    issues: 2,
  },
];

const pendingTasks = [
  {
    id: 'TSK-001',
    vehicleId: 'VH-018',
    vehicleName: 'Toyota Hilux',
    task: 'Schedule Oil Change',
    dueDate: '2026-02-15',
    priority: 'High',
  },
  {
    id: 'TSK-002',
    vehicleId: 'VH-042',
    vehicleName: 'Ford Transit Van',
    task: 'Tire Pressure Check',
    dueDate: '2026-02-18',
    priority: 'Medium',
  },
];

export function FleetDashboard() {
  const stats = {
    assignedVehicles: assignedVehicles.length,
    maintenanceDue: assignedVehicles.filter((v) => v.status === 'Maintenance Due').length,
    inspectionsCompleted: recentInspections.length,
    issuesReported: assignedVehicles.reduce((acc, v) => acc + v.issues, 0),
    activeIssues: assignedVehicles.reduce((acc, v) => acc + v.issues, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Fleet</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your assigned vehicles and perform inspections
          </p>
        </div>
        <Link to="/end-user/fleet/inspection/new">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            New Inspection
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Assigned Vehicles</p>
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">{stats.assignedVehicles}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Maintenance Due</p>
              <Wrench className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold">{stats.maintenanceDue}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Inspections Done</p>
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">{stats.inspectionsCompleted}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Issues Reported</p>
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold">{stats.issuesReported}</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/enduser/fleet/inspections">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">My Inspections</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    View inspection history
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                <Wrench className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Maintenance Due</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {stats.maintenanceDue} vehicles
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Active Issues</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {stats.activeIssues} reported
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Vehicles */}
      <Card>
        <CardHeader>
          <CardTitle>My Vehicles</CardTitle>
          <CardDescription>Vehicles assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assignedVehicles.map((vehicle) => (
              <Link key={vehicle.id} to={`/end-user/fleet/vehicle/${vehicle.id}`} className="block">
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-green-500 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{vehicle.name}</h3>
                        <Badge variant="outline">{vehicle.type}</Badge>
                        <Badge
                          className={
                            vehicle.status === 'Active'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                          }
                        >
                          {vehicle.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {vehicle.id} • {vehicle.plate}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Mileage</p>
                      <p className="font-medium">{vehicle.mileage.toLocaleString()} mi</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Fuel Level</p>
                      <div className="flex items-center gap-2">
                        <Fuel className="w-4 h-4 text-blue-600" />
                        <p className="font-medium">{vehicle.fuelLevel}%</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Next Maintenance</p>
                      <p className="font-medium text-sm">
                        {new Date(vehicle.nextMaintenance).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {vehicle.issues > 0 && (
                    <div className="flex items-center gap-2 text-sm text-orange-600">
                      <AlertCircle className="w-4 h-4" />
                      {vehicle.issues} issue{vehicle.issues !== 1 ? 's' : ''} reported
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inspections */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Inspections</CardTitle>
              <Link to="/end-user/fleet/inspections">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentInspections.map((inspection) => (
                <div
                  key={inspection.id}
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{inspection.vehicleName}</p>
                    <Badge
                      className={
                        inspection.status === 'Passed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                      }
                    >
                      {inspection.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {inspection.type} • {new Date(inspection.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{task.task}</p>
                    <Badge
                      className={
                        task.priority === 'High'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {task.vehicleName} • Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}