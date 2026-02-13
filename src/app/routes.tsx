import { createBrowserRouter, Navigate } from 'react-router';
import { Welcome } from './pages/Welcome';
import { UnifiedLogin } from './pages/UnifiedLogin';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { EndUserLayout } from './layouts/EndUserLayout';

// Admin panels (existing)
import { AdminChecklistHome } from './pages/admin/checklist/AdminChecklistHome';
import { ChecklistBuilder } from './pages/fm-checklist/ChecklistBuilder';
import { InspectionWorkflow } from './pages/fm-checklist/InspectionWorkflow';
import { Reports } from './pages/fm-checklist/Reports';
import AdminTrainingHome from './pages/admin/training/AdminTrainingHome';
import { QRScanner } from './pages/ojt/QRScanner';
import { TrainingDetail } from './pages/ojt/TrainingDetail';
import { OJTAnalytics } from './pages/ojt/OJTAnalytics';
import AdminFleetHome from './pages/admin/fleet/AdminFleetHome';
import { VehicleDetail } from './pages/fleet/VehicleDetail';
import { FleetInspection } from './pages/fleet/FleetInspection';
import { FleetAnalytics } from './pages/fleet/FleetAnalytics';
import AdminAssetHome from './pages/admin/asset/AdminAssetHome';
import { AssetDetail } from './pages/asset/AssetDetail';
import { AssetRegister } from './pages/asset/AssetRegister';
import { WorkOrders } from './pages/asset/WorkOrders';
import { AssetAnalytics } from './pages/asset/AssetAnalytics';

// Project Selection
import { ProjectSelection } from './pages/enduser/ProjectSelection';

// End User - FM Checklist
import { ChecklistDashboard } from './pages/enduser/checklist/ChecklistDashboard';
import { CompleteChecklist } from './pages/enduser/checklist/CompleteChecklist';
import { ChecklistHistory } from './pages/enduser/checklist/ChecklistHistory';
import { ViewChecklistSubmission } from './pages/enduser/checklist/ViewChecklistSubmission';

// End User - Training
import { TrainingDashboard } from './pages/enduser/training/TrainingDashboard';
import { QRScannerPage } from './pages/enduser/training/QRScannerPage';
import { TrainingCoursePage } from './pages/enduser/training/TrainingCoursePage';
import { TrainingModulePage } from './pages/enduser/training/TrainingModulePage';
import { TrainingHistory } from './pages/enduser/training/TrainingHistory';
import { MyCertificates } from './pages/enduser/training/MyCertificates';

// End User - Fleet
import { FleetDashboard } from './pages/enduser/fleet/FleetDashboard';
import { VehicleInspectionForm } from './pages/enduser/fleet/VehicleInspectionForm';
import { MyInspections } from './pages/enduser/fleet/MyInspections';
import { VehicleDetails } from './pages/enduser/fleet/VehicleDetails';

// End User - Asset
import { AssetDashboard } from './pages/enduser/asset/AssetDashboard';
import { CreateWorkOrder } from './pages/enduser/asset/CreateWorkOrder';
import { MyWorkOrders } from './pages/enduser/asset/MyWorkOrders';
import { EquipmentDetails } from './pages/enduser/asset/EquipmentDetails';

// End User route wrapper
function EndUserRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('fm-user') !== null;

  if (!isAuthenticated) {
    return <Navigate to="/project-selection" replace />;
  }

  return <EndUserLayout>{children}</EndUserLayout>;
}

// Admin route wrapper
function AdminRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('fm-user') !== null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Don't wrap in AdminLayout here - just return children
  // AdminLayout will be used as a parent route with Outlet
  return <>{children}</>;
}

