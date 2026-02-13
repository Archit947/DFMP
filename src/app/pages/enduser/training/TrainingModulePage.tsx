import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Progress } from '../../../components/ui/progress';
import { Badge } from '../../../components/ui/badge';
import { Checkbox } from '../../../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import {
  ArrowLeft,
  CheckCircle,
  PlayCircle,
  FileText,
  Award,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';

const moduleContent = {
  'hvac-101': {
    title: 'Introduction to HVAC Systems',
    description: 'Learn the fundamentals of heating, ventilation, and air conditioning',
    duration: '25 minutes',
    sections: [
      {
        id: 's1',
        title: 'What is HVAC?',
        type: 'video',
        duration: '5 min',
        content: 'Introduction to HVAC systems and their importance in facility management.',
      },
      {
        id: 's2',
        title: 'Components Overview',
        type: 'text',
        duration: '8 min',
        content: 'Key components include: Compressor, Condenser, Evaporator, Expansion Valve, Air Handler, Thermostat, and Ductwork.',
      },
      {
        id: 's3',
        title: 'System Types',
        type: 'text',
        duration: '7 min',
        content: 'Central AC, Split Systems, Packaged Systems, and VRF Systems.',
      },
      {
        id: 's4',
        title: 'Knowledge Check',
        type: 'quiz',
        duration: '5 min',
        content: '',
      },
    ],
  },
};

const quizQuestions = [
  {
    id: 'q1',
    question: 'What does HVAC stand for?',
    type: 'multiple',
    options: [
      'Heating, Ventilation, and Air Conditioning',
      'High Voltage Air Control',
      'Home Ventilation and Cooling',
      'Hydraulic Vent and Circulation',
    ],
    correct: 0,
  },
  {
    id: 'q2',
    question: 'Which components are part of an HVAC system? (Select all that apply)',
    type: 'checkbox',
    options: ['Compressor', 'Radiator', 'Evaporator', 'Carburetor', 'Thermostat'],
    correct: [0, 2, 4],
  },
  {
    id: 'q3',
    question: 'Explain the importance of regular HVAC maintenance.',
    type: 'text',
  },
];

