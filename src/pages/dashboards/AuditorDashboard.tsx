
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/Logo';
import { Shield, AlertTriangle, CheckCircle, Eye, FileText } from 'lucide-react';

const AuditorDashboard = () => {
  const auditItems = [
    { id: 'AUD001', type: 'Invoice', reference: 'INV001', agency: 'Ministry of Health', risk: 'low', status: 'reviewed' },
    { id: 'AUD002', type: 'Payment', reference: 'PAY456', agency: 'Ministry of Education', risk: 'medium', status: 'pending' },
    { id: 'AUD003', type: 'Contract', reference: 'CON789', agency: 'County Government', risk: 'high', status: 'flagged' },
    { id: 'AUD004', type: 'Invoice', reference: 'INV012', agency: 'Ministry of Transport', risk: 'low', status: 'approved' }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'flagged': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'pending': return <Eye className="h-4 w-4 text-yellow-500" />;
      case 'reviewed': return <Shield className="h-4 w-4 text-blue-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
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
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Auditor Dashboard</h1>
          <p className="text-oaia-gray mt-1">Monitor compliance and review financial transactions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                Items Reviewed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-blue">247</div>
              <div className="text-sm text-oaia-green">+15% this month</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Flagged Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">12</div>
              <div className="text-sm text-oaia-gray">Require attention</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Compliance Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-green">94.8%</div>
              <div className="text-sm text-oaia-green">+2.1% improvement</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                Pending Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">8</div>
              <div className="text-sm text-oaia-gray">High priority items</div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-lg text-oaia-blue">Low Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">185</div>
              <p className="text-sm text-oaia-gray">Items with minimal compliance issues</p>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader>
              <CardTitle className="text-lg text-oaia-blue">Medium Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600 mb-2">42</div>
              <p className="text-sm text-oaia-gray">Items requiring closer monitoring</p>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="text-lg text-oaia-blue">High Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600 mb-2">12</div>
              <p className="text-sm text-oaia-gray">Items flagged for investigation</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Audit Items */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-oaia-blue">Recent Audit Items</CardTitle>
            <CardDescription>
              Latest transactions and documents under review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auditItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(item.status)}
                    <div>
                      <div className="font-medium text-gray-900">{item.id}</div>
                      <div className="text-sm text-oaia-gray">{item.type} - {item.reference}</div>
                      <div className="text-sm text-oaia-gray">{item.agency}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge className={getRiskColor(item.risk)}>
                      {item.risk.charAt(0).toUpperCase() + item.risk.slice(1)} Risk
                    </Badge>
                    <Badge variant="outline">
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Review
                    </Button>
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

export default AuditorDashboard;
