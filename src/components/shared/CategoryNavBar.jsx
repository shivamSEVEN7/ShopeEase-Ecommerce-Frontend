import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router";

export default function CategoryNavBar({ categories }) {
  const { loading: productsLoading } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  return (
    <div className="bg-white backdrop-blur-md border-b border-slate-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar scroll-smooth category-nav">
        <div className="flex items-center justify-between space-x-12 h-14 min-w-max">
          {categories.map((category) => {
            const isSelected =
              searchParams.get("category")?.toLowerCase() ===
              category.categoryName.toLowerCase();

            return (
              <Link
                key={category.id || category.categoryName}
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
                className={`
              flex flex-col items-center justify-center w-22 p-2 group
              transition-all duration-200 ease-out transform 
              hover:scale-110 hover:-translate-y-1 hover:shadow-md hover:bg-slate-100
              text-slate-600 hover:text-blue-600
              ${isSelected ? "border-b-2 border-blue-500 bg-slate-50" : "border-b-2 border-transparent"}
            `}
              >
                <img
                  src={category.iconUrl}
                  className="w-5 h-5 group-hover:opacity-80 transition"
                  alt={category.categoryName}
                />

                <span className="text-xs font-medium tracking-wide mt-1 w-full text-center truncate">
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
