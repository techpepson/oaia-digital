
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  Upload, 
  CreditCard, 
  Bell, 
  FileBarChart, 
  Settings,
  Building2
} from 'lucide-react';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', href: '/dashboard/contractor', icon: LayoutDashboard },
  { label: 'Submit Invoice', href: '/create-invoice', icon: Upload },
  { label: 'My Invoices', href: '/contractor/invoices', icon: FileText, count: 12 },
  { label: 'Advances/Payments', href: '/contractor/advances', icon: CreditCard },
  { label: 'Notifications', href: '/contractor/notifications', icon: Bell, count: 3 },
  { label: 'Reports/Exports', href: '/contractor/reports', icon: FileBarChart },
  { label: 'Account/Settings', href: '/contractor/settings', icon: Settings },
];

interface ContractorSidebarProps {
  isCollapsed?: boolean;
}

const ContractorSidebar: React.FC<ContractorSidebarProps> = ({ isCollapsed = false }) => {
  const location = useLocation();

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <Building2 className="h-8 w-8 text-oaia-blue" />
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-gray-900">Contractor Portal</h2>
              <p className="text-sm text-oaia-gray">Your Business Hub</p>
            </div>
          )}
        </div>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-1 px-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-oaia-blue text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "mr-3")} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.count && (
                        <span className={cn(
                          "px-2 py-1 text-xs rounded-full",
                          isActive ? "bg-white/20" : "bg-oaia-blue text-white"
                        )}>
                          {item.count}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default ContractorSidebar;
