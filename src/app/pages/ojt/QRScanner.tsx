import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, QrCode, Camera, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function QRScanner() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<{
    title: string;
    type: string;
    location: string;
    description: string;
  } | null>(null);

  const startScan = () => {
    setScanning(true);
    // Simulate QR scan
    setTimeout(() => {
      setScannedData({
        title: 'Emergency Equipment Training - Station A',
        type: 'Safety Training',
        location: 'Building A - Floor 2',
        description: 'Complete safety equipment operation training and assessment',
      });
      setScanning(false);
      toast.success('QR Code scanned successfully');
    }, 2000);
  };

  const handleStartTraining = () => {
    navigate('/ojt/training/1');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/ojt')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">QR Code Scanner</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Scan to access training materials
          </p>
        </div>
      </div>

      {/* Scanner */}
      {!scannedData ? (
        <Card>
          <CardContent className="p-12">
            <div className="text-center space-y-6">
              <div className="w-48 h-48 mx-auto border-4 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex items-center justify-center">
                {scanning ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm text-slate-600 dark:text-slate-400">Scanning...</p>
                  </div>
                ) : (
                  <QrCode className="w-24 h-24 text-slate-400" />
                )}
              </div>

              {!scanning && (
                <>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Position QR Code in Frame</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Place the QR code within the frame to scan
                    </p>
                  </div>

                  <Button size="lg" onClick={startScan} className="gap-2">
                    <Camera className="w-5 h-5" />
                    Start Scanning
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <CardTitle>QR Code Recognized</CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400">Training module found</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{scannedData.title}</h3>
                <div className="flex gap-2">
                  <Badge>{scannedData.type}</Badge>
                  <Badge variant="outline">{scannedData.location}</Badge>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400">{scannedData.description}</p>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                      Prerequisites
                    </p>
                    <ul className="text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• Basic safety orientation completed</li>
                      <li>• PPE equipment available</li>
                      <li>• Supervisor approval required</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Duration</p>
                  <p className="text-lg font-semibold">2 hours</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Modules</p>
                  <p className="text-lg font-semibold">5 sections</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Assessment</p>
                  <p className="text-lg font-semibold">Required</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Certification</p>
                  <p className="text-lg font-semibold">Yes</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setScannedData(null);
                  setScanning(false);
                }}
                className="flex-1"
              >
                Scan Again
              </Button>
              <Button onClick={handleStartTraining} className="flex-1">
                Start Training
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Scans */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { title: 'Fire Safety Equipment', date: '2 hours ago', status: 'Completed' },
              { title: 'Chemical Handling SOP', date: '1 day ago', status: 'In Progress' },
              { title: 'Forklift Operation', date: '3 days ago', status: 'Completed' },
            ].map((scan, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800"
              >
                <div>
                  <p className="font-medium">{scan.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{scan.date}</p>
                </div>
                <Badge variant={scan.status === 'Completed' ? 'default' : 'secondary'}>
                  {scan.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
