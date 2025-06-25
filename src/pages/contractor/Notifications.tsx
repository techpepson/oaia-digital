
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/Logo';
import ContractorSidebar from '@/components/ContractorSidebar';
import NotificationFilters from '@/components/contractor/NotificationFilters';
import NotificationList from '@/components/contractor/NotificationList';
import { Bell, Menu, X } from 'lucide-react';

const Notifications = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Invoice Approved',
      message: 'Your invoice INV002 for School Infrastructure project has been approved by Ministry of Education.',
      time: '2 hours ago',
      read: false,
      invoiceId: 'INV002'
    },
    {
      id: 2,
      type: 'info',
      title: 'Advance Payment Processing',
      message: 'Your advance payment request for INV001 (KES 225,000) is currently being processed.',
      time: '1 day ago',
      read: false,
      invoiceId: 'INV001'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Additional Documents Required',
      message: 'Please provide additional certification documents for INV003. Check the requirements in your invoice details.',
      time: '2 days ago',
      read: true,
      invoiceId: 'INV003'
    },
    {
      id: 4,
      type: 'success',
      title: 'Payment Received',
      message: 'Payment of KES 175,000 has been successfully transferred to your account for invoice INV004.',
      time: '3 days ago',
      read: true,
      invoiceId: 'INV004'
    },
    {
      id: 5,
      type: 'info',
      title: 'Document Verification Complete',
      message: 'All documents for your company profile have been verified successfully.',
      time: '1 week ago',
      read: true,
      invoiceId: null
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-oaia-light flex">
      <ContractorSidebar isCollapsed={sidebarCollapsed} />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </Button>
              <Link to="/">
                <Logo showText={false} />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-oaia-gray">Welcome back, John Doe</span>
              <Button variant="outline" size="sm">Logout</Button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Bell className="h-8 w-8 mr-3 text-oaia-blue" />
                Notifications
                {unreadCount > 0 && (
                  <Badge className="ml-3 bg-oaia-orange text-white">
                    {unreadCount} new
                  </Badge>
                )}
              </h1>
              <p className="text-oaia-gray mt-1">Stay updated with your invoice status and important alerts</p>
            </div>
            <NotificationFilters 
              filter={filter}
              setFilter={setFilter}
              unreadCount={unreadCount}
            />
          </div>

          <NotificationList 
            notifications={filteredNotifications}
            filter={filter}
          />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
