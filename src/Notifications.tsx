import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { X } from 'lucide-react';
import './Notifications.scss';

interface Notification {
  id: string;
  title: string;
  description: string;
}

interface NotificationsProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export function Notifications({ notifications, onDismiss }: NotificationsProps) {
  return (
    <div className="fixed bottom-4 right-4 space-y-2 max-w-sm z-50">
      {notifications.map((notification) => (
        <Alert key={notification.id} className="bg-white shadow-lg">
          <AlertTitle className="flex justify-between items-center">
            {notification.title}
            <button onClick={() => onDismiss(notification.id)} className="text-gray-500 hover:text-gray-700">
              <X size={16} />
            </button>
          </AlertTitle>
          <AlertDescription>{notification.description}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
}

