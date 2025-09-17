// OAIA Digital - Ministry Analytics
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Logo from "@/components/Logo";
import { BarChart3, TrendingUp, FileText, Users } from "lucide-react";
import MinistrySidebar from "@/components/MinistrySidebar";

const analytics = [
  {
    icon: BarChart3,
    title: "Spending Trends",
    value: "GHS 45.2M",
    description: "+12% from last month",
  },
  {
    icon: TrendingUp,
    title: "Budget Utilization",
    value: "82%",
    description: "On track for FY 2024",
  },
  {
    icon: FileText,
    title: "Reports Generated",
    value: "24",
    description: "This quarter",
  },
  {
    icon: Users,
    title: "Active Agencies",
    value: "24",
    description: "4 require attention",
  },
];

const Analytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
                Ministry of Finance - Analytics
              </span>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8 flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-oaia-gray mt-1">
              Key financial and operational analytics
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {analytics.map((a, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                    <a.icon className="h-5 w-5 mr-2 text-oaia-blue" />
                    {a.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{a.value}</div>
                  <p className="text-xs text-green-600 flex items-center">
                    {a.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
