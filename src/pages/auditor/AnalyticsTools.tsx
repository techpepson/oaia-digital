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
  BarChart3,
  TrendingUp,
  Search,
  Target,
  AlertTriangle,
  Eye,
  Download,
  Filter,
  Zap,
  PieChart,
  LineChart,
  Activity,
  Database,
  FileSearch,
  Settings,
} from "lucide-react";
import AuditorSidebar from "@/components/AuditorSidebar";

const AnalyticsTools = () => {
  const [analysisType, setAnalysisType] = useState("");
  const [dateRange, setDateRange] = useState("last-30-days");
  const [agency, setAgency] = useState("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const analyticsTools = [
    {
      id: "duplicate-detection",
      title: "Duplicate Payment Detection",
      description:
        "AI-powered detection of potential duplicate invoices and payments",
      icon: Target,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      results: "8 potential duplicates found",
      lastRun: "2 hours ago",
    },
    {
      id: "amount-analysis",
      title: "Amount Threshold Analysis",
      description:
        "Identify invoices exceeding contract values or unusual amounts",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      results: "12 threshold violations",
      lastRun: "1 day ago",
    },
    {
      id: "pattern-analysis",
      title: "Payment Pattern Analysis",
      description: "Detect unusual payment patterns and frequency anomalies",
      icon: Activity,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      results: "5 unusual patterns",
      lastRun: "6 hours ago",
    },
    {
      id: "risk-heatmap",
      title: "Risk Assessment Heatmap",
      description: "Visual heatmap of high-risk contractors and agencies",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      results: "3 high-risk entities",
      lastRun: "4 hours ago",
    },
    {
      id: "timeline-analysis",
      title: "Invoice Timeline Analysis",
      description: "Analyze processing times and identify bottlenecks",
      icon: LineChart,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      results: "Avg. 5.2 days processing",
      lastRun: "3 hours ago",
    },
    {
      id: "compliance-analysis",
      title: "Compliance Checker",
      description: "Automated compliance verification against policies",
      icon: FileSearch,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      results: "94.2% compliance rate",
      lastRun: "1 hour ago",
    },
  ];

  const recentAnalyses = [
    {
      id: "ANA-2024-001",
      type: "Duplicate Detection",
      agency: "Ministry of Health",
      dateRun: "2024-01-20 14:30",
      findings: 3,
      status: "completed",
      risk: "high",
    },
    {
      id: "ANA-2024-002",
      type: "Amount Analysis",
      agency: "Road Fund",
      dateRun: "2024-01-20 10:15",
      findings: 7,
      status: "completed",
      risk: "medium",
    },
    {
      id: "ANA-2024-003",
      type: "Pattern Analysis",
      agency: "All Agencies",
      dateRun: "2024-01-19 16:45",
      findings: 12,
      status: "completed",
      risk: "low",
    },
  ];

  const queryTemplates = [
    "Invoices > GHS 500,000 in last 30 days",
    "Duplicate contractors in same agency",
    "Invoices exceeding contract values",
    "Payment delays > 14 days",
    "High-frequency submissions from single contractor",
    "Invoices submitted outside business hours",
  ];

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
              <span className="text-sm text-oaia-gray">
                Analytics & Query Tools
              </span>
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
              <BarChart3 className="h-8 w-8 mr-3 text-oaia-blue" />
              Analytics Tools
            </h1>
            <p className="text-oaia-gray mt-1">
              Advanced analytics, visualization, and query tools for audit
              investigations
            </p>
          </div>

          {/* Quick Analysis Setup */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Quick Analysis Setup
              </CardTitle>
              <CardDescription>
                Configure and run automated analysis tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Select value={analysisType} onValueChange={setAnalysisType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Analysis Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="duplicate">
                      Duplicate Detection
                    </SelectItem>
                    <SelectItem value="threshold">Amount Threshold</SelectItem>
                    <SelectItem value="pattern">Payment Patterns</SelectItem>
                    <SelectItem value="compliance">Compliance Check</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                    <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={agency} onValueChange={setAgency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Agency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agencies</SelectItem>
                    <SelectItem value="health">Ministry of Health</SelectItem>
                    <SelectItem value="education">
                      Ministry of Education
                    </SelectItem>
                    <SelectItem value="road">Road Fund</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Run Analysis
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {analyticsTools.map((tool) => (
              <Card
                key={tool.id}
                className={`hover:shadow-md transition-shadow ${tool.bgColor} ${tool.borderColor} border-2`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <tool.icon className={`h-6 w-6 mr-3 ${tool.color}`} />
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-oaia-gray">
                        Latest Results:
                      </span>
                      <span className={`text-sm font-medium ${tool.color}`}>
                        {tool.results}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-oaia-gray">Last Run:</span>
                      <span className="text-sm">{tool.lastRun}</span>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View Results
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Custom Query Builder */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Custom Query Builder
              </CardTitle>
              <CardDescription>
                Build custom queries to analyze specific data patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Query Templates</h4>
                    <div className="space-y-2">
                      {queryTemplates.map((template, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded border"
                        >
                          <span className="text-sm">{template}</span>
                          <Button size="sm" variant="outline">
                            Use
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Custom Query</h4>
                    <div className="space-y-3">
                      <Input placeholder="Enter custom query or conditions..." />
                      <div className="flex space-x-2">
                        <Button className="flex items-center">
                          <Search className="h-4 w-4 mr-2" />
                          Execute Query
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Analyses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent Analysis Results
              </CardTitle>
              <CardDescription>
                View and manage recent analysis runs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAnalyses.map((analysis) => (
                  <div
                    key={analysis.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Activity className="h-5 w-5 text-oaia-blue" />
                      <div>
                        <div className="font-medium">{analysis.id}</div>
                        <div className="text-sm text-oaia-gray">
                          {analysis.type} • {analysis.agency} •{" "}
                          {analysis.dateRun}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium">
                          {analysis.findings} findings
                        </div>
                        <div className="text-sm text-oaia-gray capitalize">
                          {analysis.status}
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          analysis.risk === "high"
                            ? "bg-red-100 text-red-800"
                            : analysis.risk === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {analysis.risk.toUpperCase()}
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTools;
