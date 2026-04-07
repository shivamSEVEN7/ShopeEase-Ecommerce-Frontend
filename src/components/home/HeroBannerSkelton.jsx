const HeroBannerSkelton = () => {
  return (
    <div className="w-full overflow-hidden rounded-lg">
      <div className="w-full aspect-[3/1] md:aspect-[6/1] animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 flex">
        <div className="flex-1 flex flex-col justify-center items-center space-y-3 p-4">
          <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
          <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
          <div className="hidden lg:block h-4 w-2/3 bg-gray-300 rounded"></div>
          <div className="h-8 w-24 bg-gray-400 rounded"></div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-2/3 h-3/4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};
export default HeroBannerSkelton;
