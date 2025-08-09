import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  DollarSign,
  FileText,
  BarChart3,
  Bell,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MinistrySidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const MinistrySidebar = ({ isCollapsed, onToggle }: MinistrySidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/ministry" },
    { icon: Building2, label: "Agencies", path: "/ministry/agencies" },
    {
      icon: DollarSign,
      label: "Funding Management",
      path: "/ministry/funding",
    },
    { icon: FileText, label: "Budget Reports", path: "/ministry/reports" },
    { icon: BarChart3, label: "Analytics", path: "/ministry/analytics" },
    { icon: Bell, label: "Notifications", path: "/ministry/notifications" },
    { icon: Settings, label: "Settings", path: "/ministry/settings" },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-full",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-oaia-blue">
              Ministry Portal
            </h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="hover:bg-oaia-light"
          >
            {isCollapsed ? (
              <Menu className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-oaia-blue text-white"
                      : "text-oaia-gray hover:bg-oaia-light hover:text-oaia-blue",
                    isCollapsed && "justify-center"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isCollapsed ? "" : "mr-3")} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            "text-oaia-gray hover:bg-oaia-light hover:text-oaia-blue",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <LogOut className={cn("h-5 w-5", isCollapsed ? "" : "mr-3")} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default MinistrySidebar;
