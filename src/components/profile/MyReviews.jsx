import React from "react";
// Importing icons from Feather Icons (for edit/delete) and Font Awesome (for stars)
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

// --- Helper Component for Rendering Stars ---

// --- Mock Data ---
// In a real app, you would fetch this data from an API
const userReviews = [
  {
    id: 1,
    productName: "boAt Airdopes 141 Bluetooth Truly Wireless Earbuds",
    productImageUrl: "http://localhost:8080/images/iphone.png",
    rating: 4.5,
    reviewDate: "Sep 15, 2025",
    reviewText:
      "The sound quality is surprisingly good for the price. Bass is punchy and the battery life is excellent. Connectivity is also stable. A great value for money product.",
  },
  {
    id: 2,
    productName: "HP 15s, 11th Gen Intel Core i3 Laptop",
    productImageUrl: "http://localhost:8080/images/iphone.png",
    rating: 5,
    reviewDate: "Aug 22, 2025",
    reviewText:
      "Perfect laptop for students and office work. It's lightweight, has a great display, and the performance is smooth for everyday tasks. The battery backup is also very impressive.",
  },
  {
    id: 3,
    productName: "American Tourister 32 Ltrs Casual Backpack",
    productImageUrl: "http://localhost:8080/images/iphone.png",
    rating: 3,
    reviewDate: "Jul 05, 2025",
    reviewText:
      "The backpack looks good and has enough space, but the material feels a bit thin. The zippers could be of better quality. It's decent for the price, but not exceptional.",
  },
];

// --- Main Component ---
const MyReviews = () => {
  return (
    <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 w-full">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          My Reviews & Ratings
        </h1>

        <div className="space-y-6">
          {userReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
              {/* --- Card Header: Product Info and Actions --- */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={review.productImageUrl}
                    alt={review.productName}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="font-bold text-lg text-gray-800">
                      {review.productName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Reviewed on {review.reviewDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    className="text-gray-500 hover:text-blue-600"
                    aria-label="Edit review"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    className="text-gray-500 hover:text-red-600"
                    aria-label="Delete review"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>

              {/* --- Rating Stars --- */}
              <div className="mb-4">
                <Rating
                  name="half-rating-read"
                  defaultValue={review.rating}
                  precision={0.5}
                  readOnly
                />
              </div>

              {/* --- Review Text --- */}
              <p className="text-gray-600 leading-relaxed">
                {review.reviewText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyReviews;
