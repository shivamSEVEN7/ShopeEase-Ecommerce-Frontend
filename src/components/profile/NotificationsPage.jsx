import React, { useState } from "react";
import { FiShoppingCart, FiTag, FiUser, FiCheckCircle } from "react-icons/fi";

// Initial data for notifications
const initialNotifications = [
  {
    id: 1,
    title: "Order Shipped",
    message: "Your order #SH12345 for boAt Airdopes has been shipped.",
    type: "ORDER",
    isRead: false,
    createdAt: "2025-10-03T12:00:00Z",
  },
  {
    id: 2,
    title: "New Offer Unlocked",
    message: "You have a 20% discount coupon waiting for you. Use code: EASE20",
    type: "OFFER",
    isRead: false,
    createdAt: "2025-10-03T16:30:00Z",
  },
  {
    id: 3,
    title: "Security Alert",
    message: "Your password was successfully updated from a new device.",
    type: "ACCOUNT",
    isRead: true,
    createdAt: "2025-10-02T10:00:00Z",
  },
];

// Helper for icons and colors
const notificationConfig = {
  order: { icon: <FiShoppingCart />, color: "bg-green-100 text-green-600" },
  offer: { icon: <FiTag />, color: "bg-purple-100 text-purple-600" },
  account: { icon: <FiUser />, color: "bg-blue-100 text-blue-600" },
};

// Custom function to format the creation timestamp
const formatCreationTimestamp = (isoDateString) => {
  const notificationDate = new Date(isoDateString);
  const today = new Date();
  const isToday = notificationDate.toDateString() === today.toDateString();
  if (isToday) {
    return notificationDate.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } else {
    return notificationDate.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
};

const NotificationsPage = () => {
  // --- 1. Manage notifications in state ---
  const [notifications, setNotifications] = useState(initialNotifications);

  // --- 2. Function to handle marking a single notification as read ---
  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
          <button className="flex items-center text-sm font-semibold text-blue-500 hover:text-blue-700">
            <FiCheckCircle className="mr-2" />
            Mark all as read
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => {
              const config =
                notificationConfig[notification.type.toLowerCase()] || {};
              return (
                <div
                  key={notification.id}
                  className={`p-4 flex items-start transition-colors duration-200 ${
                    !notification.isRead
                      ? "bg-blue-50 hover:bg-blue-100"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center mr-4 ${config.color}`}
                  >
                    {config.icon}
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {notification.message}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-gray-500">
                        {formatCreationTimestamp(notification.createdAt)}
                      </p>
                      {/* --- 3. Conditionally render the "Mark as read" button --- */}
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-xs font-semibold text-blue-600 hover:underline"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                  {!notification.isRead && (
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0 mt-1.5 ml-4"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
