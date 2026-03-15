import React from "react";
import {
  FiDollarSign,
  FiShoppingCart,
  FiPackage,
  FiExternalLink,
} from "react-icons/fi";
import { FaBoxes } from "react-icons/fa";

// --- Helper: StatCard ---
// In a real app, you might move this to its own file (e.g., StatCard.jsx)
const StatCard = ({ title, value, icon, change, changeColor }) => (
  <div className="rounded-lg bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <span className="rounded-full bg-gray-100 p-2">{icon}</span>
    </div>
    <div className="mt-2 flex items-baseline gap-2">
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      {change && (
        <span className={`text-sm font-semibold ${changeColor}`}>{change}</span>
      )}
    </div>
  </div>
);

// --- Helper: PendingOrder ---
// You could also move this to its own file
const PendingOrder = ({ id, items, total }) => (
  <li className="flex items-center justify-between border-b border-gray-100 py-3 last:border-b-0">
    <div>
      <p className="font-semibold text-gray-700">Order #{id}</p>
      <p className="text-sm text-gray-500">
        {items} items • {total}
      </p>
    </div>
    <a href="#" className="text-indigo-600 hover:text-indigo-800">
      <FiExternalLink className="h-5 w-5" />
    </a>
  </li>
);

// --- Main Dashboard Page Component ---
const DashboardPage = () => {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Welcome back, Acme Inc!
      </h1>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Revenue"
          value="$1,280"
          icon={<FiDollarSign className="text-green-500" />}
          change="+5.2%"
          changeColor="text-green-500"
        />
        <StatCard
          title="Today's Orders"
          value="32"
          icon={<FiShoppingCart className="text-blue-500" />}
          change="+2.1%"
          changeColor="text-green-500"
        />
        <StatCard
          title="Pending Orders"
          value="8"
          icon={<FiPackage className="text-orange-500" />}
          change="Needs action"
          changeColor="text-orange-500"
        />
        <StatCard
          title="Total Products"
          value="214"
          icon={<FaBoxes className="text-indigo-500" />}
        />
      </div>

      {/* Main Content Panels (Chart & Recent Orders) */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sales Chart Panel */}
        <div className="rounded-lg bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            Sales Overview (Last 30 Days)
          </h3>
          {/* This is where you would place your chart component */}
          <div className="flex h-80 w-full items-center justify-center rounded-md bg-gray-100 text-gray-500">
            [ Sales Chart Component Goes Here ]
          </div>
        </div>

        {/* Recent Pending Orders Panel */}
        <div className="rounded-lg bg-white p-6 shadow-sm lg:col-span-1">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            Recent Pending Orders
          </h3>
          <ul className="divide-y divide-gray-100">
            <PendingOrder id="12567" items={2} total="$89.99" />
            <PendingOrder id="12566" items={1} total="$149.50" />
            <PendingOrder id="12565" items={5} total="$320.00" />
            <PendingOrder id="12564" items={1} total="$24.75" />
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
