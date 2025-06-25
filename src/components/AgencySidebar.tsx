
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Clock, 
  CheckCircle, 
  XCircle, 
  CreditCard, 
  FileText, 
  FolderOpen, 
  BarChart3, 
  Bell, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AgencySidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const AgencySidebar = ({ isCollapsed, onToggle }: AgencySidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/agency' },
    { icon: Clock, label: 'Pending Invoices', path: '/agency/pending-invoices' },
    { icon: CheckCircle, label: 'Approved Invoices', path: '/agency/approved-invoices' },
    { icon: XCircle, label: 'Rejected Invoices', path: '/agency/rejected-invoices' },
    { icon: CreditCard, label: 'Payments', path: '/agency/payments' },
    { icon: FileText, label: 'Fund Requests', path: '/agency/fund-requests' },
    { icon: FolderOpen, label: 'Contracts', path: '/agency/contracts' },
    { icon: BarChart3, label: 'Reports', path: '/agency/reports' },
    { icon: Bell, label: 'Notifications', path: '/agency/notifications' },
    { icon: Settings, label: 'Settings', path: '/agency/settings' },
  ];

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-oaia-blue">Agency Portal</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="hover:bg-oaia-light"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
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
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default AgencySidebar;
