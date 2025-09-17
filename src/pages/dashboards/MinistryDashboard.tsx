// OAIA Digital - Ministry Dashboard
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import Logo from "@/components/Logo";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
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
  Eye,

} from "lucide-react";
import MinistrySidebar from "@/components/MinistrySidebar";

const MinistryDashboard = () => {

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sample data for government-wide overview
  const budgetData = [
    { month: "Jan", approved: 2400000, pending: 800000, funded: 2200000 },
    { month: "Feb", approved: 1900000, pending: 600000, funded: 1800000 },
    { month: "Mar", approved: 3200000, pending: 1200000, funded: 3000000 },
    { month: "Apr", approved: 2800000, pending: 900000, funded: 2700000 },
    { month: "May", approved: 3600000, pending: 1100000, funded: 3400000 },
    { month: "Jun", approved: 4100000, pending: 1400000, funded: 3900000 },
  ];

  const agencyData = [
    { name: "GETFund", value: 35, color: "#1E40AF" },
    { name: "NHIS", value: 25, color: "#EA580C" },
    { name: "Road Fund", value: 20, color: "#16A34A" },
    { name: "Education", value: 15, color: "#DC2626" },
    { name: "Others", value: 5, color: "#7C2D12" },
  ];

  const agencies = [
    {
      name: "GETFund",
      approvedAdvances: 45,
      fundedAdvances: 42,
      outstandingBalance: "GHS 15.2M",
      status: "Good Standing",
      lastActivity: "2 hours ago",
    },
    {
      name: "NHIS",
      approvedAdvances: 38,
      fundedAdvances: 35,
      outstandingBalance: "GHS 12.8M",
      status: "Good Standing",
      lastActivity: "4 hours ago",
    },
    {
      name: "Road Fund",
      approvedAdvances: 32,
      fundedAdvances: 28,
      outstandingBalance: "GHS 18.5M",
      status: "Attention Required",
      lastActivity: "1 day ago",
    },
    {
      name: "Ministry of Education",
      approvedAdvances: 28,
      fundedAdvances: 26,
      outstandingBalance: "GHS 9.3M",
      status: "Good Standing",
      lastActivity: "3 hours ago",
    },
  ];





  return (
    <div className="min-h-screen bg-oaia-light flex">
      <MinistrySidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((c) => !c)}
      />
      <div className="flex-1 flex flex-col">
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
                <Badge variant="destructive" className="ml-2">
                  5
                </Badge>
              </Button>
              <span className="text-sm text-oaia-gray">
                Ministry of Finance
              </span>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8 flex-1">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Ministry of Finance Dashboard
            </h1>
            <p className="text-oaia-gray mt-1">
              Government-wide invoice financing oversight and management
            </p>
          </div>

          {/* Navigation Links */}
          <div className="mb-6 flex flex-wrap gap-4">
            <Link to="/ministry/agencies">
              <Button variant="outline" size="sm">
                <Building2 className="h-4 w-4 mr-2" />
                Manage Agencies
              </Button>
            </Link>
            <Link to="/ministry/funding">
              <Button variant="outline" size="sm">
                <DollarSign className="h-4 w-4 mr-2" />
                Funding Management
              </Button>
            </Link>
            <Link to="/ministry/reports">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Budget Reports
              </Button>
            </Link>
          </div>

          {/* Alerts Banner */}
          <div className="mb-6 grid md:grid-cols-2 gap-4">
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                  <div>
                    <p className="font-medium text-yellow-800">
                      Budget Threshold Alert
                    </p>
                    <p className="text-sm text-yellow-700">
                      Road Fund approaching 85% of allocated budget
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mr-2" />
                  <div>
                    <p className="font-medium text-blue-800">
                      Allocation Review Required
                    </p>
                    <p className="text-sm text-blue-700">
                      4 agencies require budget allocation review
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Metrics - Agency Allocation Focus */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Total Budget Allocated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-oaia-blue">
                  GHS 125.8M
                </div>
                <div className="text-sm text-oaia-green">
                  Across 24 agencies
                </div>
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
                <div className="text-sm text-oaia-gray">
                  4 require attention
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  YTD Budget Utilization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-oaia-blue">
                  78.5%
                </div>
                <div className="text-sm text-oaia-green">
                  +5% from last quarter
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                  <Activity className="h-4 w-4 mr-1" />
                  Agency Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-oaia-green">94.5%</div>
                <div className="text-sm text-oaia-gray">Allocation efficiency</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Budget Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-oaia-blue">
                  Monthly Budget Trends
                </CardTitle>
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
                      <Tooltip
                        formatter={(value) =>
                          `GHS ${(value as number).toLocaleString()}`
                        }
                      />
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
                <CardTitle className="text-xl text-oaia-blue">
                  Budget Allocation by Agency
                </CardTitle>
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
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
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
              <CardTitle className="text-xl text-oaia-blue">
                Agency Performance Overview
              </CardTitle>
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
                        <TableCell className="font-medium">
                          {agency.name}
                        </TableCell>
                        <TableCell>{agency.approvedAdvances}</TableCell>
                        <TableCell>{agency.fundedAdvances}</TableCell>
                        <TableCell>{agency.outstandingBalance}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              agency.status === "Good Standing"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {agency.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {agency.lastActivity}
                        </TableCell>
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




        </div>
      </div>
    </div>
  );
};

export default MinistryDashboard;
