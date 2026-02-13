import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { ArrowLeft, Camera, QrCode, Scan, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function QRScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleStartScan = () => {
    setScanning(true);
    // Simulate QR scan after 2 seconds
    setTimeout(() => {
      const mockTrainingId = 'TR-002';
      setScannedCode(mockTrainingId);
      toast.success('QR Code scanned successfully!');
      setScanning(false);
      
      // Navigate to training after 1 second
      setTimeout(() => {
        navigate(`/enduser/training/course/${mockTrainingId}`);
      }, 1000);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/enduser/training/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">QR Code Scanner</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Scan a QR code to access training materials
          </p>
        </div>
      </div>

      {/* Scanner Card */}
      <Card>
        <CardHeader>
          <CardTitle>Scan Training QR Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scanner Area */}
          <div className="aspect-square max-w-md mx-auto bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {scanning ? (
              <>
                <div className="absolute inset-0 border-4 border-purple-600 rounded-xl animate-pulse" />
                <Scan className="w-24 h-24 text-purple-600 animate-pulse" />
                <p className="text-lg font-medium mt-4">Scanning...</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Position QR code in view
                </p>
              </>
            ) : scannedCode ? (
              <>
                <QrCode className="w-24 h-24 text-green-600" />
                <p className="text-lg font-medium mt-4 text-green-600">Code Scanned!</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Redirecting to training...
                </p>
                <Badge className="mt-4 bg-green-100 text-green-800">
                  {scannedCode}
                </Badge>
              </>
            ) : (
              <>
                <QrCode className="w-24 h-24 text-slate-400" />
                <p className="text-lg font-medium mt-4">Ready to Scan</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                  Click the button below to start scanning
                </p>
              </>
            )}
          </div>

          {/* Action Button */}
          {!scannedCode && (
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="lg"
              onClick={handleStartScan}
              disabled={scanning}
            >
              <Camera className="w-5 h-5 mr-2" />
              {scanning ? 'Scanning...' : 'Start QR Scan'}
            </Button>
          )}

          {/* Instructions */}
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-400 space-y-2">
                <p className="font-medium">How to scan:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Find the QR code on training equipment or materials</li>
                  <li>Position your device camera to clearly view the code</li>
                  <li>Wait for automatic detection and training access</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Manual Entry */}
          <div className="text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Can't scan? Enter code manually
            </p>
            <Link to="/enduser/training/dashboard">
              <Button variant="outline" size="sm">
                Enter Code Manually
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
