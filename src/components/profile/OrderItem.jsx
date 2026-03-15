import React, { useState } from "react";
import AddReviewModal from "../products/AddReviewModal";
import { FaEdit } from "react-icons/fa";
import Rating from "@mui/material/Rating";

const OrderItem = ({ item, orderStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center space-x-4">
        <img
          src={item.product.image}
          alt={item.product.productName}
          className="w-14 h-14 rounded-md object-cover"
        />

        <div>
          <p className="text-sm font-medium text-gray-800">
            {item.product.productName}
          </p>

          <p className="text-xs text-gray-500">Seller: ShopEase Seller</p>
        </div>
      </div>

      <div>
        {orderStatus === "DELIVERED" ? (
          item.review === null ? (
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-x-2 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md px-4 py-2 transition-colors border border-blue-200"
            >
              Write a review
            </button>
          ) : (
            <div className="flex items-center gap-x-3">
              <Rating
                name="user-rating-display"
                value={item.review.rating}
                precision={0.5}
                readOnly
                size="medium"
              />
              <button
                onClick={() => setIsOpen(true)}
                className="text-gray-400 hover:text-indigo-600 focus:outline-none"
                title="Edit your review"
              >
                <FaEdit className="h-5 w-5" />
              </button>
            </div>
          )
        ) : (
          ""
        )}
      </div>
      <AddReviewModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        reviewDetails={item.review}
        orderItem={item}
      />
    </div>
  );
};

export default OrderItem;
