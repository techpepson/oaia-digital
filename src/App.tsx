import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard/contractor" element={<ContractorDashboard />} />
          <Route path="/dashboard/agency" element={<AgencyDashboard />} />
          <Route path="/dashboard/ministry" element={<MinistryDashboard />} />
          <Route path="/dashboard/auditor" element={<AuditorDashboard />} />
          <Route path="/dashboard/oaia-admin" element={<OaiaAdminDashboard />} />
          <Route path="/create-invoice" element={<CreateInvoice />} />
          <Route path="/contractor/invoices" element={<InvoiceList />} />
          <Route path="/contractor/notifications" element={<Notifications />} />
          <Route path="/contractor/settings" element={<AccountSettings />} />
          <Route path="/contractor/reports" element={<ReportsExports />} />
          <Route path="/contractor/advances" element={<AdvancesPayments />} />
          <Route path="/agency/payments" element={<Payments />} />
          <Route path="/agency/fund-requests" element={<FundRequests />} />
          <Route path="/agency/pending-invoices" element={<PendingInvoices />} />
          <Route path="/agency/approved-invoices" element={<ApprovedInvoices />} />
          <Route path="/agency/rejected-invoices" element={<RejectedInvoices />} />
          <Route path="/agency/contracts" element={<Contracts />} />
          <Route path="/agency/reports" element={<Reports />} />
          <Route path="/agency/notifications" element={<AgencyNotifications />} />
          <Route path="/agency/settings" element={<Settings />} />
          <Route path="/ministry/agencies" element={<Agencies />} />
          <Route path="/ministry/funding" element={<FundingManagement />} />
          <Route path="/ministry/reports" element={<BudgetReports />} />
          <Route path="/auditor/cases" element={<AuditCases />} />
          <Route path="/auditor/registry" element={<InvoiceRegistry />} />
          <Route path="/auditor/analytics" element={<AnalyticsTools />} />
          <Route path="/auditor/reports" element={<AuditReports />} />
          <Route path="/auditor/notifications" element={<AuditorNotifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
