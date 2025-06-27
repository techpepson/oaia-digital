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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Logo from "@/components/Logo";
import AgencySidebar from "@/components/AgencySidebar";
import {
  Settings as SettingsIcon,
  Users,
  Bell,
  Shield,
  Workflow,
  Plus,
  Edit,
  Trash2,
  Save,
  Key,
  Mail,
  Phone,
  Building,
} from "lucide-react";

const Settings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

  const users = [
    {
      id: 1,
      name: "Dr. Jane Mwangi",
      email: "jane.mwangi@health.go.ke",
      role: "Department Head",
      permissions: "Full Access",
      status: "active",
      lastLogin: "2024-01-20 14:30",
    },
    {
      id: 2,
      name: "John Kamau",
      email: "john.kamau@health.go.ke",
      role: "Finance Officer",
      permissions: "Invoice Review",
      status: "active",
      lastLogin: "2024-01-20 09:15",
    },
    {
      id: 3,
      name: "Mary Wanjiku",
      email: "mary.wanjiku@health.go.ke",
      role: "Procurement Officer",
      permissions: "Contract Management",
      status: "inactive",
      lastLogin: "2024-01-18 16:45",
    },
  ];

  const workflows = [
    {
      id: 1,
      name: "Standard Invoice Approval",
      description: "Default workflow for invoice amounts under KES 500,000",
      steps: ["Finance Officer Review", "Department Head Approval"],
      status: "active",
      invoiceThreshold: "KES 500,000",
    },
    {
      id: 2,
      name: "High-Value Invoice Approval",
      description: "Enhanced workflow for invoices above KES 500,000",
      steps: [
        "Finance Officer Review",
        "Department Head Approval",
        "Director Sign-off",
      ],
      status: "active",
      invoiceThreshold: "Above KES 500,000",
    },
    {
      id: 3,
      name: "Emergency Approval",
      description: "Fast-track workflow for urgent payments",
      steps: ["Department Head Direct Approval"],
      status: "active",
      invoiceThreshold: "Any Amount",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const tabItems = [
    { id: "users", label: "User Management", icon: Users },
    { id: "workflows", label: "Approval Workflows", icon: Workflow },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "agency", label: "Agency Profile", icon: Building },
  ];

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
                <h1 className="text-xl font-semibold text-gray-900">
                  Agency Settings
                </h1>
                <p className="text-sm text-oaia-gray">
                  Configure users, workflows, and system preferences
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-oaia-blue hover:bg-oaia-blue/90">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          {/* Settings Navigation */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                {tabItems.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-white text-oaia-blue shadow-sm"
                          : "text-oaia-gray hover:text-gray-900"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* User Management */}
          {activeTab === "users" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-oaia-blue flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      User Management
                    </CardTitle>
                    <CardDescription>
                      Manage agency users, roles, and permissions
                    </CardDescription>
                  </div>
                  <Button className="bg-oaia-green hover:bg-oaia-green/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.permissions}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-oaia-gray">
                          {user.lastLogin}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Approval Workflows */}
          {activeTab === "workflows" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-oaia-blue flex items-center">
                      <Workflow className="h-5 w-5 mr-2" />
                      Approval Workflows
                    </CardTitle>
                    <CardDescription>
                      Configure automated approval processes for different
                      invoice types
                    </CardDescription>
                  </div>
                  <Button className="bg-oaia-green hover:bg-oaia-green/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Workflow
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workflows.map((workflow) => (
                    <Card
                      key={workflow.id}
                      className="border-l-4 border-l-oaia-blue"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium text-gray-900">
                                {workflow.name}
                              </h4>
                              <Badge
                                className={getStatusColor(workflow.status)}
                              >
                                {workflow.status.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-oaia-gray mb-2">
                              {workflow.description}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-oaia-gray">
                              <span>
                                Threshold: {workflow.invoiceThreshold}
                              </span>
                              <span>• Steps: {workflow.steps.length}</span>
                            </div>
                            <div className="mt-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-medium text-gray-600">
                                  Workflow Steps:
                                </span>
                                {workflow.steps.map((step, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center"
                                  >
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {index + 1}. {step}
                                    </Badge>
                                    {index < workflow.steps.length - 1 && (
                                      <span className="mx-2 text-oaia-gray">
                                        →
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              Test
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Agency Profile */}
          {activeTab === "agency" && (
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-oaia-blue flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    Agency Information
                  </CardTitle>
                  <CardDescription>
                    Update your agency's basic information and contact details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="agency-name">Agency Name</Label>
                    <Input id="agency-name" defaultValue="Ministry of Health" />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      defaultValue="Healthcare Infrastructure"
                    />
                  </div>
                  <div>
                    <Label htmlFor="agency-code">Agency Code</Label>
                    <Input id="agency-code" defaultValue="MOH-HI-001" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      defaultValue="info@health.go.ke"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Contact Phone</Label>
                    <Input id="contact-phone" defaultValue="+254 20 2717077" />
                  </div>
                  <div>
                    <Label htmlFor="address">Physical Address</Label>
                    <Input
                      id="address"
                      defaultValue="Afya House, Cathedral Road, Nairobi"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-oaia-blue flex items-center">
                    <Key className="h-5 w-5 mr-2" />
                    Budget & Limits
                  </CardTitle>
                  <CardDescription>
                    Configure budget limits and spending thresholds
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="annual-budget">
                      Annual Budget Allocation
                    </Label>
                    <Input id="annual-budget" defaultValue="KES 25,000,000" />
                  </div>
                  <div>
                    <Label htmlFor="monthly-limit">
                      Monthly Spending Limit
                    </Label>
                    <Input id="monthly-limit" defaultValue="KES 3,000,000" />
                  </div>
                  <div>
                    <Label htmlFor="single-invoice-limit">
                      Single Invoice Limit
                    </Label>
                    <Input
                      id="single-invoice-limit"
                      defaultValue="KES 1,000,000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="approval-threshold">
                      Auto-Approval Threshold
                    </Label>
                    <Input id="approval-threshold" defaultValue="KES 100,000" />
                  </div>
                  <div>
                    <Label htmlFor="budget-alert">
                      Budget Alert Percentage
                    </Label>
                    <Select defaultValue="80">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="70">70%</SelectItem>
                        <SelectItem value="80">80%</SelectItem>
                        <SelectItem value="90">90%</SelectItem>
                        <SelectItem value="95">95%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
