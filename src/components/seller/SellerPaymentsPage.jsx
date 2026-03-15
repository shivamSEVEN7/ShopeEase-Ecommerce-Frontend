import React from "react";
import { FiDollarSign, FiCalendar, FiArrowDownCircle } from "react-icons/fi";
// import { Link } from 'react-router-dom';

// --- Mock Data ---
const paymentSummary = {
  currentBalance: 45750.5,
  nextPayoutDate: "Nov 05, 2025",
  nextPayoutAmount: 18500.0,
};

const recentPayouts = [
  {
    id: "PAYOUT-1234",
    date: "Oct 28, 2025",
    amount: 15200.75,
    status: "Completed",
    bankAccount: "**** **** **** 1234",
  },
  {
    id: "PAYOUT-1233",
    date: "Oct 21, 2025",
    amount: 12850.25,
    status: "Completed",
    bankAccount: "**** **** **** 1234",
  },
  {
    id: "PAYOUT-1232",
    date: "Oct 14, 2025",
    amount: 9800.0,
    status: "Completed",
    bankAccount: "**** **** **** 1234",
  },
  {
    id: "PAYOUT-1231",
    date: "Oct 07, 2025",
    amount: 11500.5,
    status: "Failed", // Example of a failed payout
    bankAccount: "**** **** **** 1234",
  },
];

// --- Helper Functions ---
const formatPrice = (price) => {
  return price.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const getStatusClasses = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
// --- End Helper Functions ---

const SellerPaymentsPage = () => {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Payments</h1>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Current Balance */}
        <div className="rounded-lg bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Current Balance</p>
            <FiDollarSign className="h-6 w-6 text-green-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-800">
            {formatPrice(paymentSummary.currentBalance)}
          </p>
        </div>

        {/* Next Payout */}
        <div className="rounded-lg bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Next Payout</p>
            <FiCalendar className="h-6 w-6 text-blue-500" />
          </div>
          <p className="mt-2 text-xl font-semibold text-gray-800">
            {paymentSummary.nextPayoutDate}
          </p>
          <p className="text-sm text-gray-500">
            Estimated Amount: {formatPrice(paymentSummary.nextPayoutAmount)}
          </p>
        </div>
      </div>

      {/* Recent Payouts Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <h3 className="border-b px-6 py-4 text-lg font-semibold text-gray-700">
          Recent Payouts
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Transaction ID
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
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Account
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {recentPayouts.map((payout) => (
                <tr key={payout.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {payout.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {payout.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                    {formatPrice(payout.amount)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 ${getStatusClasses(
                        payout.status
                      )}`}
                    >
                      {payout.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {payout.bankAccount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SellerPaymentsPage;
