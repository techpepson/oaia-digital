
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Info, Bell, Mail } from 'lucide-react';

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  invoiceId: string | null;
}

interface NotificationCardProps {
  notification: Notification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className={`${!notification.read ? 'border-l-4 border-l-oaia-blue' : ''} hover:shadow-md transition-shadow`}>
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
  );
};

export default NotificationCard;
