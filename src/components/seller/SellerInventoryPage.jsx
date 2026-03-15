import React from "react";
import { FiEdit, FiSearch, FiCheckSquare, FiSquare } from "react-icons/fi";

// Mock data focusing on inventory details
const mockInventory = [
  {
    id: 101,
    productName: "NoiseFit Endure Smartwatch",
    sku: "NF-ENDURE-BLK", // Stock Keeping Unit
    image: "https://via.placeholder.com/80x80/EEEEEE/AAAAAA?text=Watch",
    quantity: 120,
    lowStockThreshold: 10, // Example threshold
    status: "In Stock", // Could be 'In Stock', 'Low Stock', 'Out of Stock'
  },
  {
    id: 102,
    productName: "Wireless Bluetooth Headphones",
    sku: "WBH-NC-GRY",
    image: "https://via.placeholder.com/80x80/DDDDDD/AAAAAA?text=Audio",
    quantity: 8,
    lowStockThreshold: 15,
    status: "Low Stock",
  },
  {
    id: 103,
    productName: "Organic Cotton T-Shirt",
    sku: "OCT-NVY-L",
    image: "https://via.placeholder.com/80x80/CCCCCC/AAAAAA?text=Apparel",
    quantity: 0,
    lowStockThreshold: 20,
    status: "Out of Stock",
  },
];

// Helper to get status colors
const getStatusClasses = (status) => {
  switch (status) {
    case "In Stock":
      return "bg-green-100 text-green-800";
    case "Low Stock":
      return "bg-yellow-100 text-yellow-800";
    case "Out of Stock":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const SellerInventoryPage = () => {
  // In a real app, you'd have state and handlers to update quantities
  const handleUpdateQuantity = (productId, newQuantity) => {
    console.log(`Update product ${productId} quantity to ${newQuantity}`);
    // API call to update quantity would go here
  };

  return (
    <>
      {/* Header Section */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Inventory Management
        </h1>
        {/* Search */}
        <div className="relative w-full md:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="h-4 w-4 text-gray-400" />
          </span>
          <input
            type="search"
            placeholder="Search by Product Name or SKU..."
            className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Inventory Table Container */}
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
                  SKU
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Available Quantity
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
              {mockInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {/* Product Info */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={item.image}
                          alt={item.productName}
                        />
                      </div>
                      <div className="ml-4 min-w-0">
                        <div className="truncate text-sm font-medium text-gray-900">
                          {item.productName}
                        </div>
                        <div className="truncate text-sm text-gray-500">
                          ID: {item.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* SKU */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {item.sku}
                  </td>
                  {/* Quantity */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {/* Basic quantity display - could be an editable input */}
                    {item.quantity}
                  </td>
                  {/* Status */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 ${getStatusClasses(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button
                      title="Update Quantity"
                      onClick={() =>
                        handleUpdateQuantity(
                          item.id,
                          prompt("Enter new quantity:", item.quantity)
                        )
                      } // Replace prompt with a modal in a real app
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FiEdit className="h-5 w-5" />
                    </button>
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

export default SellerInventoryPage;
