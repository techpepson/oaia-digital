
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Activity, 
  AlertTriangle,
  Building2,
  FileText,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Banknote
} from 'lucide-react';

const MinistryDashboard = () => {
  const [selectedAgency, setSelectedAgency] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');

  // Sample data for government-wide overview
  const budgetData = [
    { month: 'Jan', approved: 2400000, pending: 800000, funded: 2200000 },
    { month: 'Feb', approved: 1900000, pending: 600000, funded: 1800000 },
    { month: 'Mar', approved: 3200000, pending: 1200000, funded: 3000000 },
    { month: 'Apr', approved: 2800000, pending: 900000, funded: 2700000 },
    { month: 'May', approved: 3600000, pending: 1100000, funded: 3400000 },
    { month: 'Jun', approved: 4100000, pending: 1400000, funded: 3900000 }
  ];

  const agencyData = [
    { name: 'GETFund', value: 35, color: '#1E40AF' },
    { name: 'NHIS', value: 25, color: '#EA580C' },
    { name: 'Road Fund', value: 20, color: '#16A34A' },
    { name: 'Education', value: 15, color: '#DC2626' },
    { name: 'Others', value: 5, color: '#7C2D12' }
  ];

  const agencies = [
    {
      name: 'GETFund',
      approvedAdvances: 45,
      fundedAdvances: 42,
      outstandingBalance: 'KES 15.2M',
      status: 'Good Standing',
      lastActivity: '2 hours ago'
    },
    {
      name: 'NHIS',
      approvedAdvances: 38,
      fundedAdvances: 35,
      outstandingBalance: 'KES 12.8M',
      status: 'Good Standing',
      lastActivity: '4 hours ago'
    },
    {
      name: 'Road Fund',
      approvedAdvances: 32,
      fundedAdvances: 28,
      outstandingBalance: 'KES 18.5M',
      status: 'Attention Required',
      lastActivity: '1 day ago'
    },
    {
      name: 'Ministry of Education',
      approvedAdvances: 28,
      fundedAdvances: 26,
      outstandingBalance: 'KES 9.3M',
      status: 'Good Standing',
      lastActivity: '3 hours ago'
    }
  ];

  const recentInvoices = [
    {
      id: 'INV-2024-1024',
      agency: 'GETFund',
      contractor: 'ABC Construction Ltd',
      amount: 'KES 850,000',
      status: 'Awaiting MoF Approval',
      priority: 'High',
      submittedDate: '2024-01-15',
      budgetCode: 'ED-2024-001'
    },
    {
      id: 'INV-2024-1025',
      agency: 'NHIS',
      contractor: 'MedTech Solutions',
      amount: 'KES 1,200,000',
      status: 'Funded',
      priority: 'Medium',
      submittedDate: '2024-01-14',
      budgetCode: 'HL-2024-003'
    },
    {
      id: 'INV-2024-1026',
      agency: 'Road Fund',
      contractor: 'Highway Builders Co',
      amount: 'KES 2,500,000',
      status: 'Under Review',
      priority: 'High',
      submittedDate: '2024-01-13',
      budgetCode: 'TR-2024-005'
    }
  ];

  const fundingRequests = [
    {
      id: 'FR-2024-001',
      agency: 'GETFund',
      amount: 'KES 5,200,000',
      invoiceCount: 12,
      requestDate: '2024-01-15',
      status: 'Pending Review'
    },
    {
      id: 'FR-2024-002',
      agency: 'NHIS',
      amount: 'KES 3,800,000',
      invoiceCount: 8,
      requestDate: '2024-01-14',
      status: 'Approved'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Awaiting MoF Approval':
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Funded':
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              <Badge variant="destructive" className="ml-2">5</Badge>
            </Button>
            <span className="text-sm text-oaia-gray">Ministry of Finance</span>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ministry of Finance Dashboard</h1>
          <p className="text-oaia-gray mt-1">Government-wide invoice financing oversight and management</p>
        </div>

        {/* Alerts Banner */}
        <div className="mb-6 grid md:grid-cols-2 gap-4">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                <div>
                  <p className="font-medium text-yellow-800">Budget Threshold Alert</p>
                  <p className="text-sm text-yellow-700">Road Fund approaching 85% of allocated budget</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                <div>
                  <p className="font-medium text-red-800">Overdue Payment Alert</p>
                  <p className="text-sm text-red-700">3 invoices pending approval for >5 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Total Advances Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-blue">KES 18.5M</div>
              <div className="text-sm text-oaia-green">Across 156 invoices</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <Building2 className="h-4 w-4 mr-1" />
                Active Agencies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-green">24</div>
              <div className="text-sm text-oaia-gray">4 require attention</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Monthly Disbursements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-blue">KES 45.2M</div>
              <div className="text-sm text-oaia-green">+12% from last month</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <Activity className="h-4 w-4 mr-1" />
                Compliance Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-green">94.5%</div>
              <div className="text-sm text-oaia-gray">On-time payments</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Budget Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-oaia-blue">Monthly Budget Trends</CardTitle>
              <CardDescription>
                Government-wide spending patterns and forecasts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `KES ${(value as number).toLocaleString()}`} />
                    <Bar dataKey="funded" fill="#16A34A" name="Funded" />
                    <Bar dataKey="approved" fill="#1E40AF" name="Approved" />
                    <Bar dataKey="pending" fill="#EA580C" name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Agency Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-oaia-blue">Budget Allocation by Agency</CardTitle>
              <CardDescription>
                Current fiscal year distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={agencyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {agencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agency Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-oaia-blue">Agency Performance Overview</CardTitle>
            <CardDescription>
              Summary statistics for all registered agencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agency</TableHead>
                    <TableHead>Approved Advances</TableHead>
                    <TableHead>Funded Advances</TableHead>
                    <TableHead>Outstanding Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agencies.map((agency) => (
                    <TableRow key={agency.name}>
                      <TableCell className="font-medium">{agency.name}</TableCell>
                      <TableCell>{agency.approvedAdvances}</TableCell>
                      <TableCell>{agency.fundedAdvances}</TableCell>
                      <TableCell>{agency.outstandingBalance}</TableCell>
                      <TableCell>
                        <Badge className={agency.status === 'Good Standing' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {agency.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{agency.lastActivity}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Funding Requests */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-oaia-blue">Funding Requests</CardTitle>
                <CardDescription>
                  Agency requests requiring MoF approval
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button size="sm">
                  Bulk Actions
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Agency</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Invoice Count</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fundingRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.agency}</TableCell>
                      <TableCell>{request.amount}</TableCell>
                      <TableCell>{request.invoiceCount}</TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* All Invoices - Master List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-oaia-blue">All Invoices - Master List</CardTitle>
                <CardDescription>
                  Complete system-wide invoice overview with advanced filters
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1 min-w-48">
                <Select value={selectedAgency} onValueChange={setSelectedAgency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Agency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agencies</SelectItem>
                    <SelectItem value="getfund">GETFund</SelectItem>
                    <SelectItem value="nhis">NHIS</SelectItem>
                    <SelectItem value="roadfund">Road Fund</SelectItem>
                    <SelectItem value="education">Ministry of Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-48">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Awaiting MoF Approval</SelectItem>
                    <SelectItem value="funded">Funded</SelectItem>
                    <SelectItem value="review">Under Review</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-48">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Months</SelectItem>
                    <SelectItem value="2024-01">January 2024</SelectItem>
                    <SelectItem value="2023-12">December 2023</SelectItem>
                    <SelectItem value="2023-11">November 2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-48">
                <Input placeholder="Search by Invoice ID or Contractor" />
              </div>
              <Button variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Invoice Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Agency</TableHead>
                    <TableHead>Contractor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Budget Code</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.agency}</TableCell>
                      <TableCell>{invoice.contractor}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(invoice.priority)}>
                          {invoice.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{invoice.budgetCode}</TableCell>
                      <TableCell className="text-sm text-gray-600">{invoice.submittedDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Banknote className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MinistryDashboard;
