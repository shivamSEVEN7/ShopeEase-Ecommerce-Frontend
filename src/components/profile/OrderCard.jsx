import React from "react";
import OrderItem from "./OrderItem";
import { FiRefreshCw } from "react-icons/fi";
import dateFormatter from "../../utils/dateFormatter";
import formatToINR from "../../utils/formatToINR";
import { Link } from "react-router";

const OrderCard = ({ order }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800";

      case "SHIPPED":
        return "bg-blue-100 text-blue-800";

      case "CONFIRMED":
        return "bg-purple-100 text-purple-800";

      case "PROCESSING":
        return "bg-yellow-100 text-yellow-800";

      case "PENDING_PAYMENT":
        return "bg-orange-100 text-orange-800";

      case "CANCELLED":
      case "PAYMENT_FAILED":
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b">
        <div>
          <p className="text-sm font-semibold text-gray-800">
            ORDER #{order.orderId}
          </p>
          <p className="text-xs text-gray-500">
            Placed on {dateFormatter(order.createdAt)}
          </p>
        </div>
        <p className="text-sm font-bold text-gray-800 mt-2 sm:mt-0">
          Total: {formatToINR(order.totalAmount)}
        </p>
      </div>
      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
          <div className="flex items-center gap-3">
            <p
              className={`text-sm font-bold py-1 px-3 rounded-full inline-block ${getStatusClass(
                order.status
              )}`}
            >
              {order.status.replace("_", " ")}
            </p>

            {order.status === "PENDING_PAYMENT" && (
              <button className="flex items-center gap-1.5 text-sm font-semibold text-green-600 hover:text-green-800 transition-colors">
                <FiRefreshCw size={14} />
                Retry Payment
              </button>
            )}

            {(order.status === "CANCELLED" ||
              order.status === "PAYMENT_FAILED") && (
              <button className="flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-800 transition-colors">
                <FiRefreshCw size={14} />
                Place New Order
              </button>
            )}
          </div>

          {/* Right side: View Details button */}
          {/* `mt-4` adds space on mobile, `sm:mt-0` removes it on larger screens */}
          <div className="flex sm:justify-end mt-4 sm:mt-0">
            <Link
              to={`/account/orders/view/${order.orderId}`}
              className="w-full sm:w-auto"
            >
              <button className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md px-4 py-2 transition-colors w-full">
                View Details
              </button>
            </Link>
          </div>
        </div>
        <div className="border-t divide-y">
          {order.orderItems.map((item) => (
            <OrderItem key={item.id} item={item} orderStatus={order.status} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
