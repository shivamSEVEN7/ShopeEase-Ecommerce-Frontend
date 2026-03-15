import React, { useState } from "react";
import { FiChevronRight, FiSearch } from "react-icons/fi";
// import { Link } from 'react-router-dom';

// Mock data representing individual Order Items
const mockOrderItems = [
  {
    orderItemId: 1024,
    orderId: 501,
    productId: 210,
    productName: "Wireless Bluetooth Headphones",
    sellerId: 34,
    quantity: 2,
    price: 2499.0,
    orderItemStatus: "SENT_TO_WAREHOUSE",
    totalPrice: 4998.0,
    createdAt: "2025-10-28T19:40:00",
    buyerName: "Rohan Kumar",
  },
  {
    orderItemId: 1025,
    orderId: 501,
    productId: 155,
    productName: "Smartphone Stand",
    sellerId: 34,
    quantity: 1,
    price: 599.0,
    orderItemStatus: "SENT_TO_WAREHOUSE",
    totalPrice: 599.0,
    createdAt: "2025-10-28T19:40:00",
    buyerName: "Rohan Kumar",
  },
  {
    orderItemId: 1023,
    orderId: 500,
    productId: 98,
    productName: "Laptop Sleeve",
    sellerId: 34,
    quantity: 1,
    price: 149.5,
    orderItemStatus: "SHIPPED",
    totalPrice: 149.5,
    createdAt: "2025-10-28T11:20:00",
    buyerName: "Sarah Jain",
  },
  {
    orderItemId: 1022,
    orderId: 499,
    productId: 301,
    productName: "Gaming Mouse",
    sellerId: 34,
    quantity: 1,
    price: 320.0,
    orderItemStatus: "DELIVERED",
    totalPrice: 320.0,
    createdAt: "2025-10-27T09:00:00",
    buyerName: "Mike Thompson",
  },
  {
    orderItemId: 1021,
    orderId: 498,
    productId: 42,
    productName: "USB C Cable",
    sellerId: 34,
    quantity: 1,
    price: 24.75,
    orderItemStatus: "CANCELLED",
    totalPrice: 24.75,
    createdAt: "2025-10-26T14:30:00",
    buyerName: "Priya Patel",
  },
];

// --- Helper Functions ---

// Gets badge colors based on statuses
const getStatusClasses = (status) => {
  switch (status) {
    case "SENT_TO_WAREHOUSE":
      return "bg-yellow-100 text-yellow-800";
    case "SHIPPED":
      return "bg-blue-100 text-blue-800";
    case "DELIVERED":
      return "bg-green-100 text-green-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Formats statuses like 'SENT_TO_WAREHOUSE' to 'Sent To Warehouse'
const formatStatusText = (status) => {
  if (!status) return "";
  return status
    .replace(/_/g, " ") // Replace all underscores
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

// Formats ISO date strings to "Oct 28, 2025"
const formatDate = (isoString) => {
  if (!isoString) return "";
  return new Date(isoString).toLocaleDateString("en-US", {
    // Use 'en-IN' for India locale
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

// Formats number prices to "₹4,998.00" (adjust locale and currency)
const formatPrice = (price) => {
  if (price === undefined || price === null) return "";
  return price.toLocaleString("en-IN", {
    // Changed to 'en-IN' for Indian Rupee format
    style: "currency",
    currency: "INR", // Changed to 'INR'
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
// --- End Helper Functions ---

const SellerOrdersPage = () => {
  const [activeTab, setActiveTab] = useState("All");

  // Updated tab names to match your statuses
  const tabs = [
    "All",
    "SENT_TO_WAREHOUSE",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];

  // Filter based on orderItemStatus
  const filteredOrderItems =
    activeTab === "All"
      ? mockOrderItems
      : mockOrderItems.filter((item) => item.orderItemStatus === activeTab);

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Order Items</h1>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        {/* Filter Tabs and Search */}
        <div className="flex flex-col items-center justify-between gap-4 border-b border-gray-200 pb-4 md:flex-row">
          {/* Tabs */}
          <div className="flex w-full overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 whitespace-nowrap px-4 py-2 text-sm font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-indigo-600 text-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "All" ? "All" : formatStatusText(tab)}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative w-full md:w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiSearch className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="search"
              placeholder="Search by Item ID or Order ID..."
              className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Order Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* Updated Headers */}
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Item ID / Order ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Buyer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Total Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredOrderItems.length > 0 ? (
                filteredOrderItems.map((item) => (
                  <tr key={item.orderItemId} className="hover:bg-gray-50">
                    {" "}
                    {/* Key uses orderItemId */}
                    {/* Updated Data Cells */}
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <div className="font-medium text-gray-900">
                        #{item.orderItemId} {/* Main ID is orderItemId */}
                      </div>
                      <div className="text-gray-500">
                        (Order #{item.orderId})
                      </div>{" "}
                      {/* Parent Order ID */}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {item.productName} (Qty: {item.quantity})
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {item.buyerName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {formatPrice(item.totalPrice)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 ${getStatusClasses(
                          item.orderItemStatus
                        )}`}
                      >
                        {formatStatusText(item.orderItemStatus)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      {/* Link still points to the parent order ID */}
                      {/* Use <Link to={`/seller/orders/${item.orderId}`}> */}
                      <a
                        href="#"
                        className="flex items-center text-indigo-600 hover:text-indigo-900"
                      >
                        View Order
                        <FiChevronRight className="ml-1 h-4 w-4" />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7" // Increased colspan
                    className="py-12 text-center text-gray-500"
                  >
                    No order items found for this status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SellerOrdersPage;
