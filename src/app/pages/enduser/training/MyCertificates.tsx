import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Award, Download, Share2, Calendar, CheckCircle, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

const certificates = [
  {
    id: 'CERT-001',
    courseTitle: 'HVAC Fundamentals Training',
    issueDate: '2026-02-10',
    expiryDate: '2027-02-10',
    score: 95,
    category: 'HVAC',
    instructor: 'John Martinez',
    hours: 2.5,
  },
  {
    id: 'CERT-002',
    courseTitle: 'Electrical Safety Procedures',
    issueDate: '2026-02-05',
    expiryDate: '2027-02-05',
    score: 88,
    category: 'Electrical',
    instructor: 'Sarah Johnson',
    hours: 3,
  },
  {
    id: 'CERT-003',
    courseTitle: 'Building Automation Systems',
    issueDate: '2026-01-28',
    expiryDate: '2027-01-28',
    score: 92,
    category: 'Technology',
    instructor: 'David Chen',
    hours: 4,
  },
];

export function MyCertificates() {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  const handleDownload = (certId: string, title: string) => {
    toast.success(`Downloading certificate for "${title}"`);
  };

  const handleShare = (certId: string) => {
    toast.success('Certificate link copied to clipboard!');
  };

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) {
      return { status: 'expired', color: 'text-red-600', days: Math.abs(daysUntilExpiry) };
    } else if (daysUntilExpiry < 30) {
      return { status: 'expiring-soon', color: 'text-orange-600', days: daysUntilExpiry };
    }
    return { status: 'valid', color: 'text-green-600', days: daysUntilExpiry };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Certificates</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          View and download your earned training certificates
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Certificates</p>
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">{certificates.length}</p>
            <p className="text-xs text-green-600 mt-1">All valid</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Training Hours</p>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold">
              {certificates.reduce((acc, c) => acc + c.hours, 0)}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Average Score</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">
              {Math.round(certificates.reduce((acc, c) => acc + c.score, 0) / certificates.length)}%
            </p>
            <p className="text-xs text-green-600 mt-1">Excellent</p>
          </CardContent>
        </Card>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {certificates.map((cert) => {
          const expiryStatus = getExpiryStatus(cert.expiryDate);
          
          return (
            <Card
              key={cert.id}
              className={`relative overflow-hidden hover:shadow-lg transition-all cursor-pointer ${
                selectedCertificate === cert.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedCertificate(cert.id)}
            >
              {/* Certificate Design */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-bl-full opacity-50" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-100 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-tr-full opacity-50" />
              
              <CardContent className="relative p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg">
                    <Award className="w-8 h-8" />
                  </div>
                  <Badge variant="secondary">{cert.category}</Badge>
                </div>

                {/* Certificate ID */}
                <div className="mb-3">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Certificate ID</p>
                  <p className="font-mono font-semibold text-lg">{cert.id}</p>
                </div>

                {/* Course Title */}
                <h3 className="text-xl font-bold mb-4">{cert.courseTitle}</h3>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Issue Date</p>
                    <p className="font-medium">
                      {new Date(cert.issueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Expiry Date</p>
                    <p className={`font-medium ${expiryStatus.color}`}>
                      {new Date(cert.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Score</p>
                    <p className="font-medium text-green-600">{cert.score}%</p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Duration</p>
                    <p className="font-medium">{cert.hours} hours</p>
                  </div>
                </div>

                {/* Expiry Warning */}
                {expiryStatus.status === 'expiring-soon' && (
                  <div className="mb-4 p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                    <p className="text-sm text-orange-800 dark:text-orange-400">
                      ⚠️ Expires in {expiryStatus.days} days. Consider renewing soon.
                    </p>
                  </div>
                )}

                {/* Instructor */}
                <div className="mb-4 pb-4 border-b">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Instructor</p>
                  <p className="font-medium">{cert.instructor}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(cert.id, cert.courseTitle);
                    }}
                    className="flex-1"
                    variant="outline"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(cert.id);
                    }}
                    className="flex-1"
                    variant="outline"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {certificates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Award className="w-16 h-16 mx-auto mb-4 text-slate-400" />
            <h3 className="text-xl font-semibold mb-2">No certificates yet</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Complete training courses to earn certificates
            </p>
            <Button>Browse Training Courses</Button>
          </CardContent>
        </Card>
      )}

      {/* Certificate Preview Modal (Selected) */}
      {selectedCertificate && (
        <Card className="border-2 border-blue-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Certificate Preview</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCertificate(null)}
              >
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-lg border-4 border-double border-blue-600 text-center">
              <div className="mb-6">
                <Award className="w-20 h-20 mx-auto text-blue-600 mb-4" />
                <h2 className="text-3xl font-bold mb-2">Certificate of Completion</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  This certifies that
                </p>
              </div>
              
              <div className="mb-6">
                <p className="text-2xl font-bold mb-4">John Doe</p>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  has successfully completed
                </p>
                <p className="text-xl font-semibold">
                  {certificates.find((c) => c.id === selectedCertificate)?.courseTitle}
                </p>
              </div>

              <div className="flex justify-center gap-12 mb-6 text-sm">
                <div>
                  <p className="text-slate-600 dark:text-slate-400">Date</p>
                  <p className="font-medium">
                    {new Date(
                      certificates.find((c) => c.id === selectedCertificate)?.issueDate || ''
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400">Score</p>
                  <p className="font-medium text-green-600">
                    {certificates.find((c) => c.id === selectedCertificate)?.score}%
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400">Certificate ID</p>
                  <p className="font-mono font-medium">{selectedCertificate}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Catalyst Facility Management Digital Solutions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
