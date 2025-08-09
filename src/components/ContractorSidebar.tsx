import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  Upload, 
  CreditCard, 
  Bell, 
  FileBarChart, 
  Settings,
  Building2,
  Banknote,
  LogOut
} from 'lucide-react';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
  subItems?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', href: '/dashboard/contractor', icon: LayoutDashboard },
  { label: 'Submit Invoice', href: '/create-invoice', icon: Upload },
  { label: 'My Invoices', href: '/contractor/invoices', icon: FileText, count: 12 },
  { label: 'Advances/Payments', href: '/contractor/advances', icon: CreditCard },
  { label: 'Notifications', href: '/contractor/notifications', icon: Bell, count: 3 },
  { label: 'Reports/Exports', href: '/contractor/reports', icon: FileBarChart },
  { 
    label: 'Account', 
    href: '/contractor/settings', 
    icon: Settings,
    subItems: [
      { label: 'Profile Settings', href: '/contractor/settings', icon: Settings },
      { label: 'Bank Details', href: '/contractor/bank-details', icon: Banknote }
    ]
  },
];

interface ContractorSidebarProps {
  isCollapsed?: boolean;
}

const ContractorSidebar: React.FC<ContractorSidebarProps> = ({ isCollapsed = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({});

  const toggleExpand = (href: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [href]: !prev[href]
    }));
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-full",
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
      
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.subItems?.some(subItem => subItem.href === location.pathname)) || false;
            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedItems[item.href] ?? false;
            
            return (
              <li key={item.href}>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <Link
                      to={hasSubItems ? '#' : item.href}
                      onClick={(e) => {
                        if (hasSubItems) {
                          e.preventDefault();
                          toggleExpand(item.href);
                        }
                      }}
                      className={cn(
                        "flex-1 flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-oaia-blue text-white" 
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <Icon className={cn("h-5 w-5 flex-shrink-0", isCollapsed ? "mx-auto" : "mr-3")} />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          {item.count && (
                            <span className={cn(
                              "px-2 py-1 text-xs rounded-full ml-2",
                              isActive ? "bg-white/20" : "bg-oaia-blue text-white"
                            )}>
                              {item.count}
                            </span>
                          )}
                          {hasSubItems && (
                            <svg
                              className={`ml-2 h-4 w-4 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </>
                      )}
                    </Link>
                  </div>
                  {!isCollapsed && hasSubItems && isExpanded && (
                    <ul className="ml-8 mt-1 space-y-1">
                      {item.subItems?.map((subItem) => {
                        const isSubItemActive = location.pathname === subItem.href;
                        const SubItemIcon = subItem.icon;
                        
                        return (
                          <li key={subItem.href}>
                            <Link
                              to={subItem.href}
                              className={cn(
                                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isSubItemActive 
                                  ? "bg-oaia-blue/10 text-oaia-blue" 
                                  : "text-gray-600 hover:bg-gray-100"
                              )}
                            >
                              <SubItemIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span>{subItem.label}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <LogOut className={cn("h-5 w-5 flex-shrink-0", isCollapsed ? "mx-auto" : "mr-3")} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default ContractorSidebar;
