import React from "react";
import {
  FiStar,
  FiRepeat,
  FiShoppingCart,
  FiMoreVertical,
} from "react-icons/fi";
import formatToINR from "../../../utils/formatToINR";

const ProductItem = ({ item }) => {
  const totalPrice = item.price * item.quantity;

  return (
    <div className="relative bg-white rounded-lg shadow-md border border-gray-200 p-4">
      <div className="flex items-start gap-4">
        <img
          src={item.product.image}
          alt={item.product.productName}
          className="w-24 h-24 object-contain rounded-lg flex-shrink-0"
        />
        <div className="flex-grow min-w-0 pr-8">
          <h3 className="text-base font-semibold text-gray-900 leading-tight line-clamp-2">
            {item.product.productName}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Sold by: ShopEase Seller{" "}
          </p>
          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-baseline">
        <p className="text-sm text-gray-600">
          Unit Price:{" "}
          <span className="font-medium">
            {formatToINR(item.unitPriceAtPurchase)}
          </span>
        </p>
        <p className="text-lg font-bold text-gray-900">
          {formatToINR(item.totalAmountAtPurchase)}
        </p>
      </div>

      <div className="absolute top-4 right-4">
        <button className="md:hidden p-1 text-gray-600 hover:text-gray-900">
          <FiMoreVertical size={20} />
        </button>
        <div className="hidden md:flex flex-col items-end gap-3">
          <button className="flex items-center text-sm font-medium text-blue-600 hover:underline whitespace-nowrap">
            <FiShoppingCart className="mr-1.5" /> Buy it Again
          </button>
          <button className="flex items-center text-sm font-medium text-blue-600 hover:underline whitespace-nowrap">
            <FiRepeat className="mr-1.5" /> Return or Replace
          </button>
          <button className="flex items-center text-sm font-medium text-blue-600 hover:underline whitespace-nowrap">
            <FiStar className="mr-1.5" /> Write a Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
