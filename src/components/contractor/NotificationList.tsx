
// OAIA Digital - Contractor Notification List Component
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bell } from 'lucide-react';
import NotificationCard from './NotificationCard';

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  invoiceId: string | null;
}

interface NotificationListProps {
  notifications: Notification[];
  filter: string;
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, filter }) => {
  if (notifications.length === 0) {
    return (
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
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationList;
