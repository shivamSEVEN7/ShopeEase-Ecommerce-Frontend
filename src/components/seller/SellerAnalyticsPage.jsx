import React from "react";
import {
  FiShoppingCart,
  FiDollarSign,
  FiPackage,
  FiXCircle,
  FiStar,
} from "react-icons/fi";

const analyticsData = {
  totalOrders: 245,
  totalRevenue: 872350.75,
  totalProductsSold: 1340,
  totalCancelled: 18,
  averageRating: 4.6,
};

const StatCard = ({ title, value, icon }) => (
  <div className="rounded-lg bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <span className="rounded-full bg-gray-100 p-2">{icon}</span>
    </div>
    <div className="mt-2">
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const formatPrice = (price) => {
  return price.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const SellerAnalyticsPage = () => {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Analytics</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard
          title="Total Revenue"
          value={formatPrice(analyticsData.totalRevenue)}
          icon={<FiDollarSign className="text-green-500" />}
        />
        <StatCard
          title="Total Orders"
          value={analyticsData.totalOrders.toLocaleString("en-IN")}
          icon={<FiShoppingCart className="text-blue-500" />}
        />
        <StatCard
          title="Products Sold"
          value={analyticsData.totalProductsSold.toLocaleString("en-IN")}
          icon={<FiPackage className="text-purple-500" />}
        />
        <StatCard
          title="Cancelled Orders"
          value={analyticsData.totalCancelled.toLocaleString("en-IN")}
          icon={<FiXCircle className="text-red-500" />}
        />
        <StatCard
          title="Average Rating"
          value={`${analyticsData.averageRating.toFixed(1)} ★`}
          icon={<FiStar className="text-yellow-500" />}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            Revenue Over Time
          </h3>
          <div className="flex h-80 w-full items-center justify-center rounded-md bg-gray-100 text-gray-500">
            [ Revenue Chart Component Goes Here ]
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            Top Selling Products
          </h3>
          <div className="flex h-80 w-full items-center justify-center rounded-md bg-gray-100 text-gray-500">
            [ Top Products Chart/List Component Goes Here ]
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerAnalyticsPage;