export const router = createBrowserRouter([
  // Welcome Page (Landing)
  {
    path: '/',
    element: <Welcome />,
  },
  // Project Selection
  {
    path: '/project-selection',
    element: <ProjectSelection />,
  },
  // Unified Login (User/Admin Toggle)
  {
    path: '/login',
    element: <UnifiedLogin />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },

  // ==========================================
  // ADMIN ROUTES - FM E-CHECKLIST
  // ==========================================
  {
    path: '/admin/checklist',
    element: (
      <AdminRoute>
        <AdminChecklistHome />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/checklist/builder',
    element: (
      <AdminRoute>
        <ChecklistBuilder />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/checklist/inspection/:id',
    element: (
      <AdminRoute>
        <InspectionWorkflow />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/checklist/reports',
    element: (
      <AdminRoute>
        <Reports />
      </AdminRoute>
    ),
  },

  // ==========================================
  // ADMIN ROUTES - OJT TRAINING
  // ==========================================
  {
    path: '/admin/training',
    element: (
      <AdminRoute>
        <AdminTrainingHome />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/training/scanner',
    element: (
      <AdminRoute>
        <QRScanner />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/training/detail/:id',
    element: (
      <AdminRoute>
        <TrainingDetail />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/training/analytics',
    element: (
      <AdminRoute>
        <OJTAnalytics />
      </AdminRoute>
    ),
  },

  // ==========================================
  // ADMIN ROUTES - FLEET MANAGEMENT
  // ==========================================
  {
    path: '/admin/fleet',
    element: (
      <AdminRoute>
        <AdminFleetHome />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/fleet/vehicle/:id',
    element: (
      <AdminRoute>
        <VehicleDetail />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/fleet/inspection/new',
    element: (
      <AdminRoute>
        <FleetInspection />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/fleet/analytics',
    element: (
      <AdminRoute>
        <FleetAnalytics />
      </AdminRoute>
    ),
  },

  // ==========================================
  // ADMIN ROUTES - ASSET MANAGEMENT
  // ==========================================
  {
    path: '/admin/asset',
    element: (
      <AdminRoute>
        <AdminAssetHome />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/asset/item/:id',
    element: (
      <AdminRoute>
        <AssetDetail />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/asset/register',
    element: (
      <AdminRoute>
        <AssetRegister />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/asset/work-orders',
    element: (
      <AdminRoute>
        <WorkOrders />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/asset/analytics',
    element: (
      <AdminRoute>
        <AssetAnalytics />
      </AdminRoute>
    ),
  },

  // ==========================================
  // END USER ROUTES - FM E-CHECKLIST
  // ==========================================
  {
    path: '/enduser/checklist/dashboard',
    element: (
      <EndUserRoute>
        <ChecklistDashboard />
      </EndUserRoute>
    ),
  },
  {
    path: '/enduser/checklist/complete/:id',
    element: (
      <EndUserRoute>
        <CompleteChecklist />
      </EndUserRoute>
    ),
  },
  {
    path: '/enduser/checklist/history',
    element: (
      <EndUserRoute>
        <ChecklistHistory />
      </EndUserRoute>
    ),
  },
  {
    path: '/enduser/checklist/submission/:id',
    element: (
      <EndUserRoute>
        <ViewChecklistSubmission />
      </EndUserRoute>
    ),
  },

  // ==========================================
  // END USER ROUTES - TRAINING
  // ==========================================
  {
    path: '/enduser/training/dashboard',
    element: (
      <EndUserRoute>
        <TrainingDashboard />
      </EndUserRoute>
    ),
  },
  {
    path: '/enduser/training/scanner',
    element: (
      <EndUserRoute>
        <QRScannerPage />
      </EndUserRoute>
    ),
  },
  {
    path: '/enduser/training/course/:id',
    element: (
      <EndUserRoute>
        <TrainingCoursePage />
      </EndUserRoute>
    ),
  },
  {
    path: '/enduser/training/module/:courseId/:moduleId',
    element: (
      <EndUserRoute>
        <TrainingModulePage />
      </EndUserRoute>
    ),
  },
  {
    path: '/enduser/training/history',
    element: (
      <EndUserRoute>
        <TrainingHistory />
      </EndUserRoute>
    ),
  },
  {
    path: '/enduser/training/certificates',
    element: (
      <EndUserRoute>
        <MyCertificates />
      </EndUserRoute>
    ),
  },

  // ==========================================
  // END USER ROUTES - FLEET
  // ==========================================
  {
    path: '/enduser/fleet/dashboard',
    element: (
      <EndUserRoute>
        <FleetDashboard />
      </EndUserRoute>
    ),
  },
  {
    path: '/enduser/fleet/inspect/:vehicleId',
    element: (
      <EndUserRoute>
        <VehicleInspectionForm />
      </EndUserRoute>
    ),
  },
  {
    path: '/enduser/fleet/inspections',
    element: (
      <EndUserRoute>
        <MyInspections />
      </EndUserRoute>
    ),
  },
  {
    path: '/enduser/fleet/vehicle/:id',
    element: (
      <EndUserRoute>
        <VehicleDetails />
      </EndUserRoute>
    ),
  },

  // ==========================================
  // END USER ROUTES - ASSET
  // ==========================================
  {
    path: '/enduser/asset/dashboard',
    element: (
      <EndUserRoute>
        <AssetDashboard />
      </EndUserRoute>
    ),
  },
  {
    path: '/enduser/asset/work-order/new',
    element: (
      <EndUserRoute>
        <CreateWorkOrder />
      </EndUserRoute>
    ),
  },
  {
    path: '/enduser/asset/work-orders',
    element: (
      <EndUserRoute>
        <MyWorkOrders />
      </EndUserRoute>
    ),
  },
  {
    path: '/enduser/asset/equipment/:id',
    element: (
      <EndUserRoute>
        <EquipmentDetails />
      </EndUserRoute>
    ),
  },

  // Catch-all
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
