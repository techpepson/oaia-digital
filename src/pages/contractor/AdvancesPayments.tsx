
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Logo from '@/components/Logo';
import ContractorSidebar from '@/components/ContractorSidebar';
import { 
  Menu, 
  X, 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const AdvancesPayments = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const transactions = [
    {
      id: 'ADV001',
      type: 'advance',
      amount: 'KES 135,000',
      status: 'received',
      invoiceId: 'INV001',
      date: '2024-01-15',
      description: 'Advance payment for Medical Equipment Supply',
      percentage: '30%'
    },
    {
      id: 'PAY001',
      type: 'payment',
      amount: 'KES 450,000',
      status: 'completed',
      invoiceId: 'INV001',
      date: '2024-01-20',
      description: 'Final payment for Medical Equipment Supply',
      percentage: '100%'
    },
    {
      id: 'ADV002',
      type: 'advance',
      amount: 'KES 84,000',
      status: 'pending',
      invoiceId: 'INV002',
      date: '2024-01-18',
      description: 'Advance payment for School Infrastructure',
      percentage: '30%'
    },
    {
      id: 'REP001',
      type: 'repayment',
      amount: 'KES 15,000',
      status: 'completed',
      invoiceId: 'INV003',
      date: '2024-01-12',
      description: 'Excess advance repayment',
      percentage: '-'
    }
  ];

  const summaryStats = [
    {
      title: 'Total Advances Received',
      amount: 'KES 845,000',
      change: '+15%',
      changeType: 'positive',
      icon: TrendingUp
    },
    {
      title: 'Outstanding Advances',
      amount: 'KES 84,000',
      change: '1 pending',
      changeType: 'neutral',
      icon: Clock
    },
    {
      title: 'Total Payments',
      amount: 'KES 1,234,000',
      change: '+8%',
      changeType: 'positive',
      icon: CheckCircle
    },
    {
      title: 'Repayments Made',
      amount: 'KES 15,000',
      change: '1 this month',
      changeType: 'neutral',
      icon: AlertCircle
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'received':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'processing':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'received':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'advance':
        return <ArrowDownRight className="h-4 w-4 text-blue-500" />;
      case 'payment':
        return <ArrowDownRight className="h-4 w-4 text-green-500" />;
      case 'repayment':
        return <ArrowUpRight className="h-4 w-4 text-orange-500" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

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
              <h1 className="text-3xl font-bold text-gray-900">Advances & Payments</h1>
              <p className="text-oaia-gray mt-1">Track your advance payments, final payments, and repayments</p>
            </div>
            <Button className="bg-oaia-blue hover:bg-oaia-blue/90">
              <CreditCard className="h-4 w-4 mr-2" />
              Request Advance
            </Button>
          </div>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {summaryStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                      <IconComponent className="h-4 w-4 mr-2" />
                      {stat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-oaia-blue">{stat.amount}</div>
                    <p className={`text-xs flex items-center mt-1 ${
                      stat.changeType === 'positive' ? 'text-green-600' : 
                      stat.changeType === 'negative' ? 'text-red-600' : 'text-oaia-gray'
                    }`}>
                      {stat.changeType === 'positive' && <TrendingUp className="h-3 w-3 mr-1" />}
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-oaia-blue">Transaction History</CardTitle>
              <CardDescription>
                Complete history of advances, payments, and repayments
              </CardDescription>
              
              {/* Filter Controls */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-oaia-gray" />
                  <Input
                    placeholder="Search transactions..."
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
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="advance">Advances</SelectItem>
                    <SelectItem value="payment">Payments</SelectItem>
                    <SelectItem value="repayment">Repayments</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      {getTypeIcon(transaction.type)}
                      {getStatusIcon(transaction.status)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{transaction.id}</span>
                          <Badge variant="outline" className="text-xs">
                            {transaction.type}
                          </Badge>
                        </div>
                        <div className="text-sm text-oaia-gray">{transaction.description}</div>
                        <div className="text-xs text-oaia-gray">
                          Invoice: {transaction.invoiceId} • {transaction.percentage && `${transaction.percentage} of invoice`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{transaction.amount}</div>
                        <div className="text-sm text-oaia-gray">{transaction.date}</div>
                      </div>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
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

export default AdvancesPayments;
