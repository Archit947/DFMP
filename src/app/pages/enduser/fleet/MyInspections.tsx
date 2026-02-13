import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Search, CheckCircle, AlertTriangle, Clock, Truck, Calendar, Eye, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';

const inspections = [
  {
    id: 'INS-001',
    vehicle: { id: 'VH-001', model: 'Ford Transit Van', plate: 'ABC-1234' },
    date: '2026-02-13',
    time: '09:30 AM',
    status: 'Passed',
    issues: 0,
    odometer: 45230,
    fuelLevel: 75,
    inspector: 'You',
  },
  {
    id: 'INS-002',
    vehicle: { id: 'VH-002', model: 'Toyota Hilux', plate: 'XYZ-5678' },
    date: '2026-02-12',
    time: '02:15 PM',
    status: 'Failed',
    issues: 3,
    odometer: 89450,
    fuelLevel: 45,
    inspector: 'You',
    issueDetails: ['Tire pressure low', 'Brake fluid low', 'Windshield crack'],
  },
  {
    id: 'INS-003',
    vehicle: { id: 'VH-001', model: 'Ford Transit Van', plate: 'ABC-1234' },
    date: '2026-02-10',
    time: '11:00 AM',
    status: 'Passed',
    issues: 0,
    odometer: 45100,
    fuelLevel: 90,
    inspector: 'You',
  },
  {
    id: 'INS-004',
    vehicle: { id: 'VH-003', model: 'Mercedes Sprinter', plate: 'LMN-9012' },
    date: '2026-02-08',
    time: '08:45 AM',
    status: 'Passed with Minor Issues',
    issues: 1,
    odometer: 62340,
    fuelLevel: 60,
    inspector: 'You',
    issueDetails: ['Minor scratch on door'],
  },
];

export function MyInspections() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredInspections = inspections.filter((inspection) => {
    const matchesSearch =
      inspection.vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inspection.vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inspection.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || inspection.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const totalInspections = inspections.length;
  const passedInspections = inspections.filter((i) => i.status === 'Passed').length;
  const failedInspections = inspections.filter((i) => i.status === 'Failed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Inspections</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            View all your vehicle inspection history
          </p>
        </div>
        <Link to="/enduser/fleet/dashboard">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Inspections</p>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">{totalInspections}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Passed</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">{passedInspections}</p>
            <p className="text-xs text-green-600 mt-1">
              {Math.round((passedInspections / totalInspections) * 100)}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Failed/Issues</p>
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold">{failedInspections}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Requiring attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by vehicle or inspection ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Inspections</SelectItem>
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inspections List */}
      <div className="space-y-4">
        {filteredInspections.map((inspection) => (
          <Card key={inspection.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                      <Truck className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{inspection.vehicle.model}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {inspection.vehicle.plate} • {inspection.id}
                      </p>
                    </div>
                    <Badge
                      className={
                        inspection.status === 'Passed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : inspection.status === 'Failed'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                      }
                    >
                      {inspection.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Date & Time</p>
                      <p className="font-medium">
                        {new Date(inspection.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-slate-500">{inspection.time}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Odometer</p>
                      <p className="font-medium">{inspection.odometer.toLocaleString()} km</p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Fuel Level</p>
                      <p className="font-medium">{inspection.fuelLevel}%</p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Issues</p>
                      <p
                        className={`font-medium ${
                          inspection.issues > 0 ? 'text-red-600' : 'text-green-600'
                        }`}
                      >
                        {inspection.issues} found
                      </p>
                    </div>
                  </div>

                  {inspection.issueDetails && inspection.issueDetails.length > 0 && (
                    <div className="mt-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                      <p className="text-sm font-medium text-red-800 dark:text-red-400 mb-2">
                        Issues Found:
                      </p>
                      <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                        {inspection.issueDetails.map((issue, index) => (
                          <li key={index}>• {issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInspections.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Truck className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <h3 className="text-lg font-semibold mb-2">No inspections found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Try adjusting your search or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
