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
  Bell,
  Search,
  Filter,
  Eye,
  Archive,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Zap,
  FileSearch,
  DollarSign,
  Users,
  Settings,
  Trash2,
} from "lucide-react";

const AuditorNotifications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const notifications = [
    {
      id: "NOT-2024-001",
      title: "High-Value Invoice Detected",
      message:
        "Invoice INV-2024-156 exceeds contract value by 40% (GHS 850,000)",
      type: "anomaly",
      priority: "high",
      status: "unread",
      timestamp: "2024-01-20 09:15",
      agency: "Ministry of Health",
      relatedCase: "AUD-2024-001",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      id: "NOT-2024-002",
      title: "Potential Duplicate Payment",
      message:
        "Similar invoices from ABC Construction detected across multiple agencies",
      type: "duplicate",
      priority: "high",
      status: "unread",
      timestamp: "2024-01-20 08:30",
      agency: "Multiple Agencies",
      relatedCase: "AUD-2024-001",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      id: "NOT-2024-003",
      title: "Audit Case Due for Review",
      message: "Audit case AUD-2024-002 requires senior auditor review",
      type: "deadline",
      priority: "medium",
      status: "read",
      timestamp: "2024-01-19 16:45",
      agency: "Road Fund",
      relatedCase: "AUD-2024-002",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: "NOT-2024-004",
      title: "New Suspicious Activity Alert",
      message:
        "Unusual payment pattern detected for contractor Green Energy Corp",
      type: "pattern",
      priority: "medium",
      status: "unread",
      timestamp: "2024-01-19 14:20",
      agency: "Ministry of Energy",
      relatedCase: null,
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      id: "NOT-2024-005",
      title: "Monthly Compliance Report Ready",
      message: "January 2024 compliance summary report has been generated",
      type: "report",
      priority: "low",
      status: "read",
      timestamp: "2024-01-19 10:00",
      agency: "All Agencies",
      relatedCase: null,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "NOT-2024-006",
      title: "System Maintenance Scheduled",
      message:
        "Audit system maintenance scheduled for January 25, 2024 at 2:00 AM",
      type: "system",
      priority: "low",
      status: "read",
      timestamp: "2024-01-18 12:00",
      agency: "System",
      relatedCase: null,
      icon: Settings,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "NOT-2024-007",
      title: "Budget Threshold Exceeded",
      message:
        "Ministry of Education has exceeded 85% of quarterly budget allocation",
      type: "threshold",
      priority: "medium",
      status: "archived",
      timestamp: "2024-01-17 15:30",
      agency: "Ministry of Education",
      relatedCase: null,
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-blue-100 text-blue-800";
      case "read":
        return "bg-gray-100 text-gray-800";
      case "archived":
        return "bg-gray-100 text-gray-600";
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

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority =
      priorityFilter === "all" || notification.priority === priorityFilter;
    const matchesStatus =
      statusFilter === "all" || notification.status === statusFilter;
    const matchesType =
      typeFilter === "all" || notification.type === typeFilter;

    return matchesSearch && matchesPriority && matchesStatus && matchesType;
  });

  const unreadCount = notifications.filter((n) => n.status === "unread").length;
  const highPriorityCount = notifications.filter(
    (n) => n.priority === "high" && n.status === "unread"
  ).length;

  return (
    <div className="min-h-screen bg-oaia-light">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard/auditor">
            <Logo />
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-oaia-gray">Audit Notifications</span>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/auditor">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Bell className="h-8 w-8 mr-3 text-oaia-blue" />
            Audit Notifications
            {unreadCount > 0 && (
              <Badge className="ml-3 bg-red-500 text-white">
                {unreadCount} unread
              </Badge>
            )}
          </h1>
          <p className="text-oaia-gray mt-1">
            Stay informed about critical audit events and system alerts
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <Bell className="h-4 w-4 mr-1" />
                Total Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-blue">
                {notifications.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                Unread
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {unreadCount}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                High Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {highPriorityCount}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <Archive className="h-4 w-4 mr-1" />
                Archived
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">
                {notifications.filter((n) => n.status === "archived").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-oaia-gray" />
                <Input
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="anomaly">Anomalies</SelectItem>
                  <SelectItem value="duplicate">Duplicates</SelectItem>
                  <SelectItem value="deadline">Deadlines</SelectItem>
                  <SelectItem value="report">Reports</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">Mark All Read</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`hover:shadow-md transition-shadow ${
                notification.bgColor
              } ${
                notification.status === "unread"
                  ? "border-l-4 border-l-blue-500"
                  : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <notification.icon
                      className={`h-6 w-6 mt-1 ${notification.color}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3
                          className={`text-lg font-medium ${
                            notification.status === "unread" ? "font-bold" : ""
                          }`}
                        >
                          {notification.title}
                        </h3>
                        <Badge
                          className={getPriorityColor(notification.priority)}
                        >
                          {notification.priority.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(notification.status)}>
                          {notification.status.toUpperCase()}
                        </Badge>
                      </div>

                      <p className="text-gray-700 mb-3">
                        {notification.message}
                      </p>

                      <div className="flex items-center space-x-4 text-sm text-oaia-gray">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {notification.timestamp}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {notification.agency}
                        </span>
                        {notification.relatedCase && (
                          <span className="flex items-center">
                            <FileSearch className="h-4 w-4 mr-1" />
                            Case: {notification.relatedCase}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Archive className="h-4 w-4 mr-1" />
                      Archive
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Bell className="h-12 w-12 mx-auto text-oaia-gray mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No notifications found
              </h3>
              <p className="text-oaia-gray">
                Try adjusting your search criteria or filters.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AuditorNotifications;
