import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Checkbox } from '../../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { ArrowLeft, Plus, Trash2, GripVertical, Save } from 'lucide-react';
import { toast } from 'sonner';

interface ChecklistItem {
  id: string;
  type: 'checkbox' | 'text' | 'number' | 'radio' | 'photo';
  question: string;
  required: boolean;
  options?: string[];
}

export function ChecklistBuilder() {
  const navigate = useNavigate();
  const [checklistName, setChecklistName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', type: 'checkbox', question: '', required: false },
  ]);

  const addItem = (type: ChecklistItem['type']) => {
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      type,
      question: '',
      required: false,
      options: type === 'radio' ? ['Option 1', 'Option 2'] : undefined,
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, updates: Partial<ChecklistItem>) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    if (!checklistName || !category) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Checklist created successfully');
    navigate('/fm-checklist');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/fm-checklist')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Checklist Builder</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Create a new inspection checklist
          </p>
        </div>
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Checklist Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Checklist Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Daily Safety Inspection"
              value={checklistName}
              onChange={(e) => setChecklistName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="safety">Safety</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="quality">Quality</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of this checklist..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Checklist Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Checklist Items</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => addItem('checkbox')}>
                <Plus className="w-4 h-4 mr-1" />
                Checkbox
              </Button>
              <Button size="sm" variant="outline" onClick={() => addItem('text')}>
                <Plus className="w-4 h-4 mr-1" />
                Text
              </Button>
              <Button size="sm" variant="outline" onClick={() => addItem('radio')}>
                <Plus className="w-4 h-4 mr-1" />
                Radio
              </Button>
              <Button size="sm" variant="outline" onClick={() => addItem('photo')}>
                <Plus className="w-4 h-4 mr-1" />
                Photo
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-start gap-3">
                <GripVertical className="w-5 h-5 text-slate-400 mt-2 cursor-move" />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      #{index + 1}
                    </span>
                    <Select
                      value={item.type}
                      onValueChange={(value) => updateItem(item.id, { type: value as ChecklistItem['type'] })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checkbox">Checkbox</SelectItem>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="radio">Radio</SelectItem>
                        <SelectItem value="photo">Photo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Input
                    placeholder="Enter question or instruction..."
                    value={item.question}
                    onChange={(e) => updateItem(item.id, { question: e.target.value })}
                  />

                  {item.type === 'radio' && item.options && (
                    <div className="space-y-2">
                      {item.options.map((option, optIndex) => (
                        <Input
                          key={optIndex}
                          placeholder={`Option ${optIndex + 1}`}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...item.options!];
                            newOptions[optIndex] = e.target.value;
                            updateItem(item.id, { options: newOptions });
                          }}
                        />
                      ))}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const newOptions = [...item.options!, `Option ${item.options!.length + 1}`];
                          updateItem(item.id, { options: newOptions });
                        }}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Option
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={item.required}
                      onCheckedChange={(checked) => updateItem(item.id, { required: !!checked })}
                    />
                    <Label className="text-sm">Required field</Label>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-center py-8 text-slate-600 dark:text-slate-400">
              No items yet. Add items to your checklist using the buttons above.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate('/fm-checklist')}>
          Cancel
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            Save as Draft
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Create Checklist
          </Button>
        </div>
      </div>
    </div>
  );
}
