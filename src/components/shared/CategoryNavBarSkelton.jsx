export default function CategoryNavBarSkeleton() {
  return (
    <div className="bg-white/90  backdrop-blur-md border-b border-outline-variant/20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between space-x-12 h-14 min-w-max">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center w-22 p-2 animate-pulse"
            >
              {/* Icon skeleton */}
              <div className="w-5 h-5 bg-slate-300 rounded mb-1"></div>

              {/* Text skeleton */}
              <div className="w-14 h-3 bg-slate-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
