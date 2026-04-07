import { useEffect, useState } from "react";
import ProductCard from "../shared/ProductCard";
import { FaExclamationTriangle } from "react-icons/fa";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import { HiChevronRight, HiOutlineSearch } from "react-icons/hi";
import api from "../../api/api";
import {
  fetchProductsSuccess,
  fetchProductsLoading,
  fetchProductsFailure,
} from "../../store/slice/productSlice";
import {
  fetchCategoriesSuccess,
  fetchCategoriesLoading,
  fetchCategoriesFailure,
} from "../../store/slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Filter from "./Filter";
import { useSearchParams } from "react-router";
import { fetchProducts, fetchCategories } from "../../store/actions";
import Paginations from "../shared/Paginations";
import ProductFilterBar from "./ProductFilterBar";
import ProductFilters from "./ProductFilters";
import { FiShoppingBag } from "react-icons/fi";
const Products = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // useEffect(() => {
  //   dispatch(fetchCategories());
  // }, []);
  useProductFilter();

  const { products, pagination, loading, error } = useSelector(
    (state) => state.products,
  );
  const {
    items,
    isCategoryLoading: isLoading,
    categoryError: errorMessage,
  } = useSelector((state) => state.categories);

  const [filters, setFilters] = useState({
    sort: "recommended",
    minPrice: "",
    maxPrice: "",
    rating: "",
    discount: "",
  });

  const searchTerm = searchParams.get("keyword");

  const categoryParam = searchParams.get("category");
  const categoryName = items.find((cat) => cat.categoryName === categoryParam)
    ? categoryParam
    : "";

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-2">
      <ProductFilterBar />
      <div className="flex gap-8">
        {/* LEFT FILTER */}
        <ProductFilters filters={filters} setFilters={setFilters} />

        {/* RIGHT PRODUCTS */}
        <div className="flex-1">
          {(searchTerm || categoryName) && (
            <div className="mb-6 flex items-center gap-2 py-2 animate-fadeIn">
              {searchTerm ? (
                // SEARCH UI
                <div className="flex items-center gap-2">
                  <HiOutlineSearch className="text-slate-400 text-lg" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Search Results for
                  </span>
                  <span className="text-sm md:text-base font-semibold text-blue-600 italic">
                    "{searchTerm}"
                  </span>
                </div>
              ) : (
                // CATEGORY UI
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Category
                  </span>
                  <HiChevronRight className="text-slate-300 text-lg" />
                  <span className="text-sm md:text-base font-semibold text-blue-600 capitalize">
                    {categoryName}
                  </span>
                </div>
              )}
            </div>
          )}
          {loading ? (
            <Loader text={"Loading Products"} />
          ) : error ? (
            <div className="flex justify-center items-center h-[200px]">
              <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
              <span className="text-slate-800 text-lg font-medium">
                {error}
              </span>
            </div>
          ) : products.length == 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 py-20 animate-fadeIn">
              <div className="relative mb-6">
                <div className="text-slate-200 dark:text-slate-800">
                  <FiShoppingBag size={120} strokeWidth={1} />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-slate-700 dark:text-slate-200 mb-2">
                No Products Found
              </h2>

              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md text-center leading-relaxed">
                Your search did not match any products. <br />
                Please try again.
              </p>
            </div>
          ) : (
            <div className="min-h-[700px] flex flex-col justify-between">
              {/* GRID */}
              <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                {products &&
                  products.map((item, i) => <ProductCard key={i} {...item} />)}
              </div>

              {/* PAGINATION */}
              {/* 2. Changed pt-10 to mt-auto to force it to the bottom if the grid is small */}
              <div className="flex justify-center mt-auto pt-10">
                <Paginations paginationDetails={pagination} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Products;
