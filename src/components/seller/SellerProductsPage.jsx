import React from "react";
import { FiPlus, FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { Link } from "react-router";
// import { Link } from 'react-router-dom';

// Mock data based on your provided structure
const mockProducts = [
  {
    id: 101,
    productName: "NoiseFit Endure Smartwatch",
    description:
      "A durable smartwatch with fitness tracking, heart rate monitoring, and long battery life.",
    image: "https://via.placeholder.com/80x80/EEEEEE/AAAAAA?text=Watch", // Using placeholder
    images: [],
    quantity: 120,
    price: 4999.0,
    specialPrice: 3999.0,
    discount: 20.0,
    slug: "noisefit-endure-smartwatch",
    category: { id: 12, name: "Smartwatches" },
    averageRating: 4.3,
    reviewCount: 86,
  },
  {
    id: 102,
    productName: "Wireless Bluetooth Headphones",
    description: "High-fidelity sound with noise cancellation.",
    image: "https://via.placeholder.com/80x80/DDDDDD/AAAAAA?text=Audio",
    images: [],
    quantity: 75,
    price: 2499.0,
    specialPrice: 1999.0,
    discount: 20.0,
    slug: "wireless-bt-headphones",
    category: { id: 15, name: "Audio" },
    averageRating: 4.6,
    reviewCount: 150,
  },
  {
    id: 103,
    productName: "Organic Cotton T-Shirt",
    description: "Soft and comfortable 100% organic cotton t-shirt.",
    image: "https://via.placeholder.com/80x80/CCCCCC/AAAAAA?text=Apparel",
    images: [],
    quantity: 300,
    price: 899.0,
    specialPrice: 899.0, // No discount
    discount: 0.0,
    slug: "organic-cotton-tshirt",
    category: { id: 21, name: "Apparel" },
    averageRating: 4.8,
    reviewCount: 45,
  },
];

// Helper to format price
const formatPrice = (price) => {
  return price.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const SellerProductsPage = () => {
  return (
    <>
      {/* Header Section */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold text-gray-800">Your Products</h1>
        {/* Use <Link to="/seller/products/new"> */}
        <Link
          to={"new"}
          className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <FiPlus className="h-5 w-5" />
          List New Product
        </Link>
      </div>

      {/* Product Table Container */}
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
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Rating
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {mockProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  {/* Product Info */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-md object-cover"
                          src={product.image}
                          alt={product.productName}
                        />
                      </div>
                      <div className="ml-4 min-w-0">
                        <div className="truncate text-sm font-medium text-gray-900">
                          {product.productName}
                        </div>
                        <div className="truncate text-sm text-gray-500">
                          ID: {product.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* Category */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {product.category.name}
                  </td>
                  {/* Price */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {product.discount > 0 ? (
                      <div>
                        <span className="font-semibold text-gray-900">
                          {formatPrice(product.specialPrice)}
                        </span>
                        <span className="ml-2 text-gray-500 line-through">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-semibold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </td>
                  {/* Stock */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {product.quantity > 0 ? (
                      <span className="font-medium text-green-700">
                        {product.quantity} units
                      </span>
                    ) : (
                      <span className="font-medium text-red-600">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  {/* Rating */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {product.averageRating.toFixed(1)} ★ ({product.reviewCount})
                  </td>
                  {/* Actions */}
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <button
                        title="View Product"
                        className="text-gray-400 hover:text-indigo-600"
                      >
                        <FiEye className="h-5 w-5" />
                      </button>
                      <button
                        title="Edit Product"
                        className="text-gray-400 hover:text-blue-600"
                      >
                        <FiEdit className="h-5 w-5" />
                      </button>
                      <button
                        title="Delete Product"
                        className="text-gray-400 hover:text-red-600"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
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

export default SellerProductsPage;
