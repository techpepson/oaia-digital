
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Logo from '@/components/Logo';
import { 
  DollarSign, 
  Users, 
  FileText, 
  TrendingUp,
  Building2,
  Mail,
  MessageSquare,
  Eye,
  Download,
  Search,
  Filter,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

const OaiaAdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for admin dashboard
  const adminStats = [
    {
      title: 'Total Contractors',
      value: '2,847',
      change: '+12.3%',
      icon: Users,
      color: 'text-oaia-blue'
    },
    {
      title: 'Active Agencies',
      value: '156',
      change: '+5.2%',
      icon: Building2,
      color: 'text-oaia-orange'
    },
    {
      title: 'Platform Revenue',
      value: 'GHS 1.2M',
      change: '+18.7%',
      icon: DollarSign,
      color: 'text-oaia-green'
    },
    {
      title: 'Invoices Processed',
      value: '15,429',
      change: '+22.1%',
      icon: FileText,
      color: 'text-blue-600'
    }
  ];

  const recentPayments = [
    {
      id: 'PAY-2024-001',
      contractor: 'ABC Construction Ltd',
      agency: 'Ministry of Health',
      amount: 'GHS 450,000',
      date: '2024-01-15',
      status: 'completed',
      invoiceId: 'INV-2024-001'
    },
    {
      id: 'PAY-2024-002',
      contractor: 'Tech Solutions Ghana',
      agency: 'Ministry of Education',
      amount: 'GHS 120,000',
      date: '2024-01-14',
      status: 'pending',
      invoiceId: 'INV-2024-002'
    },
    {
      id: 'PAY-2024-003',
      contractor: 'Green Energy Co.',
      agency: 'EPA Ghana',
      amount: 'GHS 230,000',
      date: '2024-01-13',
      status: 'completed',
      invoiceId: 'INV-2024-003'
    }
  ];

  const governmentPayments = [
    {
      id: 'GOVT-PAY-001',
      agency: 'Ministry of Health',
      amount: 'GHS 2,450,000',
      invoiceCount: 12,
      date: '2024-01-15',
      status: 'received'
    },
    {
      id: 'GOVT-PAY-002',
      agency: 'Ministry of Education',
      amount: 'GHS 1,200,000',
      invoiceCount: 8,
      date: '2024-01-12',
      status: 'pending'
    }
  ];

  const handleSendNotification = (contractorId: string, type: 'email' | 'sms') => {
    toast.success(`${type === 'email' ? 'Email' : 'SMS'} sent successfully to contractor`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'received': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'received': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-oaia-light">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-4">
            <span className="text-sm text-oaia-gray">OAIA Admin Portal</span>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">OAIA Admin Dashboard</h1>
          <p className="text-oaia-gray mt-1">Monitor platform performance and manage payments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Contractor Payments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-oaia-blue" />
                Recent Contractor Payments
              </CardTitle>
              <CardDescription>
                Payments made to contractors through OAIA platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">{payment.contractor}</div>
                      <div className="text-sm text-oaia-gray">{payment.agency}</div>
                      <div className="text-xs text-oaia-gray">Invoice: {payment.invoiceId}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="font-bold text-oaia-blue">{payment.amount}</div>
                      <Badge className={getStatusColor(payment.status)}>
                        {getStatusIcon(payment.status)}
                        <span className="ml-1">{payment.status}</span>
                      </Badge>
                      <div className="text-xs text-oaia-gray">{payment.date}</div>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSendNotification(payment.id, 'email')}
                          className="h-6 px-2"
                        >
                          <Mail className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSendNotification(payment.id, 'sms')}
                          className="h-6 px-2"
                        >
                          <MessageSquare className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Government Payments to OAIA */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-oaia-orange" />
                Government Payments to OAIA
              </CardTitle>
              <CardDescription>
                Track payments received from government agencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {governmentPayments.map((payment) => (
                  <div key={payment.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-900">{payment.agency}</div>
                      <Badge className={getStatusColor(payment.status)}>
                        {getStatusIcon(payment.status)}
                        <span className="ml-1">{payment.status}</span>
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-oaia-gray">Amount:</span>
                        <div className="font-bold text-oaia-green">{payment.amount}</div>
                      </div>
                      <div>
                        <span className="text-oaia-gray">Invoices:</span>
                        <div className="font-medium">{payment.invoiceCount} invoices</div>
                      </div>
                      <div>
                        <span className="text-oaia-gray">Date:</span>
                        <div className="font-medium">{payment.date}</div>
                      </div>
                      <div>
                        <span className="text-oaia-gray">Payment ID:</span>
                        <div className="font-mono text-xs">{payment.id}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Communication Tools */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Send className="h-5 w-5 mr-2 text-oaia-blue" />
              Communication Center
            </CardTitle>
            <CardDescription>
              Send notifications and updates to contractors and agencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Recipient Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-contractors">All Contractors</SelectItem>
                    <SelectItem value="all-agencies">All Agencies</SelectItem>
                    <SelectItem value="specific">Specific User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select message type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="payment-notification">Payment Notification</SelectItem>
                    <SelectItem value="system-update">System Update</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                    <SelectItem value="general">General Announcement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end space-x-2">
                <Button className="bg-oaia-blue hover:bg-oaia-blue/90">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send SMS
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Analytics */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
              <CardDescription>Key metrics and analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-oaia-gray">Invoice Processing Time</span>
                  <span className="font-semibold">2.3 days avg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-oaia-gray">Payment Success Rate</span>
                  <span className="font-semibold text-green-600">98.7%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-oaia-gray">User Satisfaction</span>
                  <span className="font-semibold">4.8/5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-oaia-gray">Platform Uptime</span>
                  <span className="font-semibold text-green-600">99.9%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Download className="h-5 w-5" />
                  <span className="text-sm">Export Reports</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">User Management</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm">Audit Logs</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm">Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OaiaAdminDashboard;
