// OAIA Digital - Auditor Audit Reports
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
  FileText,
  Download,
  Search,
  Filter,
  Eye,
  Plus,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  FileSearch,
  Share2,
} from "lucide-react";
import AuditorSidebar from "@/components/AuditorSidebar";

const AuditReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reportType, setReportType] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const predefinedReports = [
    {
      id: "top-advances",
      title: "Top 10 Largest Advances",
      description: "Report of the highest value advance payments in the system",
      type: "financial",
      icon: TrendingUp,
      color: "text-green-600",
      lastGenerated: "2024-01-20",
      frequency: "Weekly",
    },
    {
      id: "aging-report",
      title: "Aging Report - Unpaid Invoices",
      description: "Analysis of overdue and aging unpaid invoices",
      type: "aging",
      icon: Clock,
      color: "text-orange-600",
      lastGenerated: "2024-01-19",
      frequency: "Daily",
    },
    {
      id: "compliance-summary",
      title: "Compliance Summary Report",
      description: "Overall compliance metrics and policy adherence",
      type: "compliance",
      icon: CheckCircle,
      color: "text-blue-600",
      lastGenerated: "2024-01-20",
      frequency: "Monthly",
    },
    {
      id: "exceptions-list",
      title: "Audit Exceptions List",
      description: "List of all flagged items and audit exceptions",
      type: "exceptions",
      icon: AlertTriangle,
      color: "text-red-600",
      lastGenerated: "2024-01-20",
      frequency: "Daily",
    },
    {
      id: "agency-performance",
      title: "Agency Performance Dashboard",
      description: "Performance metrics by government agency",
      type: "performance",
      icon: BarChart3,
      color: "text-purple-600",
      lastGenerated: "2024-01-18",
      frequency: "Weekly",
    },
    {
      id: "budget-variance",
      title: "Budget Variance Analysis",
      description: "Analysis of budget vs actual spending patterns",
      type: "financial",
      icon: PieChart,
      color: "text-indigo-600",
      lastGenerated: "2024-01-17",
      frequency: "Monthly",
    },
  ];

  const customReports = [
    {
      id: "CUST-2024-001",
      title: "Ministry of Health - Q1 Analysis",
      description: "Custom audit report for Ministry of Health Q1 activities",
      createdBy: "Senior Auditor A. Wanjiku",
      dateCreated: "2024-01-15",
      status: "completed",
      findings: 12,
      pages: 45,
    },
    {
      id: "CUST-2024-002",
      title: "Road Fund - Contract Compliance Review",
      description: "Detailed review of Road Fund contract compliance issues",
      createdBy: "Lead Auditor J. Mwangi",
      dateCreated: "2024-01-12",
      status: "in-progress",
      findings: 8,
      pages: 32,
    },
    {
      id: "CUST-2024-003",
      title: "Cross-Agency Duplicate Payment Investigation",
      description:
        "Investigation report on duplicate payments across multiple agencies",
      createdBy: "Audit Team B",
      dateCreated: "2024-01-10",
      status: "draft",
      findings: 15,
      pages: 67,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredPredefined = predefinedReports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = reportType === "all" || report.type === reportType;
    return matchesSearch && matchesType;
  });

  const filteredCustom = customReports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
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
              <span className="text-sm text-oaia-gray">Audit Reports</span>
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
              <FileText className="h-8 w-8 mr-3 text-oaia-blue" />
              Audit Reports
            </h1>
            <p className="text-oaia-gray mt-1">
              Generate, access, and manage audit reports and data extracts
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Search & Filter Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-oaia-gray" />
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Report Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="exceptions">Exceptions</SelectItem>
                    <SelectItem value="aging">Aging Reports</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  New Custom Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pre-defined Reports */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-oaia-blue">
                Pre-defined Audit Reports
              </CardTitle>
              <CardDescription>
                Instantly generate standard audit reports with current data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPredefined.map((report) => (
                  <Card
                    key={report.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <report.icon
                          className={`h-5 w-5 mr-2 ${report.color}`}
                        />
                        {report.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {report.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-oaia-gray">
                            Last Generated:
                          </span>
                          <span>{report.lastGenerated}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-oaia-gray">Frequency:</span>
                          <span>{report.frequency}</span>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <Button size="sm" className="flex-1">
                            <Download className="h-4 w-4 mr-1" />
                            Generate
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-oaia-blue">
                Custom Audit Reports
              </CardTitle>
              <CardDescription>
                User-created reports and specialized investigations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCustom.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <FileSearch className="h-5 w-5 text-oaia-blue" />
                      <div>
                        <div className="font-medium text-lg">
                          {report.title}
                        </div>
                        <div className="text-sm text-oaia-gray">
                          {report.description}
                        </div>
                        <div className="text-sm text-oaia-gray mt-1">
                          Created by {report.createdBy} on {report.dateCreated}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {report.findings} findings
                        </div>
                        <div className="text-sm text-oaia-gray">
                          {report.pages} pages
                        </div>
                      </div>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status.toUpperCase()}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCustom.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-oaia-gray mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No custom reports found
                  </h3>
                  <p className="text-oaia-gray mb-4">
                    Create your first custom audit report to get started.
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Custom Report
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuditReports;
