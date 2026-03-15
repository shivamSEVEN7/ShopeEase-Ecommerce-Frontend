import React from "react";

// A reusable placeholder element for pulsing bars
const SkeletonBar = ({ className }) => (
  <div className={`bg-gray-200 rounded ${className}`}></div>
);

const OrderDetailsSkeleton = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans p-4 md:p-8 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* --- Header Skeleton --- */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2">
              <SkeletonBar className="h-8 w-1/2 mb-4" />
              <SkeletonBar className="h-4 w-1/3 mb-2" />
              <SkeletonBar className="h-4 w-1/4" />
            </div>
            <div className="md:col-span-3 flex justify-between items-center">
              <SkeletonBar className="h-10 w-10 rounded-full" />
              <SkeletonBar className="h-1 flex-1 mx-4" />
              <SkeletonBar className="h-10 w-10 rounded-full" />
              <SkeletonBar className="h-1 flex-1 mx-4" />
              <SkeletonBar className="h-10 w-10 rounded-full" />
              <SkeletonBar className="h-1 flex-1 mx-4" />
              <SkeletonBar className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </div>

        {/* --- Main Content Skeleton --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Product Items Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <SkeletonBar className="h-8 w-1/3 mb-4" />
            {/* Create 2-3 skeleton product items */}
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md border p-4"
              >
                <div className="flex items-start gap-4">
                  <SkeletonBar className="w-24 h-24 rounded-lg flex-shrink-0" />
                  <div className="flex-grow">
                    <SkeletonBar className="h-5 w-full mb-3" />
                    <SkeletonBar className="h-4 w-3/4 mb-2" />
                    <SkeletonBar className="h-4 w-1/2" />
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t flex justify-between">
                  <SkeletonBar className="h-4 w-1/4" />
                  <SkeletonBar className="h-6 w-1/3" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Summary Cards Skeleton */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <SkeletonBar className="h-6 w-1/2 mb-4" />
              <SkeletonBar className="h-4 w-3/4 mb-2" />
              <SkeletonBar className="h-4 w-full mb-2" />
              <SkeletonBar className="h-4 w-2/3" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <SkeletonBar className="h-6 w-1/2 mb-4" />
              <SkeletonBar className="h-4 w-full mb-2" />
              <SkeletonBar className="h-4 w-full mb-2" />
              <SkeletonBar className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;
