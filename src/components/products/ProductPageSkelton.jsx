import React from "react";

const SkeletonLine = ({ width, height = "h-4" }) => (
  <div className={`rounded bg-gray-200 ${height} ${width} animate-pulse`}></div>
);

const ProductPageSkeleton = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-x-8 gap-y-10 lg:grid-cols-5 lg:gap-x-12">
          <div className="lg:col-span-2">
            <div className="flex flex-col-reverse">
              <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
                <div className="grid grid-cols-4 gap-6">
                  <div className="h-24 rounded-md bg-gray-200 animate-pulse"></div>
                  <div className="h-24 rounded-md bg-gray-200 animate-pulse"></div>
                  <div className="h-24 rounded-md bg-gray-200 animate-pulse"></div>
                  <div className="h-24 rounded-md bg-gray-200 animate-pulse"></div>
                </div>
              </div>

              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200 animate-pulse"></div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <SkeletonLine width="w-1/4" height="h-5" />
            <SkeletonLine width="w-3/4" height="h-8" />
            <SkeletonLine width="w-1/2" height="h-6" />
            <SkeletonLine width="w-1/3" height="h-5" />

            <div className="mt-6 flex items-baseline gap-x-4">
              <SkeletonLine width="w-1/3" height="h-8" />
              <SkeletonLine width="w-1/4" height="h-6" />
            </div>

            <SkeletonLine width="w-1/4" height="h-5" />

            <div className="mt-6 space-y-2">
              <SkeletonLine width="w-full" />
              <SkeletonLine width="w-full" />
              <SkeletonLine width="w-5/6" />
            </div>

            <div className="mt-8 space-y-3">
              <SkeletonLine width="w-1/3" height="h-6" />
              <div className="list-disc space-y-2 pl-4">
                <SkeletonLine width="w-full" />
                <SkeletonLine width="w-full" />
                <SkeletonLine width="w-5/6" />
              </div>
            </div>

            <div className="mt-10 h-12 w-full rounded-md bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <hr className="mb-12 border-t border-gray-200" />

          <SkeletonLine width="w-1/3" height="h-7" />
          <SkeletonLine width="w-1/2" height="h-5" />

          <div className="mt-8 space-y-6">
            <div className="border-b border-gray-200 py-6">
              <SkeletonLine width="w-1/2" height="h-5" />
              <SkeletonLine width="w-1/3" height="h-4" />
              <div className="mt-4 space-y-2">
                <SkeletonLine width="w-full" />
                <SkeletonLine width="w-5/6" />
              </div>
            </div>

            <div className="border-b border-gray-200 py-6">
              <SkeletonLine width="w-1/2" height="h-5" />
              <SkeletonLine width="w-1/3" height="h-4" />
              <div className="mt-4 space-y-2">
                <SkeletonLine width="w-full" />
                <SkeletonLine width="w-5/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
