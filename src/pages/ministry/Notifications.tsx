// OAIA Digital - Ministry Notifications
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
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/Logo";
import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react";
import MinistrySidebar from "@/components/MinistrySidebar";

const notifications = [
  {
    id: 1,
    type: "info",
    title: "System Update",
    message:
      "The Ministry dashboard will undergo maintenance on Saturday at 10pm.",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "success",
    title: "Budget Approved",
    message: "The 2024 budget for GETFund has been approved.",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "warning",
    title: "Threshold Alert",
    message: "Road Fund is approaching 85% of its allocated budget.",
    time: "1 day ago",
  },
  {
    id: 4,
    type: "error",
    title: "Overdue Payment",
    message: "3 invoices are pending approval for over 5 days.",
    time: "2 days ago",
  },
];

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertTriangle,
};

const colorMap = {
  info: "text-blue-600",
  success: "text-green-600",
  warning: "text-yellow-600",
  error: "text-red-600",
};

const Notifications = () => {
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
                Ministry of Finance - Notifications
              </span>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8 flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-oaia-gray mt-1">
              Latest system and finance notifications
            </p>
          </div>
          <div className="grid gap-4">
            {notifications.map((n) => {
              const Icon = iconMap[n.type];
              return (
                <Card key={n.id}>
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Icon className={`h-5 w-5 mr-2 ${colorMap[n.type]}`} />
                      {n.title}
                    </CardTitle>
                    <Badge variant="outline" className={colorMap[n.type]}>
                      {n.type.toUpperCase()}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-gray-700 mb-1">{n.message}</div>
                    <div className="text-xs text-gray-400">{n.time}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
