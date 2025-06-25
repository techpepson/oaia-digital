
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/Logo';
import ContractorSidebar from '@/components/ContractorSidebar';
import { CheckCircle, AlertCircle, Info, Clock, Menu, X, Bell, Mail } from 'lucide-react';

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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationBg = (type: string, read: boolean) => {
    const opacity = read ? '50' : '100';
    switch (type) {
      case 'success': return `bg-green-${opacity} border-green-200`;
      case 'warning': return `bg-yellow-${opacity} border-yellow-200`;
      case 'info': return `bg-blue-${opacity} border-blue-200`;
      default: return `bg-gray-${opacity} border-gray-200`;
    }
  };

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
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setFilter('all')} 
                      className={filter === 'all' ? 'bg-oaia-blue text-white' : ''}>
                All
              </Button>
              <Button variant="outline" onClick={() => setFilter('unread')}
                      className={filter === 'unread' ? 'bg-oaia-blue text-white' : ''}>
                Unread ({unreadCount})
              </Button>
              <Button variant="outline" onClick={() => setFilter('read')}
                      className={filter === 'read' ? 'bg-oaia-blue text-white' : ''}>
                Read
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-oaia-blue' : ''} hover:shadow-md transition-shadow`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-lg font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-oaia-gray">{notification.time}</span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-oaia-blue rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className={`text-sm ${!notification.read ? 'text-gray-700' : 'text-gray-500'} mb-3`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {notification.invoiceId && (
                            <Badge variant="outline" className="text-xs">
                              {notification.invoiceId}
                            </Badge>
                          )}
                          <Badge className={`text-xs ${
                            notification.type === 'success' ? 'bg-green-100 text-green-800' :
                            notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          {notification.invoiceId && (
                            <Button variant="ghost" size="sm" className="text-oaia-blue">
                              View Invoice
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            {notification.read ? (
                              <Mail className="h-4 w-4" />
                            ) : (
                              <CheckCircle className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                <p className="text-oaia-gray">
                  {filter === 'unread' ? 'You have no unread notifications.' : 
                   filter === 'read' ? 'You have no read notifications.' : 
                   'You have no notifications at this time.'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
