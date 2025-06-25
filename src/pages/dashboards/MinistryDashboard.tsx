
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Users, Activity } from 'lucide-react';

const MinistryDashboard = () => {
  const budgetData = [
    { month: 'Jan', approved: 2400000, pending: 800000 },
    { month: 'Feb', approved: 1900000, pending: 600000 },
    { month: 'Mar', approved: 3200000, pending: 1200000 },
    { month: 'Apr', approved: 2800000, pending: 900000 },
    { month: 'May', approved: 3600000, pending: 1100000 },
    { month: 'Jun', approved: 4100000, pending: 1400000 }
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
          <h1 className="text-3xl font-bold text-gray-900">Ministry Dashboard</h1>
          <p className="text-oaia-gray mt-1">Monitor budget allocation and payment flows</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Total Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-blue">KES 45.2M</div>
              <div className="text-sm text-oaia-green">+12% from last quarter</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Disbursed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-green">KES 31.8M</div>
              <div className="text-sm text-oaia-gray">70.4% of total budget</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Active Contractors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-blue">156</div>
              <div className="text-sm text-oaia-green">+8 this month</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <Activity className="h-4 w-4 mr-1" />
                Processing Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-blue">5.2 days</div>
              <div className="text-sm text-oaia-green">-1.3 days improvement</div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Overview Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-oaia-blue">Budget Overview</CardTitle>
            <CardDescription>
              Monthly approved vs pending invoice amounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `KES ${(value as number).toLocaleString()}`} />
                  <Bar dataKey="approved" fill="#1E40AF" name="Approved" />
                  <Bar dataKey="pending" fill="#EA580C" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Agency Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-oaia-blue">Agency Performance</CardTitle>
            <CardDescription>
              Top performing agencies by processing efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { agency: 'Ministry of Health', efficiency: 94, invoices: 28 },
                { agency: 'Ministry of Education', efficiency: 87, invoices: 35 },
                { agency: 'Ministry of Transport', efficiency: 82, invoices: 19 },
                { agency: 'County Government', efficiency: 78, invoices: 41 }
              ].map((item) => (
                <div key={item.agency} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{item.agency}</div>
                    <div className="text-sm text-oaia-gray">{item.invoices} invoices processed</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="font-medium text-oaia-blue">{item.efficiency}%</div>
                      <div className="text-sm text-oaia-gray">Efficiency</div>
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-oaia-blue h-2 rounded-full" 
                        style={{ width: `${item.efficiency}%` }}
                      ></div>
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

export default MinistryDashboard;
