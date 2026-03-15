import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../store/actions";
const useProductFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const fetchProductsNow = async () => {
    const params = new URLSearchParams();

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", currentPage - 1);
    const sortBy = searchParams.get("sort") || null;
    const sortOrder = searchParams.get("sort-order") || null;
    const categoryParams = searchParams.get("category") || null;
    const keyword = searchParams.get("keyword") || null;
    const minPrice = searchParams.get("min-price") || null;
    const maxPrice = searchParams.get("max-price") || null;
    const minDiscount = searchParams.get("min-discount") || null;
    const minRating = searchParams.get("min-rating") || null;

    // Valid filter values

    const VALID_SORT_BY = [
      "newest_arrivals",
      "price_asc",
      "price_desc",
      "rating",
      "discount",
    ];
    const VALID_SORT_ORDER = ["asc", "desc"];
    const VALID_RATINGS = ["2", "3", "4"];
    const VALID_DISCOUNTS = [
      "10",
      "20",
      "30",
      "40",
      "50",
      "60",
      "70",
      "80",
      "90",
    ];
    const VALID_PRICES = [
      "600",
      "1000",
      "1500",
      "2000",
      "2600",
      "4000",
      "7000",
      "10000",
      "10000+",
    ];

    if (categoryParams) {
      params.set("category", categoryParams);
    }

    if (keyword) {
      params.set("keyword", keyword);
    }

    if (sortBy) {
      switch (sortBy) {
        case "newest_arrivals":
          params.set("sortBy", "createdAt");
          break;
        case "price_asc":
          params.set("sortBy", "specialPrice");
          params.set("sortOrder", "asc");
          break;
        case "price_desc":
          params.set("sortBy", "specialPrice");
          params.set("sortOrder", "desc");
          break;
        case "discount":
          params.set("sortBy", "discount");
          break;
        case "rating":
          params.set("sortyBy", "averageRating");
          break;
      }
    }

    if (minPrice) {
      VALID_PRICES.includes(minPrice)
        ? params.set("minPrice", minPrice)
        : searchParams.delete("min-price");
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }
    if (minDiscount) {
      VALID_DISCOUNTS.includes(minDiscount)
        ? params.set("minDiscount", minDiscount)
        : searchParams.delete("min-discount");
    }

    if (minRating) {
      params.set("minRating", minRating);
    }

    const queryString = params.toString();
    console.log("QUERY STRING", queryString);

    dispatch(fetchProducts(queryString));
  };
  useEffect(() => {
    fetchProductsNow();
  }, [dispatch, searchParams]);
};
export default useProductFilter;
