import React, { useEffect, useState } from "react";
import { FiPrinter, FiHelpCircle, FiXCircle } from "react-icons/fi";
import { FaCreditCard } from "react-icons/fa";

import OrderStatusTracker from "./OrderStatusTracker";
import OrderProductsDetails from "./OrderProductsDetails";
import { useParams, useSearchParams } from "react-router";
import StatusCard from "./StatusCard";
import dateFormatter from "../../../utils/dateFormatter";
import formatToINR from "../../../utils/formatToINR";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderByOrderId } from "../../../store/actions";
import OrderDetailsSkeleton from "./OrderDetailsSkelton";
import PathNavigator from "../../shared/PathNavigator";

// --- STATIC DATA ---

const OrderDetailsPage = () => {
  const getStatusClass = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800";

      case "SHIPPED":
        return "bg-blue-100 text-blue-800";

      case "CONFIRMED": // Added this case
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

  const validStatuses = [
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "RETURNED",
  ];
  const { orderIdParam } = useParams();
  console.log("Order Id Param is " + orderIdParam);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentOrder: order } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrderByOrderId(orderIdParam, setLoading, setError));
  }, [orderIdParam, dispatch]);

  return loading ? (
    <OrderDetailsSkeleton />
  ) : error ? (
    <div>Some Error Occured</div>
  ) : (
    <div className="bg-gray-50 min-h-screen font-sans p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
          <PathNavigator orderId={orderIdParam} />
        </div>
        {/* --- THIS IS THE UPDATED HEADER SECTION --- */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-5 md:gap-8 items-start">
          {/* Left Side: Header Info */}
          <div className="md:col-span-2 mb-6 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Order Details
            </h1>
            <p className="text-sm text-gray-500 mt-1">Order #{order.orderId}</p>
            <p className="text-sm text-gray-500">
              Placed on {dateFormatter(order.createdAt)}
            </p>
            <div className="mt-4 pt-4 border-t">
              <span
                className={`text-sm font-bold py-1 px-3 rounded-full inline-block ${getStatusClass(
                  order.status
                )}`}
              >
                {order.status.replace("_", " ")}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-3 mt-4">
              <button className="flex items-center justify-center sm:justify-start bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition w-full sm:w-auto">
                <FiPrinter className="mr-2" /> Invoice
              </button>
              <button className="flex items-center justify-center sm:justify-start bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto">
                <FiHelpCircle className="mr-2" /> Need Help?
              </button>

              {order.status === "SHIPPED" ||
                (order.status === "CONFIRMED" && (
                  <button className="flex items-center justify-center sm:justify-start text-red-600 hover:bg-red-50 px-4 py-2 rounded-md transition-colors font-medium w-full sm:w-auto">
                    <FiXCircle className="mr-1.5" />
                    <span>Cancel Order</span>
                  </button>
                ))}
            </div>
          </div>

          {validStatuses.includes(order.status) ? (
            <div className="md:col-span-3 md:self-center">
              <OrderStatusTracker currentStatus={order.status} />
            </div>
          ) : (
            <div className="w-full sm:col-span-4 md:col-span-3 md:order-2 md:flex md:justify-center md:items-center">
              <StatusCard status={order.status} />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <OrderProductsDetails items={order.orderItems} />

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Shipping Address
              </h3>
              <div className="text-gray-600 space-y-1">
                <p className="font-semibold">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.buildingName}</p>
                <p>{order.shippingAddress.locality}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                  {order.shippingAddress.zipcode}
                </p>
                <p>India</p>

                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {order.shippingAddress.mobileNumber}
                </p>
              </div>
            </div>

            {/* Order Summary Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Order Summary
              </h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatToINR(order.subTotal)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatToINR(order.discount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>{" "}
                  <span>{formatToINR(order.shipping)}</span>
                </div>

                <div className="border-t my-2"></div>
                <div className="flex justify-between font-bold text-xl text-gray-900">
                  <span>Grand Total</span>
                  <span>{formatToINR(order.totalAmount)}</span>
                </div>
              </div>
              <div className="flex items-center mt-4 pt-4 border-t text-gray-600">
                <FaCreditCard className="mr-3 text-lg" />
                <span>Paid with {order.payment.method}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
