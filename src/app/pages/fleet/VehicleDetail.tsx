import { useParams, Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Progress } from '../../components/ui/progress';
import {
  ArrowLeft,
  Truck,
  MapPin,
  Calendar,
  Fuel,
  Gauge,
  FileText,
  Wrench,
  AlertTriangle,
  Download,
  Edit,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const fuelData = [
  { date: 'Feb 1', consumption: 45 },
  { date: 'Feb 3', consumption: 52 },
  { date: 'Feb 5', consumption: 48 },
  { date: 'Feb 7', consumption: 50 },
  { date: 'Feb 9', consumption: 47 },
  { date: 'Feb 11', consumption: 49 },
];

const maintenanceHistory = [
  {
    date: '2026-01-15',
    type: 'Oil Change',
    mileage: '43,500 km',
    cost: '$120',
    technician: 'Mike Johnson',
    status: 'Completed',
  },
  {
    date: '2025-12-10',
    type: 'Tire Rotation',
    mileage: '42,000 km',
    cost: '$80',
    technician: 'Sarah Lee',
    status: 'Completed',
  },
  {
    date: '2025-11-05',
    type: 'Brake Inspection',
    mileage: '40,500 km',
    cost: '$150',
    technician: 'Mike Johnson',
    status: 'Completed',
  },
];

const inspectionHistory = [
  { date: '2026-02-10', type: 'Pre-Trip', inspector: 'John Doe', result: 'Pass', issues: 0 },
  { date: '2026-02-08', type: 'Post-Trip', inspector: 'John Doe', result: 'Pass', issues: 0 },
  { date: '2026-02-05', type: 'Pre-Trip', inspector: 'Jane Smith', result: 'Pass', issues: 0 },
  { date: '2026-02-03', type: 'Post-Trip', inspector: 'John Doe', result: 'Minor Issues', issues: 2 },
];

const documents = [
  { name: 'Registration Certificate', type: 'PDF', date: '2025-01-15', size: '2.4 MB' },
  { name: 'Insurance Policy', type: 'PDF', date: '2025-12-01', size: '1.8 MB' },
  { name: 'Maintenance Manual', type: 'PDF', date: '2024-06-01', size: '5.2 MB' },
];

export function VehicleDetail() {
  const { id } = useParams();

  const vehicleData = {
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
    make: 'Ford',
    model: 'Transit',
    year: '2023',
    vin: '1FTBW3XM9PKA12345',
    licensePlate: 'ABC-1234',
    purchaseDate: '2023-03-15',
    purchasePrice: '$45,000',
    currentValue: '$38,000',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/fleet">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold tracking-tight">{vehicleData.name}</h1>
              <Badge variant="default">{vehicleData.status}</Badge>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              {vehicleData.id} • {vehicleData.type} • {vehicleData.make} {vehicleData.model}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Link to="/fleet/inspection/new">
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              New Inspection
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Status</p>
                <p className="text-xl font-bold">{vehicleData.status}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Gauge className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Mileage</p>
                <p className="text-xl font-bold">{vehicleData.mileage}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                <Fuel className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Fuel Level</p>
                <p className="text-xl font-bold">{vehicleData.fuelLevel}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Next Service</p>
                <p className="text-sm font-bold">
                  {new Date(vehicleData.nextMaintenance).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="fuel">Fuel Tracking</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Make</p>
                    <p className="font-medium">{vehicleData.make}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Model</p>
                    <p className="font-medium">{vehicleData.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Year</p>
                    <p className="font-medium">{vehicleData.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Type</p>
                    <p className="font-medium">{vehicleData.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">VIN</p>
                    <p className="font-medium">{vehicleData.vin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">License Plate</p>
                    <p className="font-medium">{vehicleData.licensePlate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Assignment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Assigned Driver</p>
                    <p className="font-medium">{vehicleData.driver}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Current Location</p>
                    <p className="font-medium flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {vehicleData.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Last Inspection</p>
                    <p className="font-medium">{vehicleData.lastInspection}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Current Mileage</p>
                    <p className="font-medium">{vehicleData.mileage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Purchase Date</p>
                    <p className="font-medium">{vehicleData.purchaseDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Purchase Price</p>
                    <p className="font-medium">{vehicleData.purchasePrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Current Value</p>
                    <p className="font-medium">{vehicleData.currentValue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Depreciation</p>
                    <p className="font-medium text-red-600">-$7,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fuel Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Current Level</span>
                      <span className="text-2xl font-bold">{vehicleData.fuelLevel}%</span>
                    </div>
                    <Progress value={vehicleData.fuelLevel} className="h-3" />
                  </div>
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Last Refuel</span>
                      <span className="font-medium">2 days ago</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-slate-600 dark:text-slate-400">Avg. Fuel Economy</span>
                      <span className="font-medium">8.5 L/100km</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Maintenance History</CardTitle>
                  <CardDescription>All completed and scheduled maintenance</CardDescription>
                </div>
                <Button>
                  <Wrench className="w-4 h-4 mr-2" />
                  Schedule Maintenance
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceHistory.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-green-500 dark:hover:border-green-500 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                          <Wrench className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{item.type}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {new Date(item.date).toLocaleDateString()} • {item.mileage}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Technician: {item.technician}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="default">{item.status}</Badge>
                        <p className="text-sm font-medium mt-2">{item.cost}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { task: 'Oil Change', due: '2026-02-20', mileage: '46,000 km' },
                  { task: 'Tire Rotation', due: '2026-03-15', mileage: '48,000 km' },
                  { task: 'Annual Inspection', due: '2026-04-01', mileage: '50,000 km' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800"
                  >
                    <div>
                      <p className="font-medium">{item.task}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Due at {item.mileage}</p>
                    </div>
                    <Badge variant="secondary">{new Date(item.due).toLocaleDateString()}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inspections Tab */}
        <TabsContent value="inspections" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Inspection History</CardTitle>
                  <CardDescription>Pre-trip and post-trip inspections</CardDescription>
                </div>
                <Link to="/fleet/inspection/new">
                  <Button>
                    <FileText className="w-4 h-4 mr-2" />
                    New Inspection
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inspectionHistory.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-green-500 dark:hover:border-green-500 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            item.result === 'Pass'
                              ? 'bg-green-100 dark:bg-green-900/20'
                              : 'bg-orange-100 dark:bg-orange-900/20'
                          }`}
                        >
                          {item.result === 'Pass' ? (
                            <FileText className="w-5 h-5 text-green-600" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-orange-600" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{item.type} Inspection</h3>
                            <Badge variant={item.result === 'Pass' ? 'default' : 'secondary'}>
                              {item.result}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {new Date(item.date).toLocaleDateString()} • Inspector: {item.inspector}
                          </p>
                          {item.issues > 0 && (
                            <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                              {item.issues} issue{item.issues > 1 ? 's' : ''} found
                            </p>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fuel Tracking Tab */}
        <TabsContent value="fuel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fuel Consumption Trend</CardTitle>
              <CardDescription>Daily fuel consumption over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fuelData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                    <XAxis
                      dataKey="date"
                      className="text-xs"
                      tick={{ fill: 'currentColor' }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: 'currentColor' }}
                      label={{ value: 'Liters', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="consumption"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$320</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Total fuel cost</p>
                <p className="text-sm text-green-600 mt-2">8% lower than last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">8.5 L</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Per 100 km</p>
                <p className="text-sm text-green-600 mt-2">Excellent performance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Distance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,230 km</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">This month</p>
                <p className="text-sm text-blue-600 mt-2">12 days tracked</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Vehicle Documents</CardTitle>
                  <CardDescription>Registration, insurance, and manuals</CardDescription>
                </div>
                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-green-500 dark:hover:border-green-500 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{doc.name}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {doc.type} • {doc.size} • {new Date(doc.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
