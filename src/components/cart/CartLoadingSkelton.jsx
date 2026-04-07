const CartLoadingSkeleton = () => {
  return (
    <div className="max-w-5xl max-lg:max-w-2xl mx-auto p-4 animate-pulse">
      <h2 className="text-xl font-semibold mb-6 bg-gray-200 h-6 w-40 rounded"></h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 flex gap-4 shadow-sm"
            >
              {/* Image */}
              <div className="w-20 h-20 bg-gray-200 rounded-md"></div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>

                <div className="h-5 bg-gray-200 rounded w-24"></div>

                {/* Quantity */}
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Summary */}
        <div className="bg-white rounded-xl p-5 shadow-sm space-y-4 h-fit">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200 w-20 rounded"></div>
              <div className="h-3 bg-gray-200 w-16 rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200 w-20 rounded"></div>
              <div className="h-3 bg-gray-200 w-16 rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200 w-20 rounded"></div>
              <div className="h-3 bg-gray-200 w-16 rounded"></div>
            </div>
          </div>

          <div className="h-10 bg-gray-200 rounded-lg"></div>
          <div className="h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};
export default CartLoadingSkeleton;
