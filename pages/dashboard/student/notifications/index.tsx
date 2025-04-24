import React, { useEffect, useState } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch('/api/student/notifications');
      const data = await response.json();
      setNotifications(data.notifications);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notifications">
      <h2 className="text-xl font-semibold">Notifications</h2>
      <ul className="space-y-2">
        {notifications.map((notification, index) => (
          <li key={index} className="p-4 border border-gray-200 rounded-lg">
            {notification}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
