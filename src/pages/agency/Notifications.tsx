
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Logo from '@/components/Logo';
import AgencySidebar from '@/components/AgencySidebar';
import { 
  Bell, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  FileText,
  DollarSign,
  Settings,
  Trash2,
  Eye,
  MarkAsUnread
} from 'lucide-react';

const Notifications = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'invoice_submitted',
      title: 'New Invoice Submitted',
      message: 'ABC Construction Ltd has submitted invoice INV-2024-011 for KES 450,000',
      timestamp: '2 hours ago',
      read: false,
      priority: 'high',
      contractor: 'ABC Construction Ltd',
      invoiceId: 'INV-2024-011',
      amount: 'KES 450,000'
    },
    {
      id: 2,
      type: 'budget_alert',
      title: 'Budget Limit Warning',
      message: 'Road Maintenance project has used 85% of allocated budget',
      timestamp: '4 hours ago',
      read: false,
      priority: 'medium',
      project: 'Road Maintenance 2024'
    },
    {
      id: 3,
      type: 'payment_overdue',
      title: 'Payment Overdue',
      message: 'Payment for INV-2024-003 is 7 days overdue',
      timestamp: '6 hours ago',
      read: true,
      priority: 'high',
      invoiceId: 'INV-2024-003',
      contractor: 'Tech Solutions Inc'
    },
    {
      id: 4,
      type: 'funding_received',
      title: 'Funding Allocation Received',
      message: 'KES 5,000,000 funding allocation received from Ministry of Finance',
      timestamp: '1 day ago',
      read: true,
      priority: 'low',
      amount: 'KES 5,000,000'
    },
    {
      id: 5,
      type: 'contract_milestone',
      title: 'Contract Milestone Due',
      message: 'Hospital Construction Phase 2 milestone due in 3 days',
      timestamp: '1 day ago',
      read: false,
      priority: 'medium',
      project: 'Hospital Construction Phase 2',
      dueDate: '2024-01-25'
    },
    {
      id: 6,
      type: 'system_alert',
      title: 'System Maintenance Scheduled',
      message: 'System maintenance scheduled for this weekend (Jan 27-28)',
      timestamp: '2 days ago',
      read: true,
      priority: 'low'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'invoice_submitted': return <FileText className="h-5 w-5 text-blue-600" />;
      case 'budget_alert': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'payment_overdue': return <Clock className="h-5 w-5 text-red-600" />;
      case 'funding_received': return <DollarSign className="h-5 w-5 text-green-600" />;
      case 'contract_milestone': return <CheckCircle className="h-5 w-5 text-purple-600" />;
      case 'system_alert': return <Settings className="h-5 w-5 text-gray-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'unread' && !notification.read) ||
                         (statusFilter === 'read' && notification.read);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

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
                <h1 className="text-xl font-semibold text-gray-900 flex items-center">
                  Notifications
                  {unreadCount > 0 && (
                    <Badge className="ml-2 bg-red-500 text-white">
                      {unreadCount} new
                    </Badge>
                  )}
                </h1>
                <p className="text-sm text-oaia-gray">Stay updated with system alerts and submissions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Notification Settings
              </Button>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-oaia-gray" />
                    <Input
                      placeholder="Search notifications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="invoice_submitted">Invoice Submissions</SelectItem>
                      <SelectItem value="budget_alert">Budget Alerts</SelectItem>
                      <SelectItem value="payment_overdue">Payment Overdue</SelectItem>
                      <SelectItem value="funding_received">Funding Updates</SelectItem>
                      <SelectItem value="contract_milestone">Contract Milestones</SelectItem>
                      <SelectItem value="system_alert">System Alerts</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Notifications</SelectItem>
                      <SelectItem value="unread">Unread Only</SelectItem>
                      <SelectItem value="read">Read Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Mark All as Read
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="h-12 w-12 text-oaia-gray mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                  <p className="text-oaia-gray">Try adjusting your filters or check back later.</p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card key={notification.id} className={`hover:shadow-md transition-shadow cursor-pointer ${!notification.read ? 'border-l-4 border-l-oaia-blue bg-blue-50/30' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-oaia-blue rounded-full"></div>
                            )}
                            <Badge className={getPriorityColor(notification.priority)}>
                              {notification.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-oaia-gray mb-2">{notification.message}</p>
                          <div className="flex items-center space-x-4 text-xs text-oaia-gray">
                            <span>{notification.timestamp}</span>
                            {notification.contractor && (
                              <span>• Contractor: {notification.contractor}</span>
                            )}
                            {notification.project && (
                              <span>• Project: {notification.project}</span>
                            )}
                            {notification.invoiceId && (
                              <span>• Invoice: {notification.invoiceId}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {!notification.read && (
                          <Button size="sm" variant="ghost">
                            <MarkAsUnread className="h-4 w-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
