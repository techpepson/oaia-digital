import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/Logo";
import OnboardingModal from "@/components/OnboardingModal";
import {
  DollarSign,
  FileText,
  TrendingUp,
  Calendar,
  ListChecks,
  AlertTriangle,
} from "lucide-react";
import ContractorSidebar from "@/components/ContractorSidebar";

const ContractorDashboard = () => {
  const [searchParams] = useSearchParams();
  const shouldShowOnboarding = searchParams.get("onboarding") === "true";
  const [showOnboardingModal, setShowOnboardingModal] =
    useState(shouldShowOnboarding);

  const contractorStats = [
    {
      title: "Invoices Submitted",
      value: "47",
      change: "+12%",
      icon: FileText,
      color: "text-oaia-blue",
    },
    {
      title: "Payments Received",
      value: "GHS 245,000",
      change: "+8%",
      icon: DollarSign,
      color: "text-oaia-green",
    },
    {
      title: "Average Payment Time",
      value: "24 days",
      change: "-5 days",
      icon: Calendar,
      color: "text-oaia-orange",
    },
    {
      title: "Compliance Score",
      value: "98%",
      change: "+1%",
      icon: ListChecks,
      color: "text-blue-600",
    },
  ];

  const recentInvoices = [
    {
      id: "INV-2024-001",
      agency: "Ministry of Health",
      amount: "GHS 45,000",
      date: "2024-01-15",
      status: "paid",
    },
    {
      id: "INV-2024-002",
      agency: "Ministry of Education",
      amount: "GHS 120,000",
      date: "2024-01-10",
      status: "pending",
    },
    {
      id: "INV-2024-003",
      agency: "Ghana Highways Authority",
      amount: "GHS 230,000",
      date: "2024-01-05",
      status: "rejected",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-oaia-light flex">
      <ContractorSidebar />
      <div className="flex-1 flex flex-col">
        <OnboardingModal
          isOpen={showOnboardingModal}
          onClose={() => setShowOnboardingModal(false)}
          userType="contractor"
        />
        {/* Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/">
              <Logo />
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-oaia-gray">
                Contractor Dashboard
              </span>
              <Link to="/">
                <Button variant="outline" size="sm">
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </header>
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 flex-1">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, Contractor!
            </h1>
            <p className="text-oaia-gray mt-1">
              Track your invoices and payments
            </p>
          </div>
          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {contractorStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-oaia-gray">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Recent Invoices */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Your latest invoice submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Agency
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Submitted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentInvoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {invoice.id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {invoice.agency}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {invoice.amount}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {invoice.date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          {/* Quick Actions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Manage your invoices and account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <Button asChild>
                <Link
                  to="/create-invoice"
                  className="flex items-center space-x-2 w-full justify-center"
                >
                  <FileText className="h-4 w-4" />
                  <span>Create New Invoice</span>
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link
                  to="/contractor/settings"
                  className="flex items-center space-x-2 w-full justify-center"
                >
                  <ListChecks className="h-4 w-4" />
                  <span>Update Compliance Docs</span>
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link
                  to="/contractor/invoices"
                  className="flex items-center space-x-2 w-full justify-center"
                >
                  <DollarSign className="h-4 w-4" />
                  <span>View All Invoices</span>
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link
                  to="/contractor/advances"
                  className="flex items-center space-x-2 w-full justify-center"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>Request Advance Payment</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContractorDashboard;