export function TrainingModulePage() {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<any>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const module = moduleContent[moduleId as keyof typeof moduleContent];
  
  if (!module) {
    return <div>Module not found</div>;
  }

  const currentSectionData = module.sections[currentSection];
  const progress = (completedSections.length / module.sections.length) * 100;

  const handleMarkComplete = () => {
    if (!completedSections.includes(currentSectionData.id)) {
      setCompletedSections([...completedSections, currentSectionData.id]);
      toast.success('Section completed!');
    }
    
    if (currentSection < module.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      toast.success('Module completed! 🎉');
      setTimeout(() => {
        navigate(`/enduser/training/course/${courseId}`);
      }, 1500);
    }
  };

  const handleQuizSubmit = () => {
    let score = 0;
    
    // Check multiple choice
    if (quizAnswers.q1 === quizQuestions[0].correct) {
      score += 33;
    }
    
    // Check checkboxes
    const q2Answer = quizAnswers.q2 || [];
    const q2Correct = quizQuestions[1].correct as number[];
    if (JSON.stringify(q2Answer.sort()) === JSON.stringify(q2Correct.sort())) {
      score += 33;
    }
    
    // Text answer (auto-pass if filled)
    if (quizAnswers.q3 && quizAnswers.q3.length > 20) {
      score += 34;
    }
    
    setQuizScore(score);
    setQuizSubmitted(true);
    
    if (score >= 70) {
      toast.success(`Great job! You scored ${score}%`);
      handleMarkComplete();
    } else {
      toast.error(`Score: ${score}%. You need 70% to pass. Please try again.`);
    }
  };

  const handleCheckboxChange = (questionId: string, optionIndex: number) => {
    const current = quizAnswers[questionId] || [];
    const newValue = current.includes(optionIndex)
      ? current.filter((i: number) => i !== optionIndex)
      : [...current, optionIndex];
    setQuizAnswers({ ...quizAnswers, [questionId]: newValue });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate(`/enduser/training/course/${courseId}`)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course
        </Button>
        <Badge variant="secondary">
          Section {currentSection + 1} of {module.sections.length}
        </Badge>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{module.title}</h3>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex items-center gap-2 mt-3 text-sm text-slate-600 dark:text-slate-400">
            <Clock className="w-4 h-4" />
            {module.duration}
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            {currentSectionData.type === 'video' && (
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-blue-600" />
              </div>
            )}
            {currentSectionData.type === 'text' && (
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            )}
            {currentSectionData.type === 'quiz' && (
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            )}
            <div>
              <CardTitle>{currentSectionData.title}</CardTitle>
              <CardDescription>{currentSectionData.duration}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentSectionData.type === 'video' && (
            <div>
              <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center text-white">
                  <PlayCircle className="w-16 h-16 mx-auto mb-2 opacity-70" />
                  <p className="text-sm opacity-70">Video Player Simulation</p>
                  <p className="text-xs opacity-50 mt-1">{currentSectionData.title}</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                {currentSectionData.content}
              </p>
            </div>
          )}

          {currentSectionData.type === 'text' && (
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentSectionData.content}
              </p>
              <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  <strong>💡 Key Takeaway:</strong> Understanding these fundamental components
                  will help you identify issues and perform basic maintenance tasks.
                </p>
              </div>
            </div>
          )}

          {currentSectionData.type === 'quiz' && !quizSubmitted && (
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-800 dark:text-green-400">
                  <strong>Knowledge Check:</strong> Answer the following questions to complete this module.
                  You need 70% to pass.
                </p>
              </div>

              {/* Question 1 - Multiple Choice */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">1. {quizQuestions[0].question}</Label>
                <RadioGroup
                  value={quizAnswers.q1?.toString()}
                  onValueChange={(value) =>
                    setQuizAnswers({ ...quizAnswers, q1: parseInt(value) })
                  }
                >
                  {quizQuestions[0].options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`q1-${index}`} />
                      <Label htmlFor={`q1-${index}`} className="font-normal cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Question 2 - Checkboxes */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">2. {quizQuestions[1].question}</Label>
                <div className="space-y-2">
                  {quizQuestions[1].options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`q2-${index}`}
                        checked={(quizAnswers.q2 || []).includes(index)}
                        onCheckedChange={() => handleCheckboxChange('q2', index)}
                      />
                      <Label htmlFor={`q2-${index}`} className="font-normal cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question 3 - Text */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">3. {quizQuestions[2].question}</Label>
                <Textarea
                  placeholder="Type your answer here (minimum 20 characters)..."
                  rows={4}
                  value={quizAnswers.q3 || ''}
                  onChange={(e) =>
                    setQuizAnswers({ ...quizAnswers, q3: e.target.value })
                  }
                />
              </div>

              <Button onClick={handleQuizSubmit} className="w-full" size="lg">
                Submit Quiz
              </Button>
            </div>
          )}

          {currentSectionData.type === 'quiz' && quizSubmitted && (
            <div className="text-center py-8">
              <div
                className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  quizScore >= 70
                    ? 'bg-green-100 dark:bg-green-900/20'
                    : 'bg-red-100 dark:bg-red-900/20'
                }`}
              >
                {quizScore >= 70 ? (
                  <CheckCircle className="w-10 h-10 text-green-600" />
                ) : (
                  <Award className="w-10 h-10 text-red-600" />
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2">Quiz Score: {quizScore}%</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {quizScore >= 70
                  ? 'Excellent work! You passed the quiz.'
                  : 'You need 70% to pass. Please review the material and try again.'}
              </p>
              {quizScore < 70 && (
                <Button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setQuizAnswers({});
                  }}
                >
                  Retry Quiz
                </Button>
              )}
            </div>
          )}

          {/* Navigation */}
          {currentSectionData.type !== 'quiz' && (
            <div className="flex items-center justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button onClick={handleMarkComplete}>
                {currentSection === module.sections.length - 1 ? (
                  <>
                    Complete Module
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next Section
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Module Sections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {module.sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(index)}
                className={`w-full p-3 rounded-lg border text-left transition-all ${
                  currentSection === index
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {completedSections.includes(section.id) ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                    )}
                    <div>
                      <p className="font-medium">{section.title}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {section.duration}
                      </p>
                    </div>
                  </div>
                  {currentSection === index && (
                    <Badge variant="secondary">Current</Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
