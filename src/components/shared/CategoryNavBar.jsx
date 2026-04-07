import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router";

export default function CategoryNavBar({ categories }) {
  const { loading: productsLoading } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  return (
    <div class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-outline-variant/20">
      <div class="mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar scroll-smooth category-nav">
        <div class="flex items-center justify-between space-x-12 h-14 min-w-max">
          {categories.map((category) => {
            const isSelected =
              searchParams.get("category")?.toLowerCase() ===
              category.categoryName.toLowerCase();
            return (
              <Link
                className={`${isSelected && "border-b-6 border-blue-500"} flex flex-col items-center justify-center w-22
         p-2 
         text-slate-600 dark:text-slate-400 hover:text-primary 
         transition-all duration-200 ease-out 
         transform hover:scale-110 hover:-translate-y-1 hover:shadow-md 
         hover:bg-slate-100 dark:hover:bg-slate-800
         group`}
                to={`/products?category=${encodeURIComponent(category.categoryName)}`}
                onClick={(e) => {
                  if (productsLoading) {
                    e.preventDefault();
                    return;
                  }
                  e.preventDefault();
                  if (isSelected) {
                    navigate("/products");
                  } else {
                    navigate(
                      `/products?category=${encodeURIComponent(category.categoryName)}`,
                    );
                  }
                }}
              >
                <img
                  src={category.iconUrl}
                  class="w-5 h-5 group-hover:opacity-80 transition"
                  alt="Tech & Tools"
                />

                <span class="text-xs font-medium tracking-wide mt-1 w-full text-center truncate">
                  {category.categoryName}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
