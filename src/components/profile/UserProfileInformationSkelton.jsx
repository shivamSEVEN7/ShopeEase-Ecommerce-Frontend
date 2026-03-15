const UserProfileInformationSkeleton = () => {
  return (
    <div className="min-h-full bg-white rounded-lg shadow-lg p-6 md:p-8">
      {/* --- Skeleton for Header --- */}
      <div className="flex justify-between items-center pb-5">
        <div className="h-8 w-1/3 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* --- Skeleton for User Details Grid --- */}
      <div className="border-t border-gray-200 pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Repeating a few skeleton items to fill the grid */}
        {[...Array(6)].map((_, i) => (
          <div key={i}>
            <div className="h-4 w-1/4 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-6 w-1/2 bg-gray-200 rounded-md mt-2 animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* --- Skeleton for Divider --- */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4">
            <div className="h-5 w-32 bg-gray-200 rounded-md animate-pulse"></div>
          </span>
        </div>
      </div>

      {/* --- Skeleton for Active Sessions --- */}
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex items-center w-full">
              <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse flex-shrink-0 mr-4"></div>
              <div className="w-full space-y-2">
                <div className="h-5 w-3/4 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            </div>
            <div className="h-9 w-full sm:w-20 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfileInformationSkeleton;
