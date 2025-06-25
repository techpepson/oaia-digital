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
import NotFound from "./pages/NotFound";

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
          <Route path="/create-invoice" element={<CreateInvoice />} />
          <Route path="/contractor/invoices" element={<InvoiceList />} />
          <Route path="/contractor/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
