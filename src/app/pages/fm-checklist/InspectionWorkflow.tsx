import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Camera, Upload, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface InspectionItem {
  id: string;
  question: string;
  type: 'checkbox' | 'text' | 'radio' | 'photo';
  required: boolean;
  options?: string[];
  value?: any;
  photo?: string;
  notes?: string;
}

export function InspectionWorkflow() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [inspectionData, setInspectionData] = useState<InspectionItem[]>([
    {
      id: '1',
      question: 'Are all fire extinguishers in place and accessible?',
      type: 'checkbox',
      required: true,
      value: false,
    },
    {
      id: '2',
      question: 'Check emergency exit signs',
      type: 'radio',
      required: true,
      options: ['All functional', 'Some issues', 'Not functional'],
    },
    {
      id: '3',
      question: 'Upload photo of the inspection area',
      type: 'photo',
      required: true,
    },
    {
      id: '4',
      question: 'Additional observations or concerns',
      type: 'text',
      required: false,
    },
  ]);

  const totalSteps = inspectionData.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const updateItemValue = (id: string, value: any) => {
    setInspectionData(
      inspectionData.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const updateItemNotes = (id: string, notes: string) => {
    setInspectionData(
      inspectionData.map((item) => (item.id === id ? { ...item, notes } : item))
    );
  };

  const handleNext = () => {
    const currentItem = inspectionData[currentStep];
    if (currentItem.required && !currentItem.value) {
      toast.error('This field is required');
      return;
    }
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const incompleteItems = inspectionData.filter((item) => item.required && !item.value);
    if (incompleteItems.length > 0) {
      toast.error('Please complete all required fields');
      return;
    }
    toast.success('Inspection submitted successfully');
    navigate('/fm-checklist');
  };

  const currentItem = inspectionData[currentStep];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/fm-checklist')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Daily Safety Inspection</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Inspection ID: #{id}</p>
        </div>
        <Badge>Step {currentStep + 1} of {totalSteps}</Badge>
      </div>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} />
      </div>

      {/* Current Item */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              Question {currentStep + 1}
              {currentItem.required && <span className="text-red-500 ml-1">*</span>}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-lg font-medium mb-4">{currentItem.question}</p>

            {/* Checkbox */}
            {currentItem.type === 'checkbox' && (
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={currentItem.value || false}
                  onCheckedChange={(checked) => updateItemValue(currentItem.id, checked)}
                  id={`checkbox-${currentItem.id}`}
                />
                <Label htmlFor={`checkbox-${currentItem.id}`} className="text-base cursor-pointer">
                  Yes, confirmed
                </Label>
              </div>
            )}

            {/* Radio */}
            {currentItem.type === 'radio' && currentItem.options && (
              <RadioGroup
                value={currentItem.value}
                onValueChange={(value) => updateItemValue(currentItem.id, value)}
              >
                {currentItem.options.map((option) => (
                  <div key={option} className="flex items-center gap-3">
                    <RadioGroupItem value={option} id={`radio-${option}`} />
                    <Label htmlFor={`radio-${option}`} className="text-base cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {/* Text */}
            {currentItem.type === 'text' && (
              <Textarea
                placeholder="Enter your response..."
                value={currentItem.value || ''}
                onChange={(e) => updateItemValue(currentItem.id, e.target.value)}
                rows={4}
              />
            )}

            {/* Photo */}
            {currentItem.type === 'photo' && (
              <div className="space-y-4">
                {currentItem.photo ? (
                  <div className="relative">
                    <img
                      src={currentItem.photo}
                      alt="Inspection photo"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => updateItemValue(currentItem.id, undefined)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-12 text-center">
                    <Camera className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Take or upload a photo
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => {
                          // Simulate photo upload
                          updateItemValue(currentItem.id, 'photo-placeholder');
                          toast.success('Photo uploaded');
                        }}
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Take Photo
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          updateItemValue(currentItem.id, 'photo-placeholder');
                          toast.success('Photo uploaded');
                        }}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional observations or comments..."
              value={currentItem.notes || ''}
              onChange={(e) => updateItemNotes(currentItem.id, e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>

        <div className="flex gap-2">
          {currentStep === totalSteps - 1 ? (
            <Button onClick={handleSubmit} className="gap-2">
              <Check className="w-4 h-4" />
              Submit Inspection
            </Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center gap-2">
        {inspectionData.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setCurrentStep(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentStep
                ? 'bg-blue-600'
                : item.value
                ? 'bg-green-600'
                : 'bg-slate-300 dark:bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
