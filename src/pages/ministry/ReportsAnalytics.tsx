// OAIA Digital - Ministry Reports & Analytics
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Logo from "@/components/Logo";
import MinistrySidebar from "@/components/MinistrySidebar";
import {
  BarChart3,
  TrendingUp,
  FileText,
  Users,
  Download,
  Calendar,
  DollarSign,
  Filter,
  Search,
  Eye,
  Plus,
  Clock,
  PieChart,
  Activity,
  Target,
  Building2
} from "lucide-react";

const ReportsAnalytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('analytics');
  const [reportType, setReportType] = useState('budget');
  const [dateFilter, setDateFilter] = useState('this-month');
  const [agencyFilter, setAgencyFilter] = useState('all');

  const analyticsData = [
    {
      icon: BarChart3,
      title: "Spending Trends",
      value: "GHS 45.2M",
      description: "+12% from last month",
      color: "text-oaia-blue",
      bgColor: "bg-blue-50"
    },
    {
      icon: TrendingUp,
      title: "Budget Utilization",
      value: "82%",
      description: "On track for FY 2024",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: FileText,
      title: "Reports Generated",
      value: "24",
      description: "This quarter",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Users,
      title: "Active Agencies",
      value: "24",
      description: "4 require attention",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
  ];

  const reportTemplates = [
    {
      id: 'budget-summary',
      title: 'Budget Summary Report',
      description: 'Overview of budget allocation and utilization across agencies',
      type: 'budget',
      frequency: 'Monthly',
      lastGenerated: '2024-01-20'
    },
    {
      id: 'agency-performance',
      title: 'Agency Performance Report',
      description: 'Track agency compliance and performance metrics',
      type: 'performance',
      frequency: 'Weekly',
      lastGenerated: '2024-01-18'
    },
    {
      id: 'disbursement-analysis',
      title: 'Disbursement Analysis Report',
      description: 'Analyze disbursement patterns and trends',
      type: 'disbursement',
      frequency: 'Quarterly',
      lastGenerated: '2024-01-15'
    },
    {
      id: 'compliance-overview',
      title: 'Compliance Overview Report',
      description: 'Monitor compliance rates and identify issues',
      type: 'compliance',
      frequency: 'Monthly',
      lastGenerated: '2024-01-20'
    }
  ];

  const budgetData = [
    { agency: 'Ministry of Health', allocated: 'GHS 8,450,000', utilized: '68%', remaining: 'GHS 2,704,000', status: 'on-track' },
    { agency: 'Ministry of Education', allocated: 'GHS 12,120,000', utilized: '82%', remaining: 'GHS 2,181,600', status: 'on-track' },
    { agency: 'Ministry of Roads', allocated: 'GHS 6,890,000', utilized: '94%', remaining: 'GHS 413,400', status: 'attention' },
    { agency: 'Ministry of Agriculture', allocated: 'GHS 4,780,000', utilized: '45%', remaining: 'GHS 2,629,000', status: 'under-utilized' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'attention': return 'bg-yellow-100 text-yellow-800';
      case 'under-utilized': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-oaia-light flex">
      <MinistrySidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((c) => !c)}
      />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Logo showText={false} />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Reports & Analytics</h1>
                <p className="text-sm text-oaia-gray">Comprehensive reporting and financial analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={activeTab === 'analytics' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('analytics')}
                  className={activeTab === 'analytics' ? 'bg-white shadow-sm' : ''}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
                <Button
                  variant={activeTab === 'reports' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('reports')}
                  className={activeTab === 'reports' ? 'bg-white shadow-sm' : ''}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Reports
                </Button>
              </div>
              <Button className="bg-oaia-blue hover:bg-oaia-blue/90">
                <Plus className="h-4 w-4 mr-2" />
                Custom Report
              </Button>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <>
              {/* Analytics Overview */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {analyticsData.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-oaia-gray">{metric.title}</p>
                          <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                          <p className="text-sm text-oaia-gray mt-1">{metric.description}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                          <metric.icon className={`h-6 w-6 ${metric.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Budget Allocation Trends */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg text-oaia-blue flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Budget Allocation Trends
                  </CardTitle>
                  <CardDescription>
                    Ministry-wide budget allocation and utilization patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Quarterly Allocation Trends</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Q1 2024</span>
                          <span className="font-medium">GHS 32.2M</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-oaia-blue h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Q4 2023</span>
                          <span className="font-medium">GHS 28.8M</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-oaia-blue h-2 rounded-full" style={{width: '76%'}}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Q3 2023</span>
                          <span className="font-medium">GHS 25.4M</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-oaia-blue h-2 rounded-full" style={{width: '67%'}}></div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Performance Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-green-800">Average Utilization Rate</p>
                            <p className="text-lg font-bold text-green-900">82%</p>
                          </div>
                          <div className="text-green-600">
                            <Target className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-blue-800">Agencies On Track</p>
                            <p className="text-lg font-bold text-blue-900">20/24</p>
                          </div>
                          <div className="text-blue-600">
                            <Building2 className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <>
              {/* Report Templates */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg text-oaia-blue flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Report Templates
                  </CardTitle>
                  <CardDescription>
                    Pre-configured reports for ministry operations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {reportTemplates.map((template) => (
                      <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <FileText className="h-5 w-5 text-oaia-blue" />
                            <Badge variant="outline" className="text-xs">
                              {template.frequency}
                            </Badge>
                          </div>
                          <h4 className="font-medium text-gray-900 mb-1">{template.title}</h4>
                          <p className="text-sm text-oaia-gray mb-3">{template.description}</p>
                          <div className="flex items-center justify-between text-xs text-oaia-gray">
                            <span>Last: {template.lastGenerated}</span>
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3 mr-1" />
                              Generate
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Report Filters */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Select value={reportType} onValueChange={setReportType}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">Budget Analysis</SelectItem>
                          <SelectItem value="performance">Agency Performance</SelectItem>
                          <SelectItem value="disbursement">Disbursement Analysis</SelectItem>
                          <SelectItem value="compliance">Compliance Overview</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select value={dateFilter} onValueChange={setDateFilter}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Time period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="this-week">This Week</SelectItem>
                          <SelectItem value="this-month">This Month</SelectItem>
                          <SelectItem value="this-quarter">This Quarter</SelectItem>
                          <SelectItem value="this-year">This Year</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={agencyFilter} onValueChange={setAgencyFilter}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Filter by agency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Agencies</SelectItem>
                          <SelectItem value="health">Ministry of Health</SelectItem>
                          <SelectItem value="education">Ministry of Education</SelectItem>
                          <SelectItem value="roads">Ministry of Roads</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button className="bg-oaia-green hover:bg-oaia-green/90" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Excel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Report Data */}
              {reportType === 'budget' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-oaia-blue flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Budget Analysis
                    </CardTitle>
                    <CardDescription>
                      Agency budget allocation and utilization overview
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Agency</TableHead>
                          <TableHead>Allocated Budget</TableHead>
                          <TableHead>Utilization Rate</TableHead>
                          <TableHead>Remaining Budget</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {budgetData.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{row.agency}</TableCell>
                            <TableCell className="text-oaia-blue font-medium">{row.allocated}</TableCell>
                            <TableCell>{row.utilized}</TableCell>
                            <TableCell>{row.remaining}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(row.status)}>
                                {row.status.replace('-', ' ').toUpperCase()}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;