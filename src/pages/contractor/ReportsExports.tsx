
// OAIA Digital - Contractor Reports & Exports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Logo from '@/components/Logo';
import ContractorSidebar from '@/components/ContractorSidebar';
import { 
  Menu, 
  X, 
  FileBarChart, 
  Download, 
  Calendar,
  Filter,
  FileText,
  PieChart,
  BarChart3,
  TrendingUp
} from 'lucide-react';

const ReportsExports = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState('last-month');
  const [reportType, setReportType] = useState('all');

  const reports = [
    {
      id: 1,
      name: 'Invoice Summary Report',
      description: 'Complete overview of all invoices with status and amounts',
      type: 'summary',
      icon: FileText,
      lastGenerated: '2024-01-15',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Cash Flow Analysis',
      description: 'Analysis of advance payments received and outstanding amounts',
      type: 'financial',
      icon: TrendingUp,
      lastGenerated: '2024-01-14',
      size: '1.8 MB'
    },
    {
      id: 3,
      name: 'Invoice Status Breakdown',
      description: 'Visual breakdown of invoice statuses and processing times',
      type: 'analytics',
      icon: PieChart,
      lastGenerated: '2024-01-13',
      size: '950 KB'
    },
    {
      id: 4,
      name: 'Monthly Performance',
      description: 'Monthly comparison of invoice volumes and values',
      type: 'performance',
      icon: BarChart3,
      lastGenerated: '2024-01-12',
      size: '1.2 MB'
    }
  ];

  const quickStats = [
    { label: 'Total Reports Generated', value: '47', change: '+12%' },
    { label: 'Last Export', value: '2 hours ago', change: 'Recent' },
    { label: 'Data Points Analyzed', value: '1,284', change: '+8.5%' },
    { label: 'Export Formats', value: '4', change: 'PDF, Excel, CSV, JSON' }
  ];

  const handleGenerateReport = (reportId: number) => {
    console.log(`Generating report ${reportId} for date range: ${dateRange}`);
    // Handle report generation logic
  };

  const handleExportAll = () => {
    console.log('Exporting all data');
    // Handle bulk export logic
  };

  return (
    <div className="min-h-screen bg-oaia-light flex">
      <ContractorSidebar isCollapsed={sidebarCollapsed} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </Button>
              <Link to="/">
                <Logo showText={false} />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-oaia-gray">Welcome back, John Doe</span>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          {/* Page Title */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports & Exports</h1>
              <p className="text-oaia-gray mt-1">Generate and download comprehensive reports of your invoice data</p>
            </div>
            <Button 
              onClick={handleExportAll}
              className="bg-oaia-blue hover:bg-oaia-blue/90"
            >
              <Download className="h-4 w-4 mr-2" />
              Export All Data
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {quickStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-oaia-blue">{stat.value}</div>
                  <div className="text-sm text-gray-900 mt-1">{stat.label}</div>
                  <div className="text-xs text-oaia-gray mt-1">{stat.change}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filter Controls */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-oaia-blue flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Report Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-oaia-gray" />
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-week">Last 7 days</SelectItem>
                      <SelectItem value="last-month">Last 30 days</SelectItem>
                      <SelectItem value="last-quarter">Last 3 months</SelectItem>
                      <SelectItem value="last-year">Last 12 months</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reports</SelectItem>
                    <SelectItem value="summary">Summary Reports</SelectItem>
                    <SelectItem value="financial">Financial Reports</SelectItem>
                    <SelectItem value="analytics">Analytics Reports</SelectItem>
                    <SelectItem value="performance">Performance Reports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Available Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-oaia-blue flex items-center">
                <FileBarChart className="h-5 w-5 mr-2" />
                Available Reports
              </CardTitle>
              <CardDescription>
                Generate and download detailed reports about your invoices and finances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {reports.map((report) => {
                  const IconComponent = report.icon;
                  return (
                    <Card key={report.id} className="border-l-4 border-l-oaia-blue">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center">
                          <IconComponent className="h-5 w-5 mr-2 text-oaia-blue" />
                          {report.name}
                        </CardTitle>
                        <CardDescription>{report.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm text-oaia-gray">
                            <div>Last generated: {report.lastGenerated}</div>
                            <div>File size: {report.size}</div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-oaia-blue hover:bg-oaia-blue/90"
                            onClick={() => handleGenerateReport(report.id)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Generate
                          </Button>
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportsExports;
