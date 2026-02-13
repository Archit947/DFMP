import { Link, useParams } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import {
  ArrowLeft,
  Download,
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  MapPin,
  User,
  AlertCircle,
  Camera,
  Star,
} from 'lucide-react';

const submissionData = {
  id: 'CL-099',
  title: 'Daily HVAC Inspection',
  location: 'Building A - 3rd Floor',
  submittedDate: '2026-02-11',
  submittedTime: '13:45',
  submittedBy: 'John Doe',
  score: 98,
  status: 'Approved',
  approvedBy: 'Sarah Manager',
  approvedDate: '2026-02-11',
  totalItems: 12,
  completedItems: 12,
  issuesFound: 0,
  responses: [
    {
      category: 'General Inspection',
      items: [
        { question: 'Is the HVAC unit operational?', answer: 'Yes', type: 'yes-no', photos: [] },
        { question: 'Check air filter condition', answer: '5', type: 'rating', photos: ['photo1.jpg'] },
        { question: 'Temperature reading (°F)', answer: '72', type: 'number', photos: [] },
        { question: 'Any unusual noises?', answer: 'No', type: 'yes-no', photos: [] },
      ],
    },
    {
      category: 'Safety Checks',
      items: [
        { question: 'Emergency shut-off accessible?', answer: 'Yes', type: 'yes-no', photos: [] },
        { question: 'Safety labels visible and legible?', answer: 'Yes', type: 'yes-no', photos: [] },
        { question: 'Fire extinguisher nearby?', answer: 'Yes', type: 'yes-no', photos: [] },
      ],
    },
    {
      category: 'Maintenance',
      items: [
        { question: 'Last maintenance date', answer: '2026-01-15', type: 'date', photos: [] },
        { question: 'Any leaks detected?', answer: 'No', type: 'yes-no', photos: [] },
        { question: 'Belt tension check', answer: '4', type: 'rating', photos: [] },
        { question: 'Additional notes', answer: 'All systems functioning normally. No issues detected.', type: 'text', photos: [] },
      ],
    },
  ],
};

export function ViewChecklistSubmission() {
  const { id } = useParams();

  const renderAnswer = (item: any) => {
    switch (item.type) {
      case 'yes-no':
        return (
          <div className="flex items-center gap-2">
            {item.answer === 'Yes' ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-600">Yes</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-600">No</span>
              </>
            )}
          </div>
        );
      case 'rating':
        return (
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < parseInt(item.answer)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-slate-300 dark:text-slate-700'
                }`}
              />
            ))}
            <span className="ml-2 font-medium">{item.answer}/5</span>
          </div>
        );
      case 'date':
        return (
          <span className="font-medium">
            {new Date(item.answer).toLocaleDateString()}
          </span>
        );
      default:
        return <span className="font-medium">{item.answer}</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/enduser/checklist/history">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold tracking-tight">{submissionData.title}</h1>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                <CheckCircle className="w-3 h-3 mr-1" />
                {submissionData.status}
              </Badge>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Submission ID: {submissionData.id}
            </p>
          </div>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Submission Info */}
      <Card>
        <CardHeader>
          <CardTitle>Submission Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Location</p>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <p className="font-medium">{submissionData.location}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Submitted Date</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <p className="font-medium">
                  {new Date(submissionData.submittedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Submitted Time</p>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <p className="font-medium">{submissionData.submittedTime}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Submitted By</p>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <p className="font-medium">{submissionData.submittedBy}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Score</p>
              <p className="text-2xl font-bold text-green-600">{submissionData.score}%</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Completion</p>
              <p className="font-medium">
                {submissionData.completedItems}/{submissionData.totalItems} items
              </p>
            </div>
          </div>

          {submissionData.status === 'Approved' && (
            <div className="mt-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-400">
                <strong>Approved by:</strong> {submissionData.approvedBy} on{' '}
                {new Date(submissionData.approvedDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Responses */}
      <div className="space-y-6">
        {submissionData.responses.map((category, catIndex) => (
          <Card key={catIndex}>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
              <CardDescription>{category.items.length} items</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="space-y-3">
                  <div className="flex items-start justify-between">
                    <p className="font-medium text-slate-700 dark:text-slate-300">
                      {itemIndex + 1}. {item.question}
                    </p>
                  </div>
                  <div>{renderAnswer(item)}</div>

                  {item.photos.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <Camera className="w-4 h-4" />
                      {item.photos.length} photo{item.photos.length !== 1 ? 's' : ''} attached
                    </div>
                  )}

                  {itemIndex < category.items.length - 1 && (
                    <div className="border-b border-slate-200 dark:border-slate-800" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
