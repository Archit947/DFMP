import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { ArrowLeft, CheckCircle, Camera, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const equipment = [
  { id: 'EQ-001', name: 'HVAC Unit - Floor 3', location: 'Building A - Floor 3' },
  { id: 'EQ-002', name: 'Elevator #1', location: 'Building A - Main Lobby' },
  { id: 'EQ-003', name: 'Fire Pump', location: 'Building A - Basement' },
  { id: 'EQ-004', name: 'Backup Generator', location: 'Building A - Rooftop' },
  { id: 'EQ-005', name: 'Cooling Tower', location: 'Building B - Rooftop' },
];

const issueCategories = [
  'Malfunction',
  'Breakdown',
  'Preventive Maintenance',
  'Inspection',
  'Repair',
  'Replacement',
  'Upgrade',
  'Other',
];

const priorities = ['Low', 'Medium', 'High', 'Urgent'];

export function CreateWorkOrder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    equipment: '',
    category: '',
    priority: '',
    title: '',
    description: '',
    location: '',
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleEquipmentChange = (equipmentId: string) => {
    const selected = equipment.find((eq) => eq.id === equipmentId);
    setFormData({
      ...formData,
      equipment: equipmentId,
      location: selected?.location || '',
    });
  };

  const handlePhotoUpload = (files: FileList | null) => {
    if (files) {
      setPhotos([...photos, ...Array.from(files)]);
      toast.success(`${files.length} photo(s) added`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.equipment || !formData.category || !formData.priority || !formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      toast.success('Work order created successfully!');
      navigate('/enduser/asset/work-orders');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate('/enduser/asset/dashboard')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Main Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create Work Order</CardTitle>
          <CardDescription>Submit a maintenance or repair request for equipment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Equipment Selection */}
          <div className="space-y-2">
            <Label htmlFor="equipment">
              Equipment <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.equipment} onValueChange={handleEquipmentChange}>
              <SelectTrigger id="equipment">
                <SelectValue placeholder="Select equipment..." />
              </SelectTrigger>
              <SelectContent>
                {equipment.map((eq) => (
                  <SelectItem key={eq.id} value={eq.id}>
                    {eq.name} ({eq.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location (Auto-filled) */}
          {formData.location && (
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-400">
                <strong>Location:</strong> {formData.location}
              </p>
            </div>
          )}

          {/* Issue Category */}
          <div className="space-y-2">
            <Label htmlFor="category">
              Issue Category <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category..." />
              </SelectTrigger>
              <SelectContent>
                {issueCategories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority">
              Priority <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => setFormData({ ...formData, priority: value })}
            >
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority..." />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority} value={priority.toLowerCase()}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Issue Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="e.g., HVAC not cooling properly"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Provide detailed description of the issue..."
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Include symptoms, when the issue started, and any relevant details
            </p>
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Photos (Optional)</Label>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 text-center">
              <Camera className="w-8 h-8 mx-auto mb-2 text-slate-400" />
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Add photos to help describe the issue
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                <Camera className="w-4 h-4 mr-2" />
                Upload Photos
              </Button>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handlePhotoUpload(e.target.files)}
              />
              {photos.length > 0 && (
                <p className="text-sm text-green-600 mt-3">
                  ✓ {photos.length} photo(s) attached
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Note */}
      <Card className="border-orange-300 dark:border-orange-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-orange-800 dark:text-orange-400 mb-1">
                Important Information
              </p>
              <p className="text-orange-700 dark:text-orange-300">
                For urgent/emergency issues, please also contact the facility manager directly at
                +1 (555) 123-4567
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold mb-1">Ready to submit?</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your work order will be reviewed by the maintenance team
              </p>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {submitting ? 'Submitting...' : 'Submit Work Order'}
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
