// OAIA Digital - OA Dashboard
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Logo from '@/components/Logo';
import { 
  DollarSign, 
  Users, 
  FileText, 
  TrendingUp,
  Building2,
  Eye,
  Download,
  Search,
  Filter,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  Mail,
  MessageSquare,
  Upload,
  FileCheck,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Bell
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const OaDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [agencyFilter, setAgencyFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for OA dashboard
  const oaStats = [
    {
      title: 'Total Invoices Submitted',
      value: '8,429',
      change: '+15.3%',
      icon: FileText,
      color: 'text-oaia-blue'
    },
    {
      title: 'Total Advance Payments',
      value: 'GHS 45.2M',
      change: '+22.1%',
      icon: DollarSign,
      color: 'text-oaia-green'
    },
    {
      title: 'Active Contracts',
      value: '1,247',
      change: '+8.7%',
      icon: FileCheck,
      color: 'text-oaia-orange'
    },
    {
      title: 'Active Contractors',
      value: '892',
      change: '+12.4%',
      icon: Users,
      color: 'text-blue-600'
    }
  ];

  const agencyPerformance = [
    {
      agency: 'Ministry of Health',
      totalInvoices: 245,
      approvedInvoices: 198,
      pendingInvoices: 32,
      rejectedInvoices: 15,
      totalValue: 'GHS 12.5M',
      approvalRate: '80.8%',
      avgProcessingTime: '5.2 days'
    },
    {
      agency: 'Ministry of Education',
      totalInvoices: 189,
      approvedInvoices: 156,
      pendingInvoices: 28,
      rejectedInvoices: 5,
      totalValue: 'GHS 8.9M',
      approvalRate: '82.5%',
      avgProcessingTime: '4.8 days'
    },
    {
      agency: 'GETFund',
      totalInvoices: 167,
      approvedInvoices: 134,
      pendingInvoices: 25,
      rejectedInvoices: 8,
      totalValue: 'GHS 15.2M',
      approvalRate: '80.2%',
      avgProcessingTime: '6.1 days'
    },
    {
      agency: 'NHIS',
      totalInvoices: 134,
      approvedInvoices: 112,
      pendingInvoices: 18,
      rejectedInvoices: 4,
      totalValue: 'GHS 6.7M',
      approvalRate: '83.6%',
      avgProcessingTime: '4.2 days'
    }
  ];

  const recentInvoices = [
    {
      id: 'INV-2024-001',
      contractor: 'ABC Construction Ltd',
      agency: 'Ministry of Health',
      project: 'Hospital Infrastructure',
      amount: 'GHS 450,000',
      submissionDate: '2024-01-15',
      status: 'approved',
      paymentStatus: 'disbursed'
    },
    {
      id: 'INV-2024-002',
      contractor: 'Tech Solutions Ghana',
      agency: 'Ministry of Education',
      project: 'School IT Systems',
      amount: 'GHS 120,000',
      submissionDate: '2024-01-14',
      status: 'pending',
      paymentStatus: 'pending'
    },
    {
      id: 'INV-2024-003',
      contractor: 'Green Energy Co.',
      agency: 'EPA Ghana',
      project: 'Solar Installation',
      amount: 'GHS 230,000',
      submissionDate: '2024-01-13',
      status: 'approved',
      paymentStatus: 'processing'
    },
    {
      id: 'INV-2024-004',
      contractor: 'Road Masters Ltd',
      agency: 'Ministry of Roads',
      project: 'Highway Maintenance',
      amount: 'GHS 680,000',
      submissionDate: '2024-01-12',
      status: 'under_review',
      paymentStatus: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'disbursed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'disbursed': return <CheckCircle className="h-4 w-4" />;
      case 'pending':
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'under_review': return <Eye className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleGenerateDEC = (invoiceId: string) => {
    toast.success(`DEC generated for invoice ${invoiceId}`);
  };

  const handleSendNotification = (contractorId: string, type: string) => {
    toast.success(`${type} notification sent successfully`);
  };

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    // Navigate to login page
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-oaia-light">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-4">
            <span className="text-sm text-oaia-gray">OA Portal</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">OA Portal Dashboard</h1>
          <p className="text-oaia-gray mt-1">Manage invoices, payments, and contractor operations</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'ghost'}
              className={`${activeTab === 'overview' ? 'bg-oaia-blue text-white' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </Button>
            <Button
              variant={activeTab === 'invoices' ? 'default' : 'ghost'}
              className={`${activeTab === 'invoices' ? 'bg-oaia-blue text-white' : ''}`}
              onClick={() => setActiveTab('invoices')}
            >
              Invoice Management
            </Button>
            <Button
              variant={activeTab === 'payments' ? 'default' : 'ghost'}
              className={`${activeTab === 'payments' ? 'bg-oaia-blue text-white' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              Payment Operations
            </Button>
            <Button
              variant={activeTab === 'contractors' ? 'default' : 'ghost'}
              className={`${activeTab === 'contractors' ? 'bg-oaia-blue text-white' : ''}`}
              onClick={() => setActiveTab('contractors')}
            >
              Contractor Management
            </Button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {oaStats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-oaia-gray">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Agency Performance */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl text-oaia-blue flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Agency Performance Metrics
                </CardTitle>
                <CardDescription>
                  Track performance across all government agencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agency</TableHead>
                      <TableHead>Total Invoices</TableHead>
                      <TableHead>Approved</TableHead>
                      <TableHead>Pending</TableHead>
                      <TableHead>Total Value</TableHead>
                      <TableHead>Approval Rate</TableHead>
                      <TableHead>Avg Processing Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agencyPerformance.map((agency, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{agency.agency}</TableCell>
                        <TableCell>{agency.totalInvoices}</TableCell>
                        <TableCell className="text-green-600">{agency.approvedInvoices}</TableCell>
                        <TableCell className="text-yellow-600">{agency.pendingInvoices}</TableCell>
                        <TableCell className="font-medium">{agency.totalValue}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            {agency.approvalRate}
                          </Badge>
                        </TableCell>
                        <TableCell>{agency.avgProcessingTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}

        {/* Invoice Management Tab */}
        {activeTab === 'invoices' && (
          <>
            {/* Filters */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg text-oaia-blue flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Invoice Tracking & Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-oaia-gray" />
                    <Input
                      placeholder="Search invoices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={agencyFilter} onValueChange={setAgencyFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by agency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Agencies</SelectItem>
                      <SelectItem value="health">Ministry of Health</SelectItem>
                      <SelectItem value="education">Ministry of Education</SelectItem>
                      <SelectItem value="getfund">GETFund</SelectItem>
                      <SelectItem value="nhis">NHIS</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-oaia-blue hover:bg-oaia-blue/90">
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Invoice Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-oaia-blue flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Recent Invoice Submissions
                </CardTitle>
                <CardDescription>
                  Track and manage all invoice submissions across agencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Contractor</TableHead>
                      <TableHead>Agency</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium text-oaia-blue">{invoice.id}</TableCell>
                        <TableCell>{invoice.contractor}</TableCell>
                        <TableCell>{invoice.agency}</TableCell>
                        <TableCell className="text-sm">{invoice.project}</TableCell>
                        <TableCell className="font-medium">{invoice.amount}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(invoice.status)}>
                            {getStatusIcon(invoice.status)}
                            <span className="ml-1">{invoice.status.replace('_', ' ').toUpperCase()}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(invoice.paymentStatus)}>
                            {getStatusIcon(invoice.paymentStatus)}
                            <span className="ml-1">{invoice.paymentStatus.toUpperCase()}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            {invoice.status === 'approved' && (
                              <Button 
                                size="sm" 
                                className="bg-oaia-blue hover:bg-oaia-blue/90"
                                onClick={() => handleGenerateDEC(invoice.id)}
                              >
                                <FileCheck className="h-4 w-4 mr-1" />
                                Generate DEC
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}

        {/* Payment Operations Tab */}
        {activeTab === 'payments' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Recording */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-oaia-blue flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Payment Recording & Tracking
                </CardTitle>
                <CardDescription>
                  Record and track payments to contractors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-green-50 hover:bg-green-100 text-green-700 border-green-200">
                    <ArrowUpRight className="h-6 w-6" />
                    <span className="text-sm font-medium">Record Payment</span>
                    <span className="text-xs">To Contractor</span>
                  </Button>
                  <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200">
                    <Upload className="h-6 w-6" />
                    <span className="text-sm font-medium">Upload Proof</span>
                    <span className="text-xs">Payment Evidence</span>
                  </Button>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Recent Payment Activities</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Payment to ABC Construction</span>
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Payment to Tech Solutions</span>
                      <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Center */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-oaia-blue flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Center
                </CardTitle>
                <CardDescription>
                  Send payment confirmations and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-oaia-blue hover:bg-oaia-blue/90"
                    onClick={() => handleSendNotification('contractor-1', 'Email')}
                  >
                    <Mail className="h-6 w-6" />
                    <span className="text-sm font-medium">Send Email</span>
                    <span className="text-xs">Payment Confirmation</span>
                  </Button>
                  <Button 
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-oaia-orange hover:bg-oaia-orange/90"
                    onClick={() => handleSendNotification('contractor-1', 'SMS')}
                  >
                    <MessageSquare className="h-6 w-6" />
                    <span className="text-sm font-medium">Send SMS</span>
                    <span className="text-xs">Payment Alert</span>
                  </Button>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Notification History</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Email sent to ABC Construction</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">SMS sent to Tech Solutions</span>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Contractor Management Tab */}
        {activeTab === 'contractors' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contractor Onboarding */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-oaia-blue flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Contractor Onboarding & Verification
                </CardTitle>
                <CardDescription>
                  Manage contractor registration and verification process
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-2xl font-bold text-yellow-700">23</div>
                    <div className="text-sm text-yellow-600">Pending Verifications</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-700">156</div>
                    <div className="text-sm text-green-600">Verified Contractors</div>
                  </div>
                </div>
                <Button className="w-full bg-oaia-blue hover:bg-oaia-blue/90">
                  <Eye className="h-4 w-4 mr-2" />
                  Review Pending Applications
                </Button>
              </CardContent>
            </Card>

            {/* Reporting & Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-oaia-blue flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Reporting & Analytics
                </CardTitle>
                <CardDescription>
                  Comprehensive reporting dashboard for OA operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <FileText className="h-5 w-5" />
                    <span className="text-sm">Generate Reports</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Download className="h-5 w-5" />
                    <span className="text-sm">Export Data</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-sm">Analytics Dashboard</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Calendar className="h-5 w-5" />
                    <span className="text-sm">Schedule Reports</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default OaDashboard;