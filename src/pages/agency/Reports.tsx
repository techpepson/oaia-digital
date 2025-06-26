
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Logo from '@/components/Logo';
import AgencySidebar from '@/components/AgencySidebar';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  DollarSign,
  FileText,
  Filter,
  Search,
  Eye,
  Plus
} from 'lucide-react';

const Reports = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [reportType, setReportType] = useState('spending');
  const [dateFilter, setDateFilter] = useState('this-month');
  const [contractorFilter, setContractorFilter] = useState('all');

  const reportTemplates = [
    {
      id: 'spending-summary',
      title: 'Spending Summary Report',
      description: 'Overview of spending by period, contractor, and project',
      type: 'spending',
      frequency: 'Monthly',
      lastGenerated: '2024-01-20'
    },
    {
      id: 'aging-payables',
      title: 'Aging Payables Report',
      description: 'Track outstanding invoices and payment delays',
      type: 'payables',
      frequency: 'Weekly',
      lastGenerated: '2024-01-18'
    },
    {
      id: 'contractor-performance',
      title: 'Contractor Performance Report',
      description: 'Analyze contractor delivery times and compliance',
      type: 'performance',
      frequency: 'Quarterly',
      lastGenerated: '2024-01-15'
    },
    {
      id: 'budget-utilization',
      title: 'Budget Utilization Report',
      description: 'Monitor budget allocation and utilization rates',
      type: 'budget',
      frequency: 'Monthly',
      lastGenerated: '2024-01-20'
    }
  ];

  const spendingData = [
    { period: 'January 2024', totalSpent: 'KES 2,450,000', invoiceCount: 12, contractors: 5, avgProcessingTime: '3.2 days' },
    { period: 'December 2023', totalSpent: 'KES 3,120,000', invoiceCount: 18, contractors: 7, avgProcessingTime: '2.8 days' },
    { period: 'November 2023', totalSpent: 'KES 1,890,000', invoiceCount: 9, contractors: 4, avgProcessingTime: '4.1 days' },
    { period: 'October 2023', totalSpent: 'KES 2,780,000', invoiceCount: 15, contractors: 6, avgProcessingTime: '3.5 days' }
  ];

  const payablesData = [
    { contractor: 'ABC Construction Ltd', invoiceId: 'INV-2024-001', amount: 'KES 450,000', daysOutstanding: 2, status: 'pending' },
    { contractor: 'Tech Solutions Inc', invoiceId: 'INV-2024-003', amount: 'KES 280,000', daysOutstanding: 5, status: 'approved' },
    { contractor: 'Green Energy Co', invoiceId: 'INV-2024-007', amount: 'KES 320,000', daysOutstanding: 8, status: 'pending' },
    { contractor: 'ABC Construction Ltd', invoiceId: 'INV-2024-002', amount: 'KES 180,000', daysOutstanding: 12, status: 'rejected' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (days: number) => {
    if (days > 10) return 'text-red-600 font-semibold';
    if (days > 5) return 'text-yellow-600 font-medium';
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-oaia-light flex">
      <AgencySidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
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
                <p className="text-sm text-oaia-gray">Generate comprehensive reports and export data</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
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
          {/* Report Templates */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-oaia-blue flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Report Templates
              </CardTitle>
              <CardDescription>
                Pre-configured reports for common analysis needs
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
                      <SelectItem value="spending">Spending Analysis</SelectItem>
                      <SelectItem value="payables">Aging Payables</SelectItem>
                      <SelectItem value="performance">Performance Metrics</SelectItem>
                      <SelectItem value="budget">Budget Analysis</SelectItem>
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

                  <Select value={contractorFilter} onValueChange={setContractorFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by contractor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Contractors</SelectItem>
                      <SelectItem value="ABC Construction Ltd">ABC Construction Ltd</SelectItem>
                      <SelectItem value="Tech Solutions Inc">Tech Solutions Inc</SelectItem>
                      <SelectItem value="Green Energy Co">Green Energy Co</SelectItem>
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
          {reportType === 'spending' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-oaia-blue flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Spending Analysis
                </CardTitle>
                <CardDescription>
                  Monthly spending breakdown and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Invoice Count</TableHead>
                      <TableHead>Contractors</TableHead>
                      <TableHead>Avg. Processing Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {spendingData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{row.period}</TableCell>
                        <TableCell className="text-oaia-blue font-medium">{row.totalSpent}</TableCell>
                        <TableCell>{row.invoiceCount}</TableCell>
                        <TableCell>{row.contractors}</TableCell>
                        <TableCell>{row.avgProcessingTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {reportType === 'payables' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-oaia-blue flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Aging Payables
                </CardTitle>
                <CardDescription>
                  Outstanding invoices and payment delays
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contractor</TableHead>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Days Outstanding</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payablesData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{row.contractor}</TableCell>
                        <TableCell>{row.invoiceId}</TableCell>
                        <TableCell className="text-oaia-blue font-medium">{row.amount}</TableCell>
                        <TableCell className={getUrgencyColor(row.daysOutstanding)}>
                          {row.daysOutstanding} days
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(row.status)}>
                            {row.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
