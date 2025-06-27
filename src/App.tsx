
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ContractorDashboard from "./pages/dashboards/ContractorDashboard";
import AgencyDashboard from "./pages/dashboards/AgencyDashboard";
import MinistryDashboard from "./pages/dashboards/MinistryDashboard";
import AuditorDashboard from "./pages/dashboards/AuditorDashboard";
import CreateInvoice from "./pages/CreateInvoice";
import InvoiceList from "./pages/contractor/InvoiceList";
import Notifications from "./pages/contractor/Notifications";
import AccountSettings from "./pages/contractor/AccountSettings";
import ReportsExports from "./pages/contractor/ReportsExports";
import AdvancesPayments from "./pages/contractor/AdvancesPayments";
import NotFound from "./pages/NotFound";
import PendingInvoices from "./pages/agency/PendingInvoices";
import ApprovedInvoices from "./pages/agency/ApprovedInvoices";
import RejectedInvoices from "./pages/agency/RejectedInvoices";
import Payments from "./pages/agency/Payments";
import FundRequests from "./pages/agency/FundRequests";
import Contracts from "./pages/agency/Contracts";
import Reports from "./pages/agency/Reports";
import AgencyNotifications from "./pages/agency/Notifications";
import Settings from "./pages/agency/Settings";
import Agencies from "./pages/ministry/Agencies";
import FundingManagement from "./pages/ministry/FundingManagement";
import BudgetReports from "./pages/ministry/BudgetReports";
import AuditCases from "./pages/auditor/AuditCases";
import InvoiceRegistry from "./pages/auditor/InvoiceRegistry";
import AnalyticsTools from "./pages/auditor/AnalyticsTools";
import AuditReports from "./pages/auditor/AuditReports";
import AuditorNotifications from "./pages/auditor/AuditorNotifications";
import OaiaAdminDashboard from "./pages/dashboards/OaiaAdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard/contractor" element={
              <ProtectedRoute requiredRole="contractor">
                <ContractorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/agency" element={
              <ProtectedRoute requiredRole="agency">
                <AgencyDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/ministry" element={
              <ProtectedRoute requiredRole="ministry">
                <MinistryDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/auditor" element={
              <ProtectedRoute requiredRole="auditor">
                <AuditorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/oaia-admin" element={
              <ProtectedRoute requiredRole="oaia_admin">
                <OaiaAdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/create-invoice" element={
              <ProtectedRoute requiredRole="contractor">
                <CreateInvoice />
              </ProtectedRoute>
            } />
            <Route path="/contractor/invoices" element={
              <ProtectedRoute requiredRole="contractor">
                <InvoiceList />
              </ProtectedRoute>
            } />
            <Route path="/contractor/notifications" element={
              <ProtectedRoute requiredRole="contractor">
                <Notifications />
              </ProtectedRoute>
            } />
            <Route path="/contractor/settings" element={
              <ProtectedRoute requiredRole="contractor">
                <AccountSettings />
              </ProtectedRoute>
            } />
            <Route path="/contractor/reports" element={
              <ProtectedRoute requiredRole="contractor">
                <ReportsExports />
              </ProtectedRoute>
            } />
            <Route path="/contractor/advances" element={
              <ProtectedRoute requiredRole="contractor">
                <AdvancesPayments />
              </ProtectedRoute>
            } />
            <Route path="/agency/payments" element={
              <ProtectedRoute requiredRole="agency">
                <Payments />
              </ProtectedRoute>
            } />
            <Route path="/agency/fund-requests" element={
              <ProtectedRoute requiredRole="agency">
                <FundRequests />
              </ProtectedRoute>
            } />
            <Route path="/agency/pending-invoices" element={
              <ProtectedRoute requiredRole="agency">
                <PendingInvoices />
              </ProtectedRoute>
            } />
            <Route path="/agency/approved-invoices" element={
              <ProtectedRoute requiredRole="agency">
                <ApprovedInvoices />
              </ProtectedRoute>
            } />
            <Route path="/agency/rejected-invoices" element={
              <ProtectedRoute requiredRole="agency">
                <RejectedInvoices />
              </ProtectedRoute>
            } />
            <Route path="/agency/contracts" element={
              <ProtectedRoute requiredRole="agency">
                <Contracts />
              </ProtectedRoute>
            } />
            <Route path="/agency/reports" element={
              <ProtectedRoute requiredRole="agency">
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/agency/notifications" element={
              <ProtectedRoute requiredRole="agency">
                <AgencyNotifications />
              </ProtectedRoute>
            } />
            <Route path="/agency/settings" element={
              <ProtectedRoute requiredRole="agency">
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/ministry/agencies" element={
              <ProtectedRoute requiredRole="ministry">
                <Agencies />
              </ProtectedRoute>
            } />
            <Route path="/ministry/funding" element={
              <ProtectedRoute requiredRole="ministry">
                <FundingManagement />
              </ProtectedRoute>
            } />
            <Route path="/ministry/reports" element={
              <ProtectedRoute requiredRole="ministry">
                <BudgetReports />
              </ProtectedRoute>
            } />
            <Route path="/auditor/cases" element={
              <ProtectedRoute requiredRole="auditor">
                <AuditCases />
              </ProtectedRoute>
            } />
            <Route path="/auditor/registry" element={
              <ProtectedRoute requiredRole="auditor">
                <InvoiceRegistry />
              </ProtectedRoute>
            } />
            <Route path="/auditor/analytics" element={
              <ProtectedRoute requiredRole="auditor">
                <AnalyticsTools />
              </ProtectedRoute>
            } />
            <Route path="/auditor/reports" element={
              <ProtectedRoute requiredRole="auditor">
                <AuditReports />
              </ProtectedRoute>
            } />
            <Route path="/auditor/notifications" element={
              <ProtectedRoute requiredRole="auditor">
                <AuditorNotifications />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
