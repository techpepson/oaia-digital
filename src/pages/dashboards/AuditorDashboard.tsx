import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Logo from '@/components/Logo';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  FileText, 
  Search,
  Filter,
  Download,
  BarChart3,
  FileSearch,
  Bell,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  Building2,
  Calendar,
  Target,
  Zap,
  Database,
  Settings
} from 'lucide-react';

const AuditorDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [agencyFilter, setAgencyFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const auditKPIs = [
    { label: 'Flagged Invoices', value: 23, change: '+5 this week', icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Anomalies Detected', value: 8, change: 'AI flagged', icon: Zap, color: 'text-orange-600' },
    { label: 'Total Under Review', value: 'KES 12.5M', change: '15 invoices', icon: Eye, color: 'text-blue-600' },
    { label: 'Compliance Rate', value: '94.2%', change: '+1.8% improvement', icon: Shield, color: 'text-green-600' }
  ];

  const auditCases = [
    {
      id: 'AUD-2024-001',
      title: 'Duplicate Payment Investigation',
      agency: 'Ministry of Health',
      priority: 'high',
      status: 'in-progress',
      amount: 'KES 850,000',
      daysOpen: 12,
      assignee: 'Senior Auditor A'
    },
    {
      id: 'AUD-2024-002', 
      title: 'Contract Variance Review',
      agency: 'Road Fund',
      priority: 'medium',
      status: 'pending-review',
      amount: 'KES 2,400,000',
      daysOpen: 8,
      assignee: 'Auditor Team B'
    },
    {
      id: 'AUD-2024-003',
      title: 'Budget Overrun Analysis',
      agency: 'County Government',
      priority: 'high',
      status: 'completed',
      amount: 'KES 1,200,000',
      daysOpen: 45,
      assignee: 'Lead Auditor C'
    }
  ];

  const flaggedInvoices = [
    { 
      id: 'INV-2024-156', 
      contractor: 'ABC Construction Ltd', 
      agency: 'Ministry of Health',
      amount: 'KES 450,000',
      flag: 'Amount exceeds contract value',
      riskLevel: 'high',
      dateSubmitted: '2024-01-15'
    },
    { 
      id: 'INV-2024-134', 
      contractor: 'Tech Solutions Inc', 
      agency: 'Ministry of Education',
      amount: 'KES 125,000',
      flag: 'Potential duplicate',
      riskLevel: 'medium',
      dateSubmitted: '2024-01-12'
    },
    { 
      id: 'INV-2024-189', 
      contractor: 'Road Works Ltd', 
      agency: 'Road Fund',
      amount: 'KES 890,000',
      flag: 'Unusual payment pattern',
      riskLevel: 'high',
      dateSubmitted: '2024-01-14'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending-review': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'on-hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-oaia-light">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-oaia-gray">Auditor General's Office</span>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Audit Settings
            </Button>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title & Navigation */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Auditor Dashboard</h1>
          <p className="text-oaia-gray mt-1">Comprehensive audit oversight and compliance monitoring</p>
          
          {/* Quick Navigation */}
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/auditor/cases">
                <FileSearch className="h-4 w-4 mr-2" />
                Audit Cases
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/auditor/registry">
                <Database className="h-4 w-4 mr-2" />
                Invoice Registry
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/auditor/analytics">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics Tools
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/auditor/reports">
                <FileText className="h-4 w-4 mr-2" />
                Audit Reports
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/auditor/notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Link>
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {auditKPIs.map((kpi, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                  <kpi.icon className={`h-4 w-4 mr-1 ${kpi.color}`} />
                  {kpi.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
                <div className="text-sm text-oaia-gray">{kpi.change}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Critical Alerts */}
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Critical Audit Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-l-red-500">
                <div>
                  <p className="font-medium text-red-800">High-Value Anomaly Detected</p>
                  <p className="text-sm text-red-700">Invoice INV-2024-156 exceeds contract limit by 40%</p>
                </div>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-1" />
                  Investigate
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-l-orange-500">
                <div>
                  <p className="font-medium text-orange-800">Potential Duplicate Payment</p>
                  <p className="text-sm text-orange-700">Similar invoices from same contractor detected</p>
                </div>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-1" />
                  Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audit Cases Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-oaia-blue">Active Audit Cases</CardTitle>
                <CardDescription>Investigations and reviews in progress</CardDescription>
              </div>
              <Button size="sm">
                <FileSearch className="h-4 w-4 mr-2" />
                New Audit Case
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auditCases.map((auditCase) => (
                <div key={auditCase.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <FileSearch className="h-5 w-5 text-oaia-blue" />
                    <div>
                      <div className="font-medium text-gray-900">{auditCase.id}</div>
                      <div className="text-sm font-medium text-oaia-blue">{auditCase.title}</div>
                      <div className="text-sm text-oaia-gray">
                        {auditCase.agency} • {auditCase.amount} • Assigned to: {auditCase.assignee}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge className={getRiskColor(auditCase.priority)}>
                      {auditCase.priority.toUpperCase()}
                    </Badge>
                    <Badge className={getStatusColor(auditCase.status)}>
                      {auditCase.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <div className="text-sm text-oaia-gray">
                      {auditCase.daysOpen} days
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Filtering & Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg text-oaia-blue flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Invoice Registry & Analytics
            </CardTitle>
            <CardDescription>Search and analyze all invoices with advanced filtering</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4 mb-6">
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
                  <SelectItem value="education">Ministry of Education</SelectItem>
                  <SelectItem value="transport">Ministry of Transport</SelectItem>
                  <SelectItem value="road-fund">Road Fund</SelectItem>
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

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Audit Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="under-audit">Under Audit</SelectItem>
                  <SelectItem value="cleared">Cleared</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                </SelectContent>
              </Select>

              <Button className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>

            {/* Analytics Tools */}
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="flex items-center justify-center h-16">
                <BarChart3 className="h-5 w-5 mr-2" />
                Payment Cycle Analysis
              </Button>
              <Button variant="outline" className="flex items-center justify-center h-16">
                <TrendingUp className="h-5 w-5 mr-2" />
                Anomaly Detection
              </Button>
              <Button variant="outline" className="flex items-center justify-center h-16">
                <Target className="h-5 w-5 mr-2" />
                Duplicate Detection
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Flagged Invoices */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-oaia-blue flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Recently Flagged Invoices
            </CardTitle>
            <CardDescription>
              Invoices requiring immediate audit attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {flaggedInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg bg-red-50 border-red-200">
                  <div className="flex items-center space-x-4">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="font-medium text-gray-900">{invoice.id}</div>
                      <div className="text-sm text-oaia-gray">{invoice.contractor} • {invoice.agency}</div>
                      <div className="text-sm font-medium text-red-700">{invoice.flag}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{invoice.amount}</div>
                      <div className="text-sm text-oaia-gray">{invoice.dateSubmitted}</div>
                    </div>
                    <Badge className={getRiskColor(invoice.riskLevel)}>
                      {invoice.riskLevel.toUpperCase()} RISK
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Audit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button variant="outline">
                View All Flagged Invoices
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuditorDashboard;
