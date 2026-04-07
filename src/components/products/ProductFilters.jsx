import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  FaSort,
  FaStar,
  FaPercentage,
  FaRupeeSign,
  FaRegStar,
} from "react-icons/fa";
import { LuIndianRupee } from "react-icons/lu";

import { IoChevronDown, IoClose, IoFilter } from "react-icons/io5";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import Badge from "@mui/material/Badge";
import ActiveFilters from "./ActiveFilters";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";
import { StarIcon } from "flowbite-react";
import { useSelector } from "react-redux";
import { MdPercent } from "react-icons/md";
const sortOptions = [
  { value: "", label: "Select" },
  { value: "newest_arrivals", label: "Most Recent" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "discount", label: "Highest Discount" },
];

function valuetext(value) {
  return `${value}°C`;
}
const priceOptions = [1, 600, 1000, 1500, 2000, 2600, 4000, 7000, 10000, 10001];
const validPriceOptions = [600, 1000, 1500, 2000, 2600, 4000, 7000, 10000];
const sliderMarks = priceOptions.map((val, i) => ({
  value: i,
}));
const ratingOptions = [
  { value: 4, label: "4★ & above" },
  { value: 3, label: "3★ & above" },
  { value: 2, label: "2★ & above" },
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
const ProductFilters = ({ filters, setFilters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const [sort, setSort] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState(priceOptions[9]);

  const [rating, setRating] = useState("");
  const [discount, setDiscount] = useState("");
  const [sliderValue, setSliderValue] = useState([0, priceOptions.length - 1]);

  const [activeFilters, setActiveFilters] = useState({
    sort: "",
    priceRange: "",
    discount: "",
    rating: "",
  });
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const { loading } = useSelector((state) => state.products);

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
    const sortParam = searchParams.get("sort");
    const minPriceParam = searchParams.get("min-price");
    const maxPriceParam = searchParams.get("max-price");
    const minDiscountParam = searchParams.get("min-discount");
    const minRatingParam = searchParams.get("min-rating");

    const minPriceNum = Number(minPriceParam);
    const maxPriceNum = Number(maxPriceParam);

    const isValidPrice = (val) => priceOptions.includes(val);

    if (sortParam && VALID_SORT_BY.includes(sortParam)) {
      setSort(sortParam);

      const sortLabel = sortOptions.find(
        (option) => option.value === sortParam,
      );

      setActiveFilters((prev) => ({
        ...prev,
        sort: { key: "sort", label: `Sort : ${sortLabel.label}` },
      }));
    } else {
      setSort("");
      setActiveFilters((prev) => ({ ...prev, sort: "" }));
    }

    let minIndex = 0;
    let maxIndex = priceOptions.length - 1;

    if (minPriceParam && isValidPrice(minPriceNum)) {
      minIndex = priceOptions.indexOf(minPriceNum);
      setMinPrice(minPriceNum);
    } else {
      setMinPrice("");
    }

    if (maxPriceParam && isValidPrice(maxPriceNum)) {
      maxIndex = priceOptions.indexOf(maxPriceNum);
      setMaxPrice(maxPriceNum);
    } else {
      setMaxPrice(priceOptions[9]);
    }

    setSliderValue([minIndex, maxIndex]);

    if (minPriceParam || maxPriceParam) {
      setActiveFilters((prev) => ({
        ...prev,
        priceRange: {
          key: "priceRange",
          label: `Price Range : ${
            minPriceParam ? minPriceParam : "Min"
          } - ${maxPriceParam ? maxPriceParam : "Max"}`,
        },
      }));
    } else {
      setActiveFilters((prev) => ({ ...prev, priceRange: "" }));
    }

    if (minDiscountParam && discountOptions.includes(minDiscountParam)) {
      setDiscount(minDiscountParam);
      setActiveFilters((prev) => ({
        ...prev,
        discount: {
          key: "min-discount",
          label: `Discount : ${minDiscountParam}% & above`,
        },
      }));
    } else {
      setDiscount("");
      setActiveFilters((prev) => ({ ...prev, discount: "" }));
    }

    if (minRatingParam && VALID_RATINGS.includes(minRatingParam)) {
      setRating(minRatingParam);
      setActiveFilters((prev) => ({
        ...prev,
        rating: {
          key: "min-rating",
          label: `Rating : ${minRatingParam}★ & above`,
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
    console.log(e);

    const { name, value } = e.target;
    if (value != null && value != "") {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    navigate(`${pathname}?${params}`);
  };

  const handlePriceRangeSelectChange = (e) => {
    const { name, value } = e.target;

    if (validPriceOptions.includes(Number(value))) {
      console.log("includes");

      params.set(name, value);
    } else {
      params.delete(name);
    }
    navigate(`${pathname}?${params}`);
  };

  const handleRatingFilterChange = (e) => {
    const { value } = e.target;
    if (value != null && value != "") {
      value === rating
        ? (params.delete("min-rating"), setRating(null))
        : params.set("min-rating", value);
    } else {
      params.delete("min-rating");
    }
    navigate(`${pathname}?${params}`);
  };

  const handleDiscountFilterChange = (e) => {
    const { value } = e.target;
    if (value != null && value != "") {
      value === discount
        ? (params.delete("min-discount"), setDiscount(null))
        : params.set("min-discount", value);
    } else {
      params.delete("min-discount");
    }
    navigate(`${pathname}?${params}`);
  };
  const handleSliderChange = (event, newValue, activeThumb) => {
    let [min, max] = newValue;
    if (max - min < 1) return;
    setSliderValue([min, max]);
  };
  const handlePriceFilterChangeCommit = (event, newValue) => {
    const [min, max] = newValue;
    if (validPriceOptions.includes(priceOptions[min])) {
      params.set("min-price", priceOptions[min]);
    } else {
      params.delete("min-price");
    }
    if (validPriceOptions.includes(priceOptions[max])) {
      params.set("max-price", priceOptions[max]);
    } else {
      params.delete("max-price");
    }
    navigate(`${pathname}?${params}`);
  };

  const selectStyles =
    "w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";
  const optionStyles =
    "w-full appearance-none text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";
  const labelStyles =
    "flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase mb-1";
  const activeSelectStyles =
    "w-full appearance-none rounded-md border border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 shadow-sm focus:outline-none";
  return (
    <aside className="hidden lg:block w-60 flex-shrink-0 sticky top-28 h-fit space-y-8 p-2">
      <h1 className="text-sm font-bold text-slate-700">Filters & Sorting</h1>
      {/* Sort */}
      <section>
        <div className="w-full">
          <label htmlFor="sort-mobile" className={labelStyles}>
            <FaSort /> Sort By
          </label>
          <div className="relative">
            <select
              name="sort"
              id="sort-desktop"
              disabled={loading}
              defaultValue={sort}
              onChange={handleFilterChange}
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
      </section>
      <section className="mb-6">
        {/* Section Label */}
        <h3 className={`${labelStyles} `}>
          <LuIndianRupee /> Price Range
        </h3>

        {/* Slider Component */}
        <div className="px-2 mb-2">
          <Slider
            value={sliderValue}
            min={0}
            max={priceOptions.length - 1}
            step={1}
            valueLabelDisplay="auto"
            marks={sliderMarks}
            disabled={loading}
            disableSwap={true}
            valueLabelFormat={(index) => {
              const val = priceOptions[index];
              if (index === priceOptions.length - 1) return `₹ 10000+`;
              if (index === 0) return "Min";
              return `₹ ${val}`;
            }}
            onChange={handleSliderChange}
            onChangeCommitted={handlePriceFilterChangeCommit}
            sx={{
              height: 8,
              "& .MuiSlider-track": {
                border: "none",
                background: "linear-gradient(90deg, #6366f1, #a855f7)", // Indigo to Purple
              },
              "& .MuiSlider-thumb": {
                height: 14,
                width: 14,
                borderRadius: 1, // Sharper square look
                backgroundColor: "#fff",
                border: "2px solid #6366f1",
                "&:hover": { boxShadow: "0 0 0 8px rgba(99, 102, 241, 0.16)" },
              },
            }}
          />
        </div>

        <div className="flex gap-3 items-center">
          {/* Minimum Select */}
          <div className="flex-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1 mb-1 block">
              Min Price
            </label>
            <div className="relative">
              <select
                name="min-price"
                value={minPrice}
                onChange={handlePriceRangeSelectChange}
                disabled={loading}
                className={`${selectStyles} w-full py-2 pl-3 pr-8 text-sm border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-indigo-500`}
              >
                {priceOptions.slice(0, -1).map((val, i) => (
                  <option key={i} value={val}>
                    {i === 0 ? "Minimum" : `₹ ${val}`}
                  </option>
                ))}
              </select>
              <IoChevronDown className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Maximum Select */}
          <div className="flex-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1 mb-1 block">
              Max Price
            </label>
            <div className="relative">
              <select
                name="max-price"
                value={maxPrice}
                onChange={handlePriceRangeSelectChange}
                disabled={loading}
                className={`${selectStyles} w-full py-2 pl-3 pr-8 text-sm border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-indigo-500`}
              >
                {priceOptions.slice(1).map((val, i) => (
                  <option key={i} value={val}>
                    {i === priceOptions.length - 2 ? "Maximum" : `₹ ${val}`}
                  </option>
                ))}
              </select>
              <IoChevronDown className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Rating */}
      <section className="space-y-4">
        {/* Section Label */}
        <h3 className={labelStyles}>
          <FaStar /> RATING
        </h3>
        <FormGroup>
          {ratingOptions.map((opt) => (
            <FormControlLabel
              key={opt.value}
              value={opt.value}
              name="min-rating"
              id="rating-desktop"
              label={<span className={optionStyles}>{opt.label}</span>}
              sx={{
                margin: 0,
                marginLeft: "-8px",
                gap: "4px",
                "& .MuiFormControlLabel-label": { fontSize: "0.95rem" },
              }}
              control={
                <Checkbox
                  checked={rating == opt.value}
                  onChange={handleRatingFilterChange}
                  disabled={loading}
                  sx={{
                    padding: "4px",
                    color: "#cbd5e1",
                    "&.Mui-checked": {
                      color: "#6366f1",
                    },
                    "& .MuiSvgIcon-root": { fontSize: 20 },
                  }}
                />
              }
            />
          ))}
        </FormGroup>
      </section>
      <section className="space-y-4">
        {/* Section Label */}
        <h3 className={labelStyles}>
          <MdPercent /> DISCOUNT
        </h3>

        <FormGroup>
          {discountOptions.map((val) => (
            <FormControlLabel
              key={val}
              value={val}
              name="min-discount"
              id="discount-desktop"
              sx={{
                margin: 0,
                marginLeft: "-8px",
                gap: "2px",
                width: "100%",
              }}
              label={<span className={optionStyles}>{val}% or more</span>}
              control={
                <Checkbox
                  disabled={loading}
                  checked={discount == val}
                  onChange={handleDiscountFilterChange}
                  sx={{
                    padding: "4px",
                    "&.Mui-checked": { color: "#6366f1" },
                    "& .MuiSvgIcon-root": { fontSize: 20 },
                  }}
                />
              }
            />
          ))}
        </FormGroup>
      </section>
    </aside>
  );
};

export default ProductFilters;
