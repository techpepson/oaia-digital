
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/Logo';
import { Plus, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const ContractorDashboard = () => {
  const invoices = [
    { id: 'INV001', amount: 'KES 450,000', status: 'pending', agency: 'Ministry of Health', date: '2024-01-15' },
    { id: 'INV002', amount: 'KES 280,000', status: 'approved', agency: 'Ministry of Education', date: '2024-01-12' },
    { id: 'INV003', amount: 'KES 120,000', status: 'processing', agency: 'County Government', date: '2024-01-10' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
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
            <span className="text-sm text-oaia-gray">Welcome, Contractor</span>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contractor Dashboard</h1>
            <p className="text-oaia-gray mt-1">Manage your invoices and track payments</p>
          </div>
          <Link to="/create-invoice">
            <Button className="bg-oaia-blue hover:bg-oaia-blue/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray">Total Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-blue">12</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">3</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-green">KES 2.4M</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray">Avg. Processing Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-blue">7 days</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Invoices */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-oaia-blue">Recent Invoices</CardTitle>
            <CardDescription>
              Track the status of your submitted invoices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(invoice.status)}
                    <div>
                      <div className="font-medium text-gray-900">{invoice.id}</div>
                      <div className="text-sm text-oaia-gray">{invoice.agency}</div>
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
  );
};

export default ContractorDashboard;
