
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/Logo';
import { FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const AgencyDashboard = () => {
  const pendingInvoices = [
    { id: 'INV001', contractor: 'ABC Construction Ltd', amount: 'KES 450,000', service: 'Road Maintenance', date: '2024-01-15' },
    { id: 'INV004', contractor: 'Tech Solutions Inc', amount: 'KES 180,000', service: 'IT Services', date: '2024-01-14' },
    { id: 'INV007', contractor: 'Green Energy Co', amount: 'KES 320,000', service: 'Solar Installation', date: '2024-01-13' }
  ];

  return (
    <div className="min-h-screen bg-oaia-light">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-oaia-gray">Ministry of Health</span>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Agency Dashboard</h1>
          <p className="text-oaia-gray mt-1">Review and approve contractor invoices</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">8</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray">Approved This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-green">24</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray">Total Budget Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-blue">68%</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray">Avg. Review Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-blue">3 days</div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Invoices */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-oaia-blue flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
              Invoices Pending Review
            </CardTitle>
            <CardDescription>
              Review contractor invoices and supporting documentation
            </CardDescription>
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
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{invoice.amount}</div>
                      <div className="text-sm text-oaia-gray">{invoice.date}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-oaia-green hover:bg-oaia-green/90">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
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
  );
};

export default AgencyDashboard;
