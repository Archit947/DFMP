import { useParams, useNavigate, Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';
import {
  ArrowLeft,
  Package,
  Calendar,
  MapPin,
  Wrench,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
} from 'lucide-react';

const equipmentData = {
  'EQ-001': {
    id: 'EQ-001',
    name: 'HVAC Unit - Floor 3',
    category: 'HVAC',
    location: 'Building A - Floor 3',
    model: 'Carrier 50TCA10',
    serialNumber: 'CAR-2022-45678',
    status: 'Operational',
    health: 85,
    installDate: '2022-03-15',
    lastMaintenance: '2026-01-20',
    nextMaintenance: '2026-04-20',
    warrantyExpiry: '2027-03-15',
    workOrders: [
      { id: 'WO-001', title: 'HVAC not cooling properly', status: 'In Progress', date: '2026-02-12' },
      { id: 'WO-005', title: 'Filter replacement', status: 'Completed', date: '2026-01-20' },
    ],
    maintenanceHistory: [
      { date: '2026-01-20', type: 'Filter Replacement', cost: 120, status: 'Completed' },
      { date: '2025-10-15', type: 'Coil Cleaning', cost: 250, status: 'Completed' },
      { date: '2025-07-10', type: 'Refrigerant Check', cost: 150, status: 'Completed' },
    ],
    specifications: {
      capacity: '10 Tons',
      power: '460V / 3-Phase',
      refrigerant: 'R-410A',
      coverage: 'Floor 3 - 5,000 sq ft',
    },
  },
  'EQ-002': {
    id: 'EQ-002',
    name: 'Elevator #1',
    category: 'Elevator',
    location: 'Building A - Main Lobby',
    model: 'Otis Gen2',
    serialNumber: 'OTIS-2021-98765',
    status: 'Operational',
    health: 92,
    installDate: '2021-06-10',
    lastMaintenance: '2026-02-05',
    nextMaintenance: '2026-03-05',
    warrantyExpiry: '2026-06-10',
    workOrders: [
      { id: 'WO-002', title: 'Strange noise during operation', status: 'Assigned', date: '2026-02-13' },
    ],
    maintenanceHistory: [
      { date: '2026-02-05', type: 'Monthly Inspection', cost: 180, status: 'Completed' },
      { date: '2026-01-05', type: 'Monthly Inspection', cost: 180, status: 'Completed' },
    ],
    specifications: {
      capacity: '2,500 lbs',
      speed: '500 ft/min',
      floors: '1-15',
      type: 'Machine Room-Less',
    },
  },
};

export function EquipmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const equipment = equipmentData[id as keyof typeof equipmentData];

  if (!equipment) {
    return <div>Equipment not found</div>;
  }

  const daysUntilMaintenance = Math.floor(
    (new Date(equipment.nextMaintenance).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-600';
    if (health >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/enduser/asset/dashboard')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <Link to="/enduser/asset/work-order/new">
          <Button className="bg-orange-600 hover:bg-orange-700">
            <FileText className="w-4 h-4 mr-2" />
            Create Work Order
          </Button>
        </Link>
      </div>

      {/* Equipment Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                <Package className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{equipment.name}</h1>
                <p className="text-slate-600 dark:text-slate-400">{equipment.id}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge
                className={
                  equipment.status === 'Operational'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }
              >
                {equipment.status}
              </Badge>
              <Badge variant="secondary">{equipment.category}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Model</p>
              <p className="text-lg font-semibold">{equipment.model}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Serial Number</p>
              <p className="text-lg font-semibold font-mono text-sm">{equipment.serialNumber}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Location</p>
              <p className="text-lg font-semibold">{equipment.location}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Install Date</p>
              <p className="text-lg font-semibold">
                {new Date(equipment.installDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health & Maintenance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">Equipment Health</p>
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <p className={`text-3xl font-bold ${getHealthColor(equipment.health)}`}>
              {equipment.health}%
            </p>
            <Progress value={equipment.health} className="h-2 mt-3" />
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Excellent condition</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">Last Maintenance</p>
              <Wrench className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold">
              {new Date(equipment.lastMaintenance).toLocaleDateString()}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              {Math.floor(
                (new Date().getTime() - new Date(equipment.lastMaintenance).getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{' '}
              days ago
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">Next Maintenance</p>
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold">
              {new Date(equipment.nextMaintenance).toLocaleDateString()}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              In {daysUntilMaintenance} days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(equipment.specifications).map(([key, value]) => (
              <div key={key}>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Work Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Related Work Orders</CardTitle>
            <Link to="/enduser/asset/work-orders">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {equipment.workOrders.map((wo) => (
              <div
                key={wo.id}
                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center gap-3">
                  {wo.status === 'Completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-blue-600" />
                  )}
                  <div>
                    <p className="font-medium">{wo.title}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {new Date(wo.date).toLocaleDateString()} • {wo.id}
                    </p>
                  </div>
                </div>
                <Badge
                  className={
                    wo.status === 'Completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : wo.status === 'In Progress'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  }
                >
                  {wo.status}
                </Badge>
              </div>
            ))}
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
            {equipment.maintenanceHistory.map((maintenance, index) => (
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
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  {maintenance.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Warranty Alert */}
      {new Date(equipment.warrantyExpiry) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) && (
        <Card className="border-orange-300 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Warranty Expiring Soon</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  Equipment warranty expires on {new Date(equipment.warrantyExpiry).toLocaleDateString()}.
                  Consider renewal or extended service agreement.
                </p>
                <Button variant="outline" className="border-orange-300">
                  <Calendar className="w-4 h-4 mr-2" />
                  Contact Warranty Provider
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
