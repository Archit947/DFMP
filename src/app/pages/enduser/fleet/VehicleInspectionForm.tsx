import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import { Checkbox } from '../../../components/ui/checkbox';
import { Input } from '../../../components/ui/input';
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Camera,
  MapPin,
  Clock,
  Truck,
  Upload,
} from 'lucide-react';
import { toast } from 'sonner';

const inspectionChecks = [
  {
    category: 'Exterior',
    items: [
      { id: 'ext-1', label: 'Body condition (dents, scratches)', required: true },
      { id: 'ext-2', label: 'Paint condition', required: true },
      { id: 'ext-3', label: 'Glass and mirrors', required: true },
      { id: 'ext-4', label: 'Lights (headlights, taillights, indicators)', required: true },
      { id: 'ext-5', label: 'License plates', required: true },
    ],
  },
  {
    category: 'Tires & Wheels',
    items: [
      { id: 'tire-1', label: 'Tire pressure', required: true },
      { id: 'tire-2', label: 'Tread depth', required: true },
      { id: 'tire-3', label: 'Wheel condition', required: true },
      { id: 'tire-4', label: 'Spare tire', required: false },
    ],
  },
  {
    category: 'Engine & Fluids',
    items: [
      { id: 'eng-1', label: 'Engine oil level', required: true },
      { id: 'eng-2', label: 'Coolant level', required: true },
      { id: 'eng-3', label: 'Brake fluid', required: true },
      { id: 'eng-4', label: 'Windshield washer fluid', required: true },
      { id: 'eng-5', label: 'Check for leaks', required: true },
    ],
  },
  {
    category: 'Interior',
    items: [
      { id: 'int-1', label: 'Dashboard and controls', required: true },
      { id: 'int-2', label: 'Seats and seatbelts', required: true },
      { id: 'int-3', label: 'Air conditioning/heating', required: true },
      { id: 'int-4', label: 'Cleanliness', required: false },
    ],
  },
  {
    category: 'Safety Equipment',
    items: [
      { id: 'safe-1', label: 'Fire extinguisher', required: true },
      { id: 'safe-2', label: 'First aid kit', required: true },
      { id: 'safe-3', label: 'Warning triangle', required: true },
      { id: 'safe-4', label: 'Tool kit', required: false },
    ],
  },
];

const vehicles = {
  'VH-001': { id: 'VH-001', model: 'Ford Transit Van', plate: 'ABC-1234' },
  'VH-002': { id: 'VH-002', model: 'Toyota Hilux', plate: 'XYZ-5678' },
};

export function VehicleInspectionForm() {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [inspectionData, setInspectionData] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<Record<string, File[]>>({});
  const [notes, setNotes] = useState('');
  const [odometerReading, setOdometerReading] = useState('');
  const [fuelLevel, setFuelLevel] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const vehicle = vehicles[vehicleId as keyof typeof vehicles];

  if (!vehicle) {
    return <div>Vehicle not found</div>;
  }

  const handleCheckChange = (itemId: string, value: string) => {
    setInspectionData({ ...inspectionData, [itemId]: value });
  };

  const handlePhotoUpload = (itemId: string, files: FileList | null) => {
    if (files) {
      setPhotos({ ...photos, [itemId]: Array.from(files) });
      toast.success('Photo added');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const allRequiredItems = inspectionChecks.flatMap((cat) =>
      cat.items.filter((item) => item.required)
    );
    const missingItems = allRequiredItems.filter((item) => !inspectionData[item.id]);
    
    if (missingItems.length > 0) {
      toast.error(`Please complete all required checks (${missingItems.length} remaining)`);
      return;
    }

    if (!odometerReading || !fuelLevel) {
      toast.error('Please enter odometer reading and fuel level');
      return;
    }

    setSubmitting(true);
    
    setTimeout(() => {
      toast.success('Inspection submitted successfully!');
      navigate('/enduser/fleet/inspections');
    }, 1500);
  };

  const completedChecks = Object.keys(inspectionData).length;
  const totalChecks = inspectionChecks.flatMap((cat) => cat.items).length;
  const progress = (completedChecks / totalChecks) * 100;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate('/enduser/fleet/dashboard')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="text-right">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {completedChecks} of {totalChecks} checks completed
          </p>
          <p className="text-xs text-slate-500">{Math.round(progress)}%</p>
        </div>
      </div>

      {/* Vehicle Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <Truck className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <CardTitle>Vehicle Inspection</CardTitle>
              <CardDescription>
                {vehicle.model} • {vehicle.plate}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="odometer">Odometer Reading (km) *</Label>
              <Input
                id="odometer"
                type="number"
                placeholder="e.g., 45000"
                value={odometerReading}
                onChange={(e) => setOdometerReading(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="fuel">Fuel Level (%) *</Label>
              <Input
                id="fuel"
                type="number"
                min="0"
                max="100"
                placeholder="e.g., 75"
                value={fuelLevel}
                onChange={(e) => setFuelLevel(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Clock className="w-4 h-4" />
            {new Date().toLocaleString()}
          </div>
        </CardContent>
      </Card>

      {/* Inspection Checks */}
      {inspectionChecks.map((category) => (
        <Card key={category.category}>
          <CardHeader>
            <CardTitle className="text-lg">{category.category}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {category.items.map((item) => (
              <div key={item.id} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="flex items-start justify-between mb-3">
                  <Label className="text-base">
                    {item.label}
                    {item.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {inspectionData[item.id] && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>

                <RadioGroup
                  value={inspectionData[item.id]}
                  onValueChange={(value) => handleCheckChange(item.id, value)}
                  className="mb-3"
                >
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pass" id={`${item.id}-pass`} />
                      <Label htmlFor={`${item.id}-pass`} className="cursor-pointer">
                        ✓ Pass
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fail" id={`${item.id}-fail`} />
                      <Label htmlFor={`${item.id}-fail`} className="cursor-pointer">
                        ✗ Fail
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="na" id={`${item.id}-na`} />
                      <Label htmlFor={`${item.id}-na`} className="cursor-pointer">
                        N/A
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {inspectionData[item.id] === 'fail' && (
                  <div className="mt-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <p className="text-sm font-medium text-red-800 dark:text-red-400">
                        Issue Detected
                      </p>
                    </div>
                    <Textarea
                      placeholder="Describe the issue..."
                      rows={2}
                      className="mb-2"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById(`photo-${item.id}`)?.click()}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Add Photo
                    </Button>
                    <input
                      id={`photo-${item.id}`}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handlePhotoUpload(item.id, e.target.files)}
                    />
                    {photos[item.id] && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                        {photos[item.id].length} photo(s) attached
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Any additional observations or comments..."
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Submit */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold mb-1">Ready to submit?</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {completedChecks} of {totalChecks} checks completed
              </p>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={submitting || completedChecks < totalChecks}
              className="bg-green-600 hover:bg-green-700"
            >
              {submitting ? 'Submitting...' : 'Submit Inspection'}
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
