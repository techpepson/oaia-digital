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
import BankDetails from "./pages/contractor/BankDetails";
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
import MinistryNotifications from "./pages/ministry/Notifications";
import MinistrySettings from "./pages/ministry/Settings";
import AuditorSettings from "./pages/auditor/Settings";
import AgencySelection from "./pages/AgencySelection";
import OaDashboard from "./pages/dashboards/OaDashboard";
import ReportsAnalytics from "./pages/ministry/ReportsAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/agency-selection" element={<AgencySelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Custom URLs for different agency types */}
          <Route path="/agency/getfund" element={<Login />} />
          <Route path="/agency/nhis" element={<Login />} />
          <Route path="/agency/roadfund" element={<Login />} />
          <Route path="/agency/ministry-health" element={<Login />} />
          <Route path="/agency/ministry-education" element={<Login />} />
          <Route path="/agency/ministry-transport" element={<Login />} />
          <Route path="/agency/ministry-works" element={<Login />} />
          <Route path="/agency/ministry-water" element={<Login />} />
          <Route path="/mof" element={<Login />} />
          <Route path="/ag" element={<Login />} />
          <Route path="/oa" element={<Login />} />
          <Route
            path="/dashboard/contractor"
            element={<ContractorDashboard />}
          />
          <Route path="/dashboard/agency" element={<AgencyDashboard />} />
          <Route path="/dashboard/ministry" element={<MinistryDashboard />} />
          <Route path="/dashboard/auditor" element={<AuditorDashboard />} />
          <Route
            path="/dashboard/oaia-admin"
            element={<OaiaAdminDashboard />}
          />
          <Route path="/create-invoice" element={<CreateInvoice />} />
          <Route path="/contractor/invoices" element={<InvoiceList />} />
          <Route path="/contractor/notifications" element={<Notifications />} />
          <Route path="/contractor/settings" element={<AccountSettings />} />
          <Route path="/contractor/reports" element={<ReportsExports />} />
          <Route path="/contractor/advances" element={<AdvancesPayments />} />
          <Route path="/contractor/bank-details" element={<BankDetails />} />
          <Route path="/agency/payments" element={<Payments />} />
          <Route path="/agency/fund-requests" element={<FundRequests />} />
          <Route
            path="/agency/pending-invoices"
            element={<PendingInvoices />}
          />
          <Route
            path="/agency/approved-invoices"
            element={<ApprovedInvoices />}
          />
          <Route
            path="/agency/rejected-invoices"
            element={<RejectedInvoices />}
          />
          <Route path="/agency/contracts" element={<Contracts />} />
          <Route path="/agency/reports" element={<Reports />} />
          <Route
            path="/agency/notifications"
            element={<AgencyNotifications />}
          />
          <Route path="/agency/settings" element={<Settings />} />
          <Route path="/ministry/agencies" element={<Agencies />} />
          <Route path="/ministry/funding" element={<FundingManagement />} />
          <Route path="/ministry/reports" element={<ReportsAnalytics />} />
          <Route path="/auditor/cases" element={<AuditCases />} />
          <Route path="/auditor/registry" element={<InvoiceRegistry />} />
          <Route path="/auditor/analytics" element={<AnalyticsTools />} />
          <Route path="/auditor/reports" element={<AuditReports />} />
          <Route
            path="/auditor/notifications"
            element={<AuditorNotifications />}
          />
          <Route
            path="/ministry/notifications"
            element={<MinistryNotifications />}
          />
          <Route path="/ministry/settings" element={<MinistrySettings />} />
          <Route path="/auditor/settings" element={<AuditorSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
