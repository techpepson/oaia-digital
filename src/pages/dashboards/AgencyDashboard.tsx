
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Logo from '@/components/Logo';
import AgencySidebar from '@/components/AgencySidebar';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Bell,
  Filter,
  Search
} from 'lucide-react';

const AgencyDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dateFilter, setDateFilter] = useState('this-month');
  const [searchTerm, setSearchTerm] = useState('');

  const dashboardStats = [
    { 
      label: 'Pending Review', 
      value: '8', 
      icon: Clock, 
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      trend: '+2 from yesterday'
    },
    { 
      label: 'Approved This Month', 
      value: '24', 
      icon: CheckCircle, 
      color: 'text-oaia-green',
      bgColor: 'bg-green-50',
      trend: '+15% from last month'
    },
    { 
      label: 'Total Budget Used', 
      value: '68%', 
      icon: DollarSign, 
      color: 'text-oaia-blue',
      bgColor: 'bg-blue-50',
      trend: 'KES 12.4M of 18.2M'
    },
    { 
      label: 'Avg. Review Time', 
      value: '3 days', 
      icon: TrendingUp, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: '-0.5 days improvement'
    }
  ];

  const budgetAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Budget Limit Approaching',
      message: 'Road Maintenance project has used 85% of allocated budget',
      project: 'Road Maintenance 2024',
      urgency: 'medium'
    },
    {
      id: 2,
      type: 'danger',
      title: 'Contract Scope Exceeded',
      message: 'Invoice INV-2024-010 exceeds approved contract milestone amount',
      project: 'Hospital Construction Phase 2',
      urgency: 'high'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'invoice_submitted',
      message: 'New invoice submitted by ABC Construction Ltd',
      invoiceId: 'INV-2024-011',
      time: '2 hours ago',
      amount: 'KES 450,000'
    },
    {
      id: 2,
      type: 'payment_processed',
      message: 'Payment processed for Tech Solutions Inc',
      invoiceId: 'INV-2024-003',
      time: '4 hours ago',
      amount: 'KES 280,000'
    },
    {
      id: 3,
      type: 'funding_received',
      message: 'Funding allocation received from MoF',
      invoiceId: null,
      time: '6 hours ago',
      amount: 'KES 5,000,000'
    }
  ];

  const pendingInvoices = [
    { id: 'INV001', contractor: 'ABC Construction Ltd', amount: 'KES 450,000', service: 'Road Maintenance', date: '2024-01-15', priority: 'high' },
    { id: 'INV004', contractor: 'Tech Solutions Inc', amount: 'KES 180,000', service: 'IT Services', date: '2024-01-14', priority: 'medium' },
    { id: 'INV007', contractor: 'Green Energy Co', amount: 'KES 320,000', service: 'Solar Installation', date: '2024-01-13', priority: 'urgent' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-50 border-red-200 text-red-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
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
                <h1 className="text-xl font-semibold text-gray-900">Agency Dashboard</h1>
                <p className="text-sm text-oaia-gray">Ministry of Health</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              <span className="text-sm text-oaia-gray">Dr. Jane Mwangi</span>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          {/* Dashboard Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-oaia-gray" />
                    <Input
                      placeholder="Search invoices, contractors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="this-week">This Week</SelectItem>
                      <SelectItem value="this-month">This Month</SelectItem>
                      <SelectItem value="this-quarter">This Quarter</SelectItem>
                      <SelectItem value="this-year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            {dashboardStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className={`${stat.bgColor} border-0`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className={`text-3xl font-bold ${stat.color} mt-2`}>{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
                      </div>
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Budget & Compliance Alerts */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg text-oaia-blue flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Budget & Compliance Alerts
                </CardTitle>
                <CardDescription>
                  Monitor budget limits and contract scope compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetAlerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.urgency)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{alert.title}</h4>
                          <p className="text-sm mt-1">{alert.message}</p>
                          <p className="text-xs mt-2 font-medium">Project: {alert.project}</p>
                        </div>
                        <Badge className={alert.urgency === 'high' ? 'bg-red-500' : 'bg-yellow-500'}>
                          {alert.urgency.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-oaia-blue flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-oaia-blue rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        {activity.invoiceId && (
                          <p className="text-xs text-oaia-gray">Invoice: {activity.invoiceId}</p>
                        )}
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-oaia-gray">{activity.time}</p>
                          <p className="text-xs font-medium text-oaia-blue">{activity.amount}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Invoices Quick View */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-oaia-blue flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                    Invoices Requiring Immediate Action
                  </CardTitle>
                  <CardDescription>
                    High priority invoices pending your review and approval
                  </CardDescription>
                </div>
                <Link to="/agency/pending-invoices">
                  <Button variant="outline">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-5 w-5 text-oaia-blue" />
                      <div>
                        <div className="font-medium text-gray-900">{invoice.id}</div>
                        <div className="text-sm text-oaia-gray">{invoice.contractor}</div>
                        <div className="text-sm text-oaia-gray">{invoice.service}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge className={getPriorityColor(invoice.priority)}>
                        {invoice.priority.toUpperCase()}
                      </Badge>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{invoice.amount}</div>
                        <div className="text-sm text-oaia-gray flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {invoice.date}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-oaia-green hover:bg-oaia-green/90">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Quick Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
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

export default AgencyDashboard;
