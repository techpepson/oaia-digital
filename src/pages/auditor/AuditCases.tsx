// OAIA Digital - Auditor Audit Cases
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
  FileSearch,
  Eye,
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  Building2,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  Pause,
} from "lucide-react";
import AuditorSidebar from "@/components/AuditorSidebar";

const AuditCases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const auditCases = [
    {
      id: "AUD-2024-001",
      title: "Duplicate Payment Investigation",
      description:
        "Investigation of potential duplicate payments to ABC Construction Ltd",
      agency: "Ministry of Health",
      priority: "high",
      status: "in-progress",
      amount: "GHS 850,000",
      dateOpened: "2024-01-10",
      daysOpen: 12,
      assignee: "Senior Auditor Alice Wanjiku",
      findings: 3,
      evidence: 8,
    },
    {
      id: "AUD-2024-002",
      title: "Contract Variance Review",
      description:
        "Review of contract amendments and cost variations exceeding approved limits",
      agency: "Road Fund",
      priority: "medium",
      status: "pending-review",
      amount: "GHS 2,400,000",
      dateOpened: "2024-01-08",
      daysOpen: 8,
      assignee: "Auditor Team B",
      findings: 1,
      evidence: 12,
    },
    {
      id: "AUD-2024-003",
      title: "Budget Overrun Analysis",
      description:
        "Analysis of systematic budget overruns in infrastructure projects",
      agency: "County Government - Nairobi",
      priority: "high",
      status: "completed",
      amount: "GHS 1,200,000",
      dateOpened: "2023-12-15",
      daysOpen: 45,
      assignee: "Lead Auditor John Mwangi",
      findings: 7,
      evidence: 25,
    },
    {
      id: "AUD-2024-004",
      title: "Procurement Process Audit",
      description:
        "Compliance audit of procurement processes and vendor selection",
      agency: "Ministry of Education",
      priority: "medium",
      status: "on-hold",
      amount: "GHS 675,000",
      dateOpened: "2024-01-05",
      daysOpen: 15,
      assignee: "Auditor Sarah Kimani",
      findings: 2,
      evidence: 6,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "pending-review":
        return <Eye className="h-4 w-4 text-yellow-600" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "on-hold":
        return <Pause className="h-4 w-4 text-gray-600" />;
      default:
        return <FileSearch className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending-review":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "on-hold":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredCases = auditCases.filter((auditCase) => {
    const matchesSearch =
      auditCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auditCase.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auditCase.agency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || auditCase.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || auditCase.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-oaia-light flex">
      <AuditorSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((c) => !c)}
      />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/dashboard/auditor">
              <Logo />
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-oaia-gray">
                Audit Cases Management
              </span>
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard/auditor">Back to Dashboard</Link>
              </Button>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8 flex-1">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <FileSearch className="h-8 w-8 mr-3 text-oaia-blue" />
              Audit Cases
            </h1>
            <p className="text-oaia-gray mt-1">
              Manage and track ongoing audit investigations
            </p>
          </div>

          {/* Filters and Search */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Search & Filter Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-oaia-gray" />
                  <Input
                    placeholder="Search cases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="pending-review">
                      Pending Review
                    </SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={priorityFilter}
                  onValueChange={setPriorityFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  New Audit Case
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Cases List */}
          <div className="space-y-6">
            {filteredCases.map((auditCase) => (
              <Card
                key={auditCase.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {getStatusIcon(auditCase.status)}
                      <div>
                        <CardTitle className="text-xl text-oaia-blue">
                          {auditCase.id}
                        </CardTitle>
                        <CardDescription className="text-lg font-medium text-gray-900 mt-1">
                          {auditCase.title}
                        </CardDescription>
                        <p className="text-sm text-oaia-gray mt-2">
                          {auditCase.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(auditCase.priority)}>
                        {auditCase.priority.toUpperCase()} PRIORITY
                      </Badge>
                      <Badge className={getStatusColor(auditCase.status)}>
                        {auditCase.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Building2 className="h-4 w-4 mr-2 text-oaia-gray" />
                        <span className="text-oaia-gray">Agency:</span>
                        <span className="ml-2 font-medium">
                          {auditCase.agency}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 mr-2 text-oaia-gray" />
                        <span className="text-oaia-gray">Amount:</span>
                        <span className="ml-2 font-medium">
                          {auditCase.amount}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 mr-2 text-oaia-gray" />
                        <span className="text-oaia-gray">Assignee:</span>
                        <span className="ml-2 font-medium">
                          {auditCase.assignee}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-oaia-gray" />
                        <span className="text-oaia-gray">Date Opened:</span>
                        <span className="ml-2 font-medium">
                          {auditCase.dateOpened}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-oaia-gray" />
                        <span className="text-oaia-gray">Days Open:</span>
                        <span className="ml-2 font-medium">
                          {auditCase.daysOpen} days
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FileSearch className="h-4 w-4 mr-2 text-oaia-gray" />
                        <span className="text-oaia-gray">Findings:</span>
                        <span className="ml-2 font-medium">
                          {auditCase.findings} items
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Button size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        <FileSearch className="h-4 w-4 mr-2" />
                        View Evidence ({auditCase.evidence})
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCases.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <FileSearch className="h-12 w-12 mx-auto text-oaia-gray mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No audit cases found
                </h3>
                <p className="text-oaia-gray">
                  Try adjusting your search criteria or create a new audit case.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditCases;
