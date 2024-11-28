import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { X } from 'lucide-react';

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
        <Alert key={notification.id} className="bg-[#2c2a4e] border-[#68599f] text-white">
          <AlertTitle className="flex justify-between items-center text-[#68599f]">
            {notification.title}
            <button onClick={() => onDismiss(notification.id)} className="text-gray-300 hover:text-white">
              <X size={16} />
            </button>
          </AlertTitle>
          <AlertDescription className="text-gray-300">{notification.description}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
}

