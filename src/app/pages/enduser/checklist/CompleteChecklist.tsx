import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';
import {
  ArrowLeft,
  Save,
  Send,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Camera,
  MapPin,
  Clock,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';

const checklistItems = [
  {
    id: '1',
    category: 'General Inspection',
    items: [
      { id: '1-1', question: 'Is the HVAC unit operational?', type: 'yes-no', required: true },
      { id: '1-2', question: 'Check air filter condition', type: 'rating', required: true },
      { id: '1-3', question: 'Temperature reading (°F)', type: 'number', required: true },
      { id: '1-4', question: 'Any unusual noises?', type: 'yes-no', required: true },
    ],
  },
  {
    id: '2',
    category: 'Safety Checks',
    items: [
      { id: '2-1', question: 'Emergency shut-off accessible?', type: 'yes-no', required: true },
      { id: '2-2', question: 'Safety labels visible and legible?', type: 'yes-no', required: true },
      { id: '2-3', question: 'Fire extinguisher nearby?', type: 'yes-no', required: true },
    ],
  },
  {
    id: '3',
    category: 'Maintenance',
    items: [
      { id: '3-1', question: 'Last maintenance date', type: 'date', required: true },
      { id: '3-2', question: 'Any leaks detected?', type: 'yes-no', required: true },
      { id: '3-3', question: 'Belt tension check', type: 'rating', required: true },
      { id: '3-4', question: 'Additional notes', type: 'text', required: false },
    ],
  },
];

export function CompleteChecklist() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [photos, setPhotos] = useState<Record<string, File[]>>({});
  const [savingDraft, setSavingDraft] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const checklistData = {
    id: id || 'CL-001',
    title: 'Daily HVAC Inspection',
    location: 'Building A - 3rd Floor',
    dueDate: '2026-02-12',
    dueTime: '14:00',
    priority: 'High',
  };

  const totalItems = checklistItems.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedItems = Object.keys(responses).length;
  const progress = (completedItems / totalItems) * 100;

  const handleResponseChange = (itemId: string, value: any) => {
    setResponses((prev) => ({ ...prev, [itemId]: value }));
  };

  const handlePhotoUpload = (itemId: string, files: FileList | null) => {
    if (files) {
      setPhotos((prev) => ({
        ...prev,
        [itemId]: [...(prev[itemId] || []), ...Array.from(files)],
      }));
      toast.success(`${files.length} photo(s) added`);
    }
  };

  const handleSaveDraft = async () => {
    setSavingDraft(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Draft saved successfully');
    setSavingDraft(false);
  };

  const handleSubmit = async () => {
    // Validate required fields
    const requiredItems = checklistItems.flatMap((cat) =>
      cat.items.filter((item) => item.required).map((item) => item.id)
    );
    const missingItems = requiredItems.filter((itemId) => !responses[itemId]);

    if (missingItems.length > 0) {
      toast.error(`Please complete all required fields (${missingItems.length} remaining)`);
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success('Checklist submitted successfully!');
    setSubmitting(false);
    navigate('/enduser/checklist/dashboard');
  };

  const renderInput = (item: any) => {
    switch (item.type) {
      case 'yes-no':
        return (
          <div className="flex gap-3">
            <Button
              type="button"
              variant={responses[item.id] === 'yes' ? 'default' : 'outline'}
              className={`flex-1 ${
                responses[item.id] === 'yes'
                  ? 'bg-green-600 hover:bg-green-700'
                  : ''
              }`}
              onClick={() => handleResponseChange(item.id, 'yes')}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Yes
            </Button>
            <Button
              type="button"
              variant={responses[item.id] === 'no' ? 'default' : 'outline'}
              className={`flex-1 ${
                responses[item.id] === 'no'
                  ? 'bg-red-600 hover:bg-red-700'
                  : ''
              }`}
              onClick={() => handleResponseChange(item.id, 'no')}
            >
              <XCircle className="w-4 h-4 mr-2" />
              No
            </Button>
          </div>
        );

      case 'rating':
        return (
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                type="button"
                variant={responses[item.id] === rating ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => handleResponseChange(item.id, rating)}
              >
                {rating}
              </Button>
            ))}
          </div>
        );

      case 'number':
        return (
          <Input
            type="number"
            value={responses[item.id] || ''}
            onChange={(e) => handleResponseChange(item.id, e.target.value)}
            placeholder="Enter value"
          />
        );

      case 'date':
        return (
          <Input
            type="date"
            value={responses[item.id] || ''}
            onChange={(e) => handleResponseChange(item.id, e.target.value)}
          />
        );

      case 'text':
        return (
          <Textarea
            value={responses[item.id] || ''}
            onChange={(e) => handleResponseChange(item.id, e.target.value)}
            placeholder="Enter additional notes..."
            rows={3}
          />
        );

      default:
        return <Input />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/enduser/checklist/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold tracking-tight">{checklistData.title}</h1>
              <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                {checklistData.priority}
              </Badge>
            </div>
            <p className="text-slate-600 dark:text-slate-400 flex items-center gap-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {checklistData.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Due: {new Date(checklistData.dueDate).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {checklistData.dueTime}
              </span>
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={handleSaveDraft} disabled={savingDraft}>
          <Save className="w-4 h-4 mr-2" />
          {savingDraft ? 'Saving...' : 'Save Draft'}
        </Button>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Completion Progress</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {completedItems} of {totalItems} items completed
            </p>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            {Math.round(progress)}% complete
          </p>
        </CardContent>
      </Card>

      {/* Checklist Form */}
      <div className="space-y-6">
        {checklistItems.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
              <CardDescription>
                {category.items.filter((i) => i.required).length} required items
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {category.items.map((item, index) => (
                <div key={item.id} className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <span className="font-medium">
                      {index + 1}. {item.question}
                    </span>
                    {item.required && (
                      <Badge variant="secondary" className="text-xs">
                        Required
                      </Badge>
                    )}
                  </Label>

                  {renderInput(item)}

                  {/* Photo Upload */}
                  <div>
                    <Label
                      htmlFor={`photo-${item.id}`}
                      className="cursor-pointer inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <Camera className="w-4 h-4" />
                      Add Photo {photos[item.id]?.length > 0 && `(${photos[item.id].length})`}
                    </Label>
                    <Input
                      id={`photo-${item.id}`}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handlePhotoUpload(item.id, e.target.files)}
                    />
                  </div>

                  {/* Show if issue detected */}
                  {responses[item.id] === 'no' && (
                    <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-orange-800 dark:text-orange-400 mb-2">
                            Issue Detected - Please provide details
                          </p>
                          <Textarea
                            placeholder="Describe the issue and any actions taken..."
                            rows={2}
                            className="bg-white dark:bg-slate-900"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {index < category.items.length - 1 && (
                    <div className="border-b border-slate-200 dark:border-slate-800" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submit Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium mb-1">Ready to submit?</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Make sure all required fields are completed before submitting
              </p>
            </div>
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={submitting || completedItems < totalItems}
              className="bg-green-600 hover:bg-green-700"
            >
              <Send className="w-4 h-4 mr-2" />
              {submitting ? 'Submitting...' : 'Submit Checklist'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}