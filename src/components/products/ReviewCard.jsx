import { Rating } from "@mui/material";
import React from "react";
import { FaStar, FaCheckCircle } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const formattedDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="border-b border-gray-200 py-6">
      <div className="mb-2 flex items-center">
        <div className="flex items-center">
          <Rating
            name="read-only"
            precision={0.1}
            value={review.rating}
            readOnly
          />
        </div>
        <p className="ml-4 text-sm font-bold text-gray-900">
          {review.user.name}
        </p>
      </div>

      {review.title && (
        <h3 className="mt-4 mb-2 text-base font-semibold text-gray-900">
          {review.title}
        </h3>
      )}

      <div className="mb-4 flex items-center">
        <FaCheckCircle className="h-4 w-4 text-green-500" />
        <p className="ml-2 text-xs font-medium text-gray-500">
          Certified Buyer
        </p>
        <span className="mx-2 text-gray-300">|</span>
        <p className="text-xs text-gray-500">
          {formattedDate(review.createdAt)}
        </p>
      </div>
      <p className="text-base text-gray-700">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
