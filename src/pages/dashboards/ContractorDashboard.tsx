
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Logo from '@/components/Logo';
import ContractorSidebar from '@/components/ContractorSidebar';
import { Plus, FileText, Clock, CheckCircle, AlertCircle, TrendingUp, DollarSign, Calendar, Search, Filter, Menu, X } from 'lucide-react';

const ContractorDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [agencyFilter, setAgencyFilter] = useState('all');

  const invoices = [
    { id: 'INV001', amount: 'KES 450,000', status: 'pending', agency: 'Ministry of Health', date: '2024-01-15', project: 'Medical Equipment Supply' },
    { id: 'INV002', amount: 'KES 280,000', status: 'approved', agency: 'Ministry of Education', date: '2024-01-12', project: 'School Infrastructure' },
    { id: 'INV003', amount: 'KES 120,000', status: 'processing', agency: 'County Government', date: '2024-01-10', project: 'Road Maintenance' },
    { id: 'INV004', amount: 'KES 350,000', status: 'paid', agency: 'Ministry of Transport', date: '2024-01-08', project: 'Transport Services' },
    { id: 'INV005', amount: 'KES 180,000', status: 'pending', agency: 'Ministry of Health', date: '2024-01-05', project: 'Healthcare Supplies' }
  ];

  const notifications = [
    { id: 1, type: 'success', message: 'Invoice INV002 has been approved', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'Your advance payment for INV001 is being processed', time: '1 day ago' },
    { id: 3, type: 'warning', message: 'Additional documents required for INV003', time: '2 days ago' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'paid': return <DollarSign className="h-4 w-4 text-blue-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesAgency = agencyFilter === 'all' || invoice.agency === agencyFilter;
    return matchesSearch && matchesStatus && matchesAgency;
  });

  return (
    <div className="min-h-screen bg-oaia-light flex">
      {/* Sidebar */}
      <ContractorSidebar isCollapsed={sidebarCollapsed} />

      {/* Main Content */}
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
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-oaia-gray mt-1">Manage your invoices and track payments</p>
            </div>
            <Link to="/create-invoice">
              <Button className="bg-oaia-blue hover:bg-oaia-blue/90">
                <Plus className="h-4 w-4 mr-2" />
                Submit New Invoice
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Total Invoices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-oaia-blue">12</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2 this month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Pending Approval
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">3</div>
                <p className="text-xs text-oaia-gray mt-1">Avg. 5 days processing</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Total Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-oaia-green">KES 2.4M</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Next Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-oaia-blue">Jan 25</div>
                <p className="text-xs text-oaia-gray mt-1">KES 280,000 expected</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Notifications */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-oaia-blue flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{notification.message}</p>
                      <p className="text-xs text-oaia-gray">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Invoice Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-oaia-blue">My Invoices</CardTitle>
              <CardDescription>
                Track and manage all your submitted invoices
              </CardDescription>
              
              {/* Filter Controls */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-oaia-gray" />
                  <Input
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={agencyFilter} onValueChange={setAgencyFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Agency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agencies</SelectItem>
                    <SelectItem value="Ministry of Health">Ministry of Health</SelectItem>
                    <SelectItem value="Ministry of Education">Ministry of Education</SelectItem>
                    <SelectItem value="County Government">County Government</SelectItem>
                    <SelectItem value="Ministry of Transport">Ministry of Transport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(invoice.status)}
                      <div>
                        <div className="font-medium text-gray-900">{invoice.id}</div>
                        <div className="text-sm text-oaia-gray">{invoice.project}</div>
                        <div className="text-xs text-oaia-gray">{invoice.agency}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{invoice.amount}</div>
                        <div className="text-sm text-oaia-gray">{invoice.date}</div>
                      </div>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
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

export default ContractorDashboard;
