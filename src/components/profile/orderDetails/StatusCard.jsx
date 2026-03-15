import React from "react";
import {
  FiAlertTriangle,
  FiClock,
  FiCreditCard,
  FiXCircle,
  FiShoppingCart,
} from "react-icons/fi";

const StatusCard = ({ status }) => {
  // The configuration is now mapped to your specific status keys.
  const statusConfig = {
    PENDING_PAYMENT: {
      icon: <FiClock className="mr-3 text-yellow-600" size={24} />,
      title: "Payment Pending",
      message:
        "We are currently awaiting confirmation for your payment. No action is needed from your side.",
      buttonText: null,
      buttonIcon: null,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800",
      borderColor: "border-yellow-300",
    },
    PAYMENT_FAILED: {
      icon: <FiAlertTriangle className="mr-3 text-red-500" size={24} />,
      title: "Payment Failed",
      message:
        "There was an issue processing your payment. Please try again to complete your order.",
      buttonText: "Retry Payment",
      buttonIcon: <FiCreditCard className="mr-2" />,
      bgColor: "bg-red-50",
      textColor: "text-red-800",
      borderColor: "border-red-300",
    },
    CANCELLED: {
      icon: <FiXCircle className="mr-3 text-gray-500" size={24} />,
      title: "Order Cancelled",
      message:
        "This order has been cancelled. If you believe this is an error, please contact support.",
      buttonText: "Order Again",
      buttonIcon: <FiShoppingCart className="mr-2" />,
      bgColor: "bg-gray-100",
      textColor: "text-gray-700",
      borderColor: "border-gray-300",
    },
    // A default case for any unexpected status
    default: {
      icon: <FiAlertTriangle className="mr-3" size={24} />,
      title: "Attention Required",
      message: "This order requires your attention.",
      buttonText: null,
      buttonIcon: null,
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
      borderColor: "border-gray-300",
    },
  };

  // Select the correct configuration based on the status prop, or use the default.
  const currentStatus = statusConfig[status] || statusConfig.default;

  return (
    <div
      className={`p-6 rounded-lg shadow-md mb-8 border-l-4 ${currentStatus.borderColor} ${currentStatus.bgColor}`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div className="flex-1">
          <div
            className={`flex items-center font-bold text-lg ${currentStatus.textColor}`}
          >
            {currentStatus.icon}
            <span>{currentStatus.title}</span>
          </div>
          <p className={`mt-2 text-sm ${currentStatus.textColor}`}>
            {currentStatus.message}
          </p>
        </div>

        {currentStatus.buttonText && (
          <button className="mt-4 sm:mt-0 sm:ml-6 bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition flex items-center text-sm font-medium flex-shrink-0">
            {currentStatus.buttonIcon} {currentStatus.buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
