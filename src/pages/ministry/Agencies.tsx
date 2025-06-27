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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Logo from "@/components/Logo";
import {
  Building2,
  Search,
  Filter,
  Eye,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Users,
  Clock,
  Download,
} from "lucide-react";
import MinistrySidebar from "@/components/MinistrySidebar";

const Agencies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const agencies = [
    {
      id: "AGY-001",
      name: "Ghana Education Trust Fund (GETFund)",
      code: "GETFUND",
      approvedAdvances: 45,
      fundedAdvances: 42,
      pendingAmount: "GHS 3.2M",
      outstandingBalance: "GHS 15.2M",
      budgetAllocation: "GHS 50M",
      budgetUtilized: 78,
      status: "Good Standing",
      lastActivity: "2 hours ago",
      contactPerson: "Dr. Sarah Mensah",
      contactEmail: "sarah.mensah@getfund.gov.gh",
      avgProcessingTime: "3.2 days",
      complianceRate: 94,
    },
    {
      id: "AGY-002",
      name: "National Health Insurance Scheme (NHIS)",
      code: "NHIS",
      approvedAdvances: 38,
      fundedAdvances: 35,
      pendingAmount: "GHS 2.8M",
      outstandingBalance: "GHS 12.8M",
      budgetAllocation: "GHS 40M",
      budgetUtilized: 65,
      status: "Good Standing",
      lastActivity: "4 hours ago",
      contactPerson: "Mr. James Osei",
      contactEmail: "james.osei@nhis.gov.gh",
      avgProcessingTime: "2.8 days",
      complianceRate: 91,
    },
    {
      id: "AGY-003",
      name: "Road Fund",
      code: "ROADFUND",
      approvedAdvances: 32,
      fundedAdvances: 28,
      pendingAmount: "GHS 4.5M",
      outstandingBalance: "GHS 18.5M",
      budgetAllocation: "GHS 60M",
      budgetUtilized: 85,
      status: "Attention Required",
      lastActivity: "1 day ago",
      contactPerson: "Eng. Mary Asante",
      contactEmail: "mary.asante@roadfund.gov.gh",
      avgProcessingTime: "4.1 days",
      complianceRate: 87,
    },
    {
      id: "AGY-004",
      name: "Ministry of Education",
      code: "MOE",
      approvedAdvances: 28,
      fundedAdvances: 26,
      pendingAmount: "GHS 1.9M",
      outstandingBalance: "GHS 9.3M",
      budgetAllocation: "GHS 35M",
      budgetUtilized: 72,
      status: "Good Standing",
      lastActivity: "3 hours ago",
      contactPerson: "Prof. Kwame Nyong",
      contactEmail: "kwame.nyong@moe.gov.gh",
      avgProcessingTime: "2.5 days",
      complianceRate: 96,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good Standing":
        return "bg-green-100 text-green-800";
      case "Attention Required":
        return "bg-yellow-100 text-yellow-800";
      case "Critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredAgencies = agencies.filter((agency) => {
    const matchesSearch =
      agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || agency.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-oaia-light flex">
      <MinistrySidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((c) => !c)}
      />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/dashboard/ministry">
              <Logo />
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-oaia-gray">
                Ministry of Finance - Agencies
              </span>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8 flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Agency Management
            </h1>
            <p className="text-oaia-gray mt-1">
              Monitor and manage all registered government agencies
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                  <Building2 className="h-4 w-4 mr-1" />
                  Total Agencies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-oaia-blue">
                  {agencies.length}
                </div>
                <div className="text-sm text-oaia-green">All active</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Total Outstanding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-oaia-blue">
                  GHS 55.8M
                </div>
                <div className="text-sm text-oaia-gray">
                  Across all agencies
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Avg Budget Utilization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-oaia-green">75%</div>
                <div className="text-sm text-oaia-gray">Within targets</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Avg Processing Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-oaia-blue">
                  3.2 days
                </div>
                <div className="text-sm text-oaia-green">Within SLA</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Actions */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search agencies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Good Standing">Good Standing</SelectItem>
                    <SelectItem value="Attention Required">
                      Attention Required
                    </SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Agencies Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-oaia-blue">
                Registered Agencies
              </CardTitle>
              <CardDescription>
                Comprehensive overview of all government agencies and their
                performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agency</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Advances</TableHead>
                      <TableHead>Outstanding</TableHead>
                      <TableHead>Budget Utilization</TableHead>
                      <TableHead>Compliance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAgencies.map((agency) => (
                      <TableRow key={agency.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{agency.name}</div>
                            <div className="text-sm text-gray-500">
                              Last active: {agency.lastActivity}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {agency.code}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Approved: {agency.approvedAdvances}</div>
                            <div>Funded: {agency.fundedAdvances}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {agency.outstandingBalance}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-oaia-blue h-2 rounded-full"
                                style={{ width: `${agency.budgetUtilized}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">
                              {agency.budgetUtilized}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">
                              {agency.complianceRate}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(agency.status)}>
                            {agency.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium">
                              {agency.contactPerson}
                            </div>
                            <div className="text-gray-500">
                              {agency.contactEmail}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {agency.status === "Attention Required" && (
                              <Button size="sm" variant="ghost">
                                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                              </Button>
                            )}
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
    </div>
  );
};

export default Agencies;
