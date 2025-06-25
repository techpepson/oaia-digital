
import React from 'react';
import { Button } from '@/components/ui/button';

interface NotificationFiltersProps {
  filter: string;
  setFilter: (filter: string) => void;
  unreadCount: number;
}

const NotificationFilters: React.FC<NotificationFiltersProps> = ({ 
  filter, 
  setFilter, 
  unreadCount 
}) => {
  return (
    <div className="flex space-x-3">
      <Button 
        variant="outline" 
        onClick={() => setFilter('all')} 
        className={filter === 'all' ? 'bg-oaia-blue text-white' : ''}
      >
        All
      </Button>
      <Button 
        variant="outline" 
        onClick={() => setFilter('unread')}
        className={filter === 'unread' ? 'bg-oaia-blue text-white' : ''}
      >
        Unread ({unreadCount})
      </Button>
      <Button 
        variant="outline" 
        onClick={() => setFilter('read')}
        className={filter === 'read' ? 'bg-oaia-blue text-white' : ''}
      >
        Read
      </Button>
    </div>
  );
};

export default NotificationFilters;
