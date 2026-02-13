import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Checkbox } from '../../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { ArrowLeft, Camera, Save } from 'lucide-react';
import { toast } from 'sonner';

const inspectionItems = [
  { id: 'brakes', label: 'Brakes', category: 'Safety' },
  { id: 'tires', label: 'Tire Condition', category: 'Safety' },
  { id: 'lights', label: 'Lights & Signals', category: 'Safety' },
  { id: 'mirrors', label: 'Mirrors', category: 'Safety' },
  { id: 'windshield', label: 'Windshield & Wipers', category: 'Safety' },
  { id: 'seatbelts', label: 'Seatbelts', category: 'Safety' },
  { id: 'horn', label: 'Horn', category: 'Safety' },
  { id: 'oil', label: 'Oil Level', category: 'Maintenance' },
  { id: 'coolant', label: 'Coolant Level', category: 'Maintenance' },
  { id: 'battery', label: 'Battery', category: 'Maintenance' },
  { id: 'belts', label: 'Belts & Hoses', category: 'Maintenance' },
  { id: 'leaks', label: 'Fluid Leaks', category: 'Maintenance' },
  { id: 'interior', label: 'Interior Cleanliness', category: 'General' },
  { id: 'exterior', label: 'Exterior Condition', category: 'General' },
  { id: 'documents', label: 'Required Documents', category: 'General' },
];

export function FleetInspection() {
  const navigate = useNavigate();
  const [inspectionType, setInspectionType] = useState('pre-trip');
  const [vehicleId, setVehicleId] = useState('');
  const [inspectorName, setInspectorName] = useState('');
  const [mileage, setMileage] = useState('');
  const [notes, setNotes] = useState('');
  const [inspectionResults, setInspectionResults] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    if (!vehicleId || !inspectorName || !mileage) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Check if all items are inspected
    const allItemsInspected = inspectionItems.every(item => inspectionResults[item.id]);
    if (!allItemsInspected) {
      toast.error('Please complete all inspection items');
      return;
    }

    toast.success('Inspection submitted successfully');
    setTimeout(() => {
      navigate('/fleet');
    }, 1500);
  };

  const handleItemCheck = (itemId: string, status: string) => {
    setInspectionResults(prev => ({
      ...prev,
      [itemId]: status,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/fleet">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vehicle Inspection</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Complete pre-trip or post-trip inspection
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Inspection Details</CardTitle>
            <CardDescription>Enter basic inspection information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inspection-type">Inspection Type *</Label>
                <Select value={inspectionType} onValueChange={setInspectionType}>
                  <SelectTrigger id="inspection-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre-trip">Pre-Trip Inspection</SelectItem>
                    <SelectItem value="post-trip">Post-Trip Inspection</SelectItem>
                    <SelectItem value="routine">Routine Inspection</SelectItem>
                    <SelectItem value="safety">Safety Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicle-id">Vehicle ID *</Label>
                <Select value={vehicleId} onValueChange={setVehicleId}>
                  <SelectTrigger id="vehicle-id">
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VH-001">VH-001 - Delivery Truck #1</SelectItem>
                    <SelectItem value="VH-002">VH-002 - Cargo Van #2</SelectItem>
                    <SelectItem value="VH-003">VH-003 - Pickup Truck #3</SelectItem>
                    <SelectItem value="VH-004">VH-004 - Service Van #4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="inspector">Inspector Name *</Label>
                <Input
                  id="inspector"
                  value={inspectorName}
                  onChange={(e) => setInspectorName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileage">Current Mileage (km) *</Label>
                <Input
                  id="mileage"
                  type="number"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  placeholder="45230"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Items */}
        <Card>
          <CardHeader>
            <CardTitle>Safety Items</CardTitle>
            <CardDescription>Inspect all safety-critical components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inspectionItems
                .filter(item => item.category === 'Safety')
                .map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800"
                  >
                    <Label htmlFor={item.id} className="font-medium">
                      {item.label}
                    </Label>
                    <RadioGroup
                      id={item.id}
                      value={inspectionResults[item.id] || ''}
                      onValueChange={(value) => handleItemCheck(item.id, value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pass" id={`${item.id}-pass`} />
                        <Label htmlFor={`${item.id}-pass`} className="text-sm cursor-pointer">
                          Pass
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fail" id={`${item.id}-fail`} />
                        <Label htmlFor={`${item.id}-fail`} className="text-sm cursor-pointer">
                          Fail
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="na" id={`${item.id}-na`} />
                        <Label htmlFor={`${item.id}-na`} className="text-sm cursor-pointer">
                          N/A
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Items */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Items</CardTitle>
            <CardDescription>Check maintenance and fluid levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inspectionItems
                .filter(item => item.category === 'Maintenance')
                .map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800"
                  >
                    <Label htmlFor={item.id} className="font-medium">
                      {item.label}
                    </Label>
                    <RadioGroup
                      id={item.id}
                      value={inspectionResults[item.id] || ''}
                      onValueChange={(value) => handleItemCheck(item.id, value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pass" id={`${item.id}-pass`} />
                        <Label htmlFor={`${item.id}-pass`} className="text-sm cursor-pointer">
                          Pass
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fail" id={`${item.id}-fail`} />
                        <Label htmlFor={`${item.id}-fail`} className="text-sm cursor-pointer">
                          Fail
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="na" id={`${item.id}-na`} />
                        <Label htmlFor={`${item.id}-na`} className="text-sm cursor-pointer">
                          N/A
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* General Items */}
        <Card>
          <CardHeader>
            <CardTitle>General Items</CardTitle>
            <CardDescription>Overall vehicle condition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inspectionItems
                .filter(item => item.category === 'General')
                .map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800"
                  >
                    <Label htmlFor={item.id} className="font-medium">
                      {item.label}
                    </Label>
                    <RadioGroup
                      id={item.id}
                      value={inspectionResults[item.id] || ''}
                      onValueChange={(value) => handleItemCheck(item.id, value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pass" id={`${item.id}-pass`} />
                        <Label htmlFor={`${item.id}-pass`} className="text-sm cursor-pointer">
                          Pass
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fail" id={`${item.id}-fail`} />
                        <Label htmlFor={`${item.id}-fail`} className="text-sm cursor-pointer">
                          Fail
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="na" id={`${item.id}-na`} />
                        <Label htmlFor={`${item.id}-na`} className="text-sm cursor-pointer">
                          N/A
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Notes and Photos */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>Add notes and photos if needed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Notes & Comments</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional observations, issues, or comments..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Attach Photos</Label>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-8 text-center">
                <Camera className="w-12 h-12 mx-auto text-slate-400 mb-2" />
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Click to upload or drag and drop
                </p>
                <Button variant="outline" type="button">
                  Select Photos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-2">
          <Link to="/fleet">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Submit Inspection
          </Button>
        </div>
      </form>
    </div>
  );
}
