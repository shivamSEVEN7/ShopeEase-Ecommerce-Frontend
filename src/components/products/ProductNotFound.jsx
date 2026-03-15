import React from "react";
import { Link } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";

const ProductNotFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-4 py-12 text-center">
      <FaBoxOpen className="h-20 w-20 text-gray-400" />
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
        Product Not Found
      </h1>
      <p className="mt-4 max-w-md text-base text-gray-600">
        Sorry, we couldn't find the product you're looking for. It might be out
        of stock, removed, or the link may be broken.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default ProductNotFound;
