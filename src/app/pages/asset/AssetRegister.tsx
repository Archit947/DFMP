import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { toast } from 'sonner';

export function AssetRegister() {
  const navigate = useNavigate();
  const [assetName, setAssetName] = useState('');
  const [category, setCategory] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [location, setLocation] = useState('');
  const [building, setBuilding] = useState('');
  const [floor, setFloor] = useState('');
  const [installDate, setInstallDate] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [warrantyEnd, setWarrantyEnd] = useState('');
  const [criticality, setCriticality] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !assetName ||
      !category ||
      !manufacturer ||
      !model ||
      !serialNumber ||
      !location ||
      !installDate ||
      !purchasePrice ||
      !criticality
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Asset registered successfully');
    setTimeout(() => {
      navigate('/asset');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/asset">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Register New Asset</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Add a new asset to the facility management system
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the asset's basic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="asset-name">Asset Name *</Label>
                <Input
                  id="asset-name"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  placeholder="HVAC Unit - Building A"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hvac">HVAC</SelectItem>
                    <SelectItem value="power">Power & Electrical</SelectItem>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="transport">Transportation</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="fire-safety">Fire Safety</SelectItem>
                    <SelectItem value="lighting">Lighting</SelectItem>
                    <SelectItem value="it-equipment">IT Equipment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="manufacturer">Manufacturer *</Label>
                <Input
                  id="manufacturer"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  placeholder="Carrier"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="AquaSnap 30RBP080"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serial-number">Serial Number *</Label>
                <Input
                  id="serial-number"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder="CAR-2023-RBP-45678"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="criticality">Criticality Level *</Label>
                <Select value={criticality} onValueChange={setCriticality}>
                  <SelectTrigger id="criticality">
                    <SelectValue placeholder="Select criticality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Additional details about the asset..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Location Information */}
        <Card>
          <CardHeader>
            <CardTitle>Location Information</CardTitle>
            <CardDescription>Specify where the asset is installed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="building">Building *</Label>
                <Select value={building} onValueChange={setBuilding}>
                  <SelectTrigger id="building">
                    <SelectValue placeholder="Select building" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="building-a">Building A</SelectItem>
                    <SelectItem value="building-b">Building B</SelectItem>
                    <SelectItem value="building-c">Building C</SelectItem>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="floor">Floor</Label>
                <Select value={floor} onValueChange={setFloor}>
                  <SelectTrigger id="floor">
                    <SelectValue placeholder="Select floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basement">Basement</SelectItem>
                    <SelectItem value="ground">Ground Floor</SelectItem>
                    <SelectItem value="1">1st Floor</SelectItem>
                    <SelectItem value="2">2nd Floor</SelectItem>
                    <SelectItem value="3">3rd Floor</SelectItem>
                    <SelectItem value="roof">Roof</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Specific Location *</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Room 204, North Wing"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial & Warranty Information */}
        <Card>
          <CardHeader>
            <CardTitle>Financial & Warranty Information</CardTitle>
            <CardDescription>Purchase and warranty details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="install-date">Install Date *</Label>
                <Input
                  id="install-date"
                  type="date"
                  value={installDate}
                  onChange={(e) => setInstallDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchase-price">Purchase Price (USD) *</Label>
                <Input
                  id="purchase-price"
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  placeholder="45000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="warranty-end">Warranty End Date</Label>
                <Input
                  id="warranty-end"
                  type="date"
                  value={warrantyEnd}
                  onChange={(e) => setWarrantyEnd(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents & Photos */}
        <Card>
          <CardHeader>
            <CardTitle>Documents & Photos</CardTitle>
            <CardDescription>Upload relevant files and images</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Asset Photos</Label>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto text-slate-400 mb-2" />
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Click to upload or drag and drop
                </p>
                <Button variant="outline" type="button">
                  Select Photos
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Documents (Manuals, Certificates, etc.)</Label>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto text-slate-400 mb-2" />
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Click to upload or drag and drop
                </p>
                <Button variant="outline" type="button">
                  Select Files
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Initial Maintenance Schedule</CardTitle>
            <CardDescription>Set up the first maintenance schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-maintenance">First Maintenance Date</Label>
                <Input id="first-maintenance" type="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenance-frequency">Maintenance Frequency</Label>
                <Select>
                  <SelectTrigger id="maintenance-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maintenance-notes">Maintenance Notes</Label>
              <Textarea
                id="maintenance-notes"
                placeholder="Special instructions or requirements..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-2">
          <Link to="/asset">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Register Asset
          </Button>
        </div>
      </form>
    </div>
  );
}
