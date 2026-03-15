import { useEffect, useState } from "react";
import ProductCard from "../shared/ProductCard";
import { FaExclamationTriangle } from "react-icons/fa";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";

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
const Products = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // useEffect(() => {
  //   dispatch(fetchCategories());
  // }, []);
  useProductFilter();

  const { products, pagination, loading, error } = useSelector(
    (state) => state.products
  );
  const {
    items,
    isCategoryLoading: isLoading,
    categoryError: errorMessage,
  } = useSelector((state) => state.categories);

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
      <ProductFilterBar />
      {loading ? (
        <Loader text={"Loading Products"} />
      ) : error ? (
        <div className="flex justify-center items-center h-[200px]">
          <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
          <span className="text-slate-800 text-lg font-medium">{error}</span>
        </div>
      ) : (
        <div className="min-h-[700px]">
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
            {products &&
              products.map((item, i) => <ProductCard key={i} {...item} />)}
          </div>
          <div className="flex justify-center pt-10">
            <Paginations paginationDetails={pagination} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Products;
