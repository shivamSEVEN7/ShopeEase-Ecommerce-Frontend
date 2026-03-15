import React from "react";
import ReviewCard from "./ReviewCard";

import { MdOutlineRateReview } from "react-icons/md";

const ReviewsSection = ({ reviews, reviewCount, averageRating }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <hr className="mb-12 border-t border-gray-200" />

        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Reviews & Ratings
        </h2>

        {reviewCount === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center text-center">
            <MdOutlineRateReview className="h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              No reviews yet
            </h3>
            <p className="mt-2 text-base text-gray-500">
              Be the first to Review this product
            </p>
          </div>
        ) : (
          <>
            <div className="mt-4 flex items-center">
              <p className="text-sm text-gray-700">
                Average rating:
                <span className="ml-2 font-bold text-gray-900">
                  {averageRating?.toFixed(1)}
                </span>{" "}
                / 5<span className="ml-2">({reviewCount} reviews)</span>
              </p>
            </div>

            <div className="mt-8">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
