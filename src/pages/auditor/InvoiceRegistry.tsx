// OAIA Digital - Auditor Invoice Registry
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Logo from "@/components/Logo";
import {
  Database,
  Search,
  Filter,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Building2,
  User,
  Calendar,
  DollarSign,
} from "lucide-react";
import AuditorSidebar from "@/components/AuditorSidebar";

const InvoiceRegistry = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [agencyFilter, setAgencyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const invoices = [
    {
      id: "INV-2024-001",
      contractor: "ABC Construction Ltd",
      contractorId: "C001",
      agency: "Ministry of Health",
      amount: "GHS 450,000",
      contractValue: "GHS 500,000",
      description: "Medical equipment installation",
      dateSubmitted: "2024-01-15",
      status: "approved",
      riskLevel: "low",
      auditStatus: "cleared",
      paymentDate: "2024-01-20",
      flags: [],
    },
    {
      id: "INV-2024-002",
      contractor: "Tech Solutions Inc",
      contractorId: "C002",
      agency: "Ministry of Education",
      amount: "GHS 125,000",
      contractValue: "GHS 200,000",
      description: "Software licensing and support",
      dateSubmitted: "2024-01-12",
      status: "pending",
      riskLevel: "medium",
      auditStatus: "under-review",
      paymentDate: null,
      flags: ["potential-duplicate"],
    },
    {
      id: "INV-2024-003",
      contractor: "Road Works Ltd",
      contractorId: "C003",
      agency: "Road Fund",
      amount: "GHS 890,000",
      contractValue: "GHS 800,000",
      description: "Highway maintenance project",
      dateSubmitted: "2024-01-14",
      status: "flagged",
      riskLevel: "high",
      auditStatus: "investigating",
      paymentDate: null,
      flags: ["exceeds-contract", "unusual-pattern"],
    },
    {
      id: "INV-2024-004",
      contractor: "Green Energy Corp",
      contractorId: "C004",
      agency: "Ministry of Energy",
      amount: "GHS 2,100,000",
      contractValue: "GHS 2,500,000",
      description: "Solar panel installation",
      dateSubmitted: "2024-01-10",
      status: "approved",
      riskLevel: "medium",
      auditStatus: "cleared",
      paymentDate: "2024-01-18",
      flags: [],
    },
    {
      id: "INV-2024-005",
      contractor: "Water Systems Ltd",
      contractorId: "C005",
      agency: "Water Department",
      amount: "GHS 675,000",
      contractValue: "GHS 700,000",
      description: "Water treatment facility upgrade",
      dateSubmitted: "2024-01-16",
      status: "processing",
      riskLevel: "low",
      auditStatus: "pending",
      paymentDate: null,
      flags: [],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "flagged":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "processing":
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "flagged":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAuditStatusColor = (auditStatus: string) => {
    switch (auditStatus) {
      case "cleared":
        return "bg-green-100 text-green-800";
      case "under-review":
        return "bg-yellow-100 text-yellow-800";
      case "investigating":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.contractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.agency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAgency =
      agencyFilter === "all" ||
      invoice.agency.toLowerCase().includes(agencyFilter.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || invoice.status === statusFilter;
    const matchesRisk =
      riskFilter === "all" || invoice.riskLevel === riskFilter;

    return matchesSearch && matchesAgency && matchesStatus && matchesRisk;
  });

  return (
    <div className="min-h-screen bg-oaia-light flex">
      <AuditorSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((c) => !c)}
      />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/dashboard/auditor">
              <Logo />
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-oaia-gray">Invoice Registry</span>
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard/auditor">Back to Dashboard</Link>
              </Button>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8 flex-1">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Database className="h-8 w-8 mr-3 text-oaia-blue" />
              Invoice Registry
            </h1>
            <p className="text-oaia-gray mt-1">
              Complete ledger of all invoices and payments (Read-Only Access)
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray">
                  Total Invoices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-oaia-blue">
                  {invoices.length}
                </div>
                <div className="text-sm text-oaia-gray">All time</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray">
                  Flagged Invoices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {invoices.filter((inv) => inv.status === "flagged").length}
                </div>
                <div className="text-sm text-oaia-gray">
                  Requiring attention
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray">
                  Total Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  GHS 4.2M
                </div>
                <div className="text-sm text-oaia-gray">Approved invoices</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray">
                  Under Investigation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {
                    invoices.filter(
                      (inv) => inv.auditStatus === "investigating"
                    ).length
                  }
                </div>
                <div className="text-sm text-oaia-gray">Active cases</div>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Advanced Search & Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-oaia-gray" />
                  <Input
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={agencyFilter} onValueChange={setAgencyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Agency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agencies</SelectItem>
                    <SelectItem value="health">Ministry of Health</SelectItem>
                    <SelectItem value="education">
                      Ministry of Education
                    </SelectItem>
                    <SelectItem value="energy">Ministry of Energy</SelectItem>
                    <SelectItem value="road">Road Fund</SelectItem>
                    <SelectItem value="water">Water Department</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Invoice Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Risk Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Invoice List */}
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <Card
                key={invoice.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      {getStatusIcon(invoice.status)}
                      <div>
                        <h3 className="text-lg font-medium text-oaia-blue">
                          {invoice.id}
                        </h3>
                        <p className="text-sm text-oaia-gray">
                          {invoice.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge className={getRiskColor(invoice.riskLevel)}>
                        {invoice.riskLevel.toUpperCase()} RISK
                      </Badge>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status.toUpperCase()}
                      </Badge>
                      <Badge
                        className={getAuditStatusColor(invoice.auditStatus)}
                      >
                        {invoice.auditStatus.replace("-", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 mr-2 text-oaia-gray" />
                        <span className="text-oaia-gray">Contractor:</span>
                      </div>
                      <div className="font-medium">{invoice.contractor}</div>
                      <div className="text-sm text-oaia-gray">
                        ID: {invoice.contractorId}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Building2 className="h-4 w-4 mr-2 text-oaia-gray" />
                        <span className="text-oaia-gray">Agency:</span>
                      </div>
                      <div className="font-medium">{invoice.agency}</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 mr-2 text-oaia-gray" />
                        <span className="text-oaia-gray">Amount:</span>
                      </div>
                      <div className="font-medium">{invoice.amount}</div>
                      <div className="text-sm text-oaia-gray">
                        Contract: {invoice.contractValue}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-oaia-gray" />
                        <span className="text-oaia-gray">Submitted:</span>
                      </div>
                      <div className="font-medium">{invoice.dateSubmitted}</div>
                      {invoice.paymentDate && (
                        <div className="text-sm text-green-600">
                          Paid: {invoice.paymentDate}
                        </div>
                      )}
                    </div>
                  </div>

                  {invoice.flags.length > 0 && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                      <div className="flex items-center text-sm font-medium text-red-800 mb-1">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Audit Flags:
                      </div>
                      <div className="text-sm text-red-700">
                        {invoice.flags
                          .map((flag) => flag.replace("-", " "))
                          .join(", ")}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex justify-end">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredInvoices.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Database className="h-12 w-12 mx-auto text-oaia-gray mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No invoices found
                </h3>
                <p className="text-oaia-gray">
                  Try adjusting your search criteria.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceRegistry;
