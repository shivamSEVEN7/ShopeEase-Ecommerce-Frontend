import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaSort, FaStar, FaPercentage, FaRupeeSign } from "react-icons/fa";
import { IoChevronDown, IoClose, IoFilter } from "react-icons/io5";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import Badge from "@mui/material/Badge";
import ActiveFilters from "./ActiveFilters";

const sortOptions = [
  { value: "", label: "Select" },
  { value: "newest_arrivals", label: "Most Recent" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "discount", label: "Highest Discount" },
];
const priceOptions = [
  "600",
  "1000",
  "1500",
  "2000",
  "2600",
  "4000",
  "7000",
  "10000",
];
const ratingOptions = [
  { value: 4, label: "4★ & above" },
  { value: 3, label: "3★ & above" },
  { value: 2, label: "2★ & above" },
  { value: 1, label: "1★ & above" },
];
const discountOptions = ["10", "20", "30", "40", "50", "60", "70", "80", "90"];
const VALID_SORT_BY = [
  "newest_arrivals",
  "price_asc",
  "price_desc",
  "rating",
  "discount",
];
const VALID_RATINGS = ["2", "3", "4"];

const ProductFilterBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const [sort, setSort] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [discount, setDiscount] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    sort: "",
    priceRange: "",
    discount: "",
    rating: "",
  });
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const handleRemoveFilter = (filterKey) => {
    if (filterKey === "priceRange") {
      params.delete("min-price");
      params.delete("max-price");
    } else {
      params.delete(filterKey);
    }
    console.log("New Param is " + params);
    setSearchParams(params);
  };

  const handleClearAllFilters = () => {
    if (sort) {
      params.delete("sort");
    }
    if (minPrice) {
      params.delete("min-price");
    }
    if (maxPrice) {
      params.delete("max-price");
    }
    if (discount) {
      params.delete("min-discount");
    }
    if (rating) {
      params.delete("min-rating");
    }
    setSearchParams(params);
  };

  useEffect(() => {
    const sort = params.get("sort");
    const minPrice = searchParams.get("min-price");
    const maxPrice = searchParams.get("max-price");
    const minDiscount = searchParams.get("min-discount");
    const minRating = searchParams.get("min-rating");
    if (sort && VALID_SORT_BY.includes(sort)) {
      setSort(sort);
      const sortLabel = sortOptions.filter((option) => option.value === sort);
      setActiveFilters((prev) => ({
        ...prev,
        sort: { key: `sort`, label: `Sort : ${sortLabel[0].label}` },
      }));
    } else {
      setActiveFilters((prev) => ({ ...prev, sort: "" }));
      setSort("");
    }
    if (minPrice && priceOptions.includes(minPrice)) {
      setMinPrice(minPrice);
      if (maxPrice && priceOptions.includes(maxPrice)) {
        setActiveFilters((prev) => ({
          ...prev,
          priceRange: {
            key: `priceRange`,
            label: `Price Range : ${minPrice} - ${maxPrice}`,
          },
        }));
      } else {
        setActiveFilters((prev) => ({
          ...prev,
          priceRange: {
            key: `priceRange`,
            label: `Price Range : ${minPrice} - Max`,
          },
        }));
      }
    } else {
      setMinPrice("");
      if (maxPrice && priceOptions.includes(maxPrice)) {
        setActiveFilters((prev) => ({
          ...prev,
          priceRange: {
            key: `priceRange`,
            label: `Price Range : Min - ${maxPrice}`,
          },
        }));
      } else {
        setActiveFilters((prev) => ({
          ...prev,
          priceRange: "",
        }));
      }
    }

    if (maxPrice && priceOptions.includes(maxPrice)) {
      setMaxPrice(maxPrice);
    } else {
      setMaxPrice("");
    }

    if (minDiscount && discountOptions.includes(minDiscount)) {
      setDiscount(minDiscount);
      setActiveFilters((prev) => ({
        ...prev,
        discount: {
          key: `min-discount`,
          label: `Discount : ${minDiscount}% & above`,
        },
      }));
    } else {
      setDiscount("");
      setActiveFilters((prev) => ({
        ...prev,
        discount: "",
      }));
    }

    if (minRating && VALID_RATINGS.includes(minRating)) {
      setRating(minRating);
      setActiveFilters((prev) => ({
        ...prev,
        rating: {
          key: `min-rating`,
          label: `Rating : ${minRating}★ & above`,
        },
      }));
    } else {
      setRating("");
      setActiveFilters((prev) => ({ ...prev, rating: "" }));
    }
  }, [searchParams]);

  useEffect(() => {
    let count = 0;
    Object.values(activeFilters).forEach((v) => {
      if (v) count++;
    });
    setActiveFiltersCount(count);
  }, [activeFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (value != null && value != "") {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    navigate(`${pathname}?${params}`);
  };

  const handleMobileFilterSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name, value } = e.target.elements["sort"];
    formData.forEach((value, name) => {
      if (value != null && value != "") {
        params.set(name, value);
      } else {
        params.delete(name);
      }
    });

    navigate(`${pathname}?${params}`);
    setIsOpen(false);
  };
  const selectStyles =
    "w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";
  const labelStyles =
    "flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase mb-1";
  const activeSelectStyles =
    "w-full appearance-none rounded-md border border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 shadow-sm focus:outline-none";
  //   console.log({ sort, minPrice, maxPrice, rating, discount });
  // }, [sort, minPrice, maxPrice, rating, discount]);

  return (
    <div className="mb-6">
      <div className="lg:hidden w-full">
        <Badge
          badgeContent={activeFiltersCount}
          color="error"
          className="w-full"
        >
          <div className="w-full">
            <button
              onClick={() => setIsOpen(true)}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
            >
              <IoFilter className="h-5 w-5" />
              Sort & Filter
            </button>
          </div>
        </Badge>
      </div>

      <div className="hidden lg:block rounded-xl bg-white p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 md:gap-6 items-end">
          <div className="w-full sm:w-auto md:flex-1 min-w-[160px]">
            <label htmlFor="sort-desktop" className={labelStyles}>
              <FaSort /> Sort By
            </label>
            <div className="relative">
              <select
                name="sort"
                id="sort-desktop"
                value={sort}
                onChange={handleFilterChange}
                className={selectStyles}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <IoChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="w-full sm:w-auto md:flex-1 min-w-[200px]">
            <label className={labelStyles}>
              <FaRupeeSign /> Price Range
            </label>
            <div className="flex gap-2">
              <div className="relative w-1/2">
                <select
                  name="min-price"
                  id="min-price-desktop"
                  value={minPrice}
                  onChange={handleFilterChange}
                  className={selectStyles}
                >
                  <option value="">Min</option>
                  {priceOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <IoChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative w-1/2">
                <select
                  name="max-price"
                  id="max-price-desktop"
                  value={maxPrice}
                  onChange={handleFilterChange}
                  className={selectStyles}
                >
                  <option value="">Max</option>
                  {priceOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <IoChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto md:flex-1 min-w-[160px]">
            <label htmlFor="rating-desktop" className={labelStyles}>
              <FaStar /> Rating
            </label>
            <div className="relative">
              <select
                name="min-rating"
                id="rating-desktop"
                value={rating}
                onChange={handleFilterChange}
                className={selectStyles}
              >
                <option value="">All Ratings</option>
                {ratingOptions.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
              <IoChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="w-full sm:w-auto md:flex-1 min-w-[160px]">
            <label htmlFor="discount-desktop" className={labelStyles}>
              <FaPercentage /> Discount
            </label>
            <div className="relative">
              <select
                name="min-discount"
                id="discount-desktop"
                value={discount}
                onChange={handleFilterChange}
                className={selectStyles}
              >
                <option value="">Any</option>
                {discountOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}% & above
                  </option>
                ))}
              </select>
              <IoChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 lg:hidden"
        transition
      >
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0" />

        <div className="fixed inset-x-0 bottom-0 flex">
          <DialogPanel
            transition
            className="relative w-full transform rounded-t-2xl bg-white shadow-2xl 
                       transition duration-300 ease-out data-[closed]:translate-y-full
                       flex flex-col max-h-[85vh]"
          >
            <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-100 px-6 py-4">
              <DialogTitle className="text-lg font-bold text-gray-900">
                Sort & Filter
              </DialogTitle>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <IoClose className="h-6 w-6" />
              </button>
            </div>
            <form id="mobileFilterForm" onSubmit={handleMobileFilterSubmit}>
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="flex flex-col gap-6 p-1">
                  <div className="w-full">
                    <label htmlFor="sort-mobile" className={labelStyles}>
                      <FaSort /> Sort By
                    </label>
                    <div className="relative">
                      <select
                        name="sort"
                        id="sort-mobile"
                        defaultValue={sort}
                        className={sort ? activeSelectStyles : selectStyles}
                      >
                        {sortOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <IoChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div className="w-full">
                    <label className={labelStyles}>
                      <FaRupeeSign /> Price Range
                    </label>
                    <div className="flex gap-2">
                      <div className="relative w-1/2">
                        <select
                          name="min-price"
                          id="min-price-mobile"
                          defaultValue={minPrice}
                          className={
                            minPrice ? activeSelectStyles : selectStyles
                          }
                        >
                          <option value="">Min</option>
                          {priceOptions.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                        <IoChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
                      </div>
                      <div className="relative w-1/2">
                        <select
                          name="max-price"
                          id="max-price-mobile"
                          defaultValue={maxPrice}
                          className={
                            maxPrice ? activeSelectStyles : selectStyles
                          }
                        >
                          <option value="">Max</option>
                          {priceOptions.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                        <IoChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <label htmlFor="rating-mobile" className={labelStyles}>
                      <FaStar /> Rating
                    </label>
                    <div className="relative">
                      <select
                        name="min-rating"
                        id="rating-mobile"
                        defaultValue={rating}
                        className={rating ? activeSelectStyles : selectStyles}
                      >
                        <option value="">All Ratings</option>
                        {ratingOptions.map((r) => (
                          <option key={r.value} value={r.value}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                      <IoChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  {/* Discount */}
                  <div className="w-full">
                    <label htmlFor="discount-mobile" className={labelStyles}>
                      <FaPercentage /> Discount
                    </label>
                    <div className="relative">
                      <select
                        name="min-discount"
                        id="discount-mobile"
                        defaultValue={discount}
                        className={discount ? activeSelectStyles : selectStyles}
                      >
                        <option value="">Any</option>
                        {discountOptions.map((d) => (
                          <option key={d} value={d}>
                            {d}% & above
                          </option>
                        ))}
                      </select>
                      <IoChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div className="flex-shrink-0 border-t border-gray-100 px-6 py-4 bg-gray-50">
              <div className="flex gap-3">
                {(sort || minPrice || maxPrice || discount || rating) && (
                  <button
                    onClick={() => {
                      handleClearAllFilters();
                      setIsOpen(false);
                    }}
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Remove All
                  </button>
                )}

                <button
                  form="mobileFilterForm"
                  className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Apply
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      {activeFilters.sort ||
      activeFilters.discount ||
      activeFilters.priceRange ||
      activeFilters.rating ? (
        <ActiveFilters
          mockActiveFilters={activeFilters}
          handleRemoveFilter={handleRemoveFilter}
          handleClearAllFilters={handleClearAllFilters}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductFilterBar;
