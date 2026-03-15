import React, { useEffect, useRef, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FiSearch, FiChevronDown, FiX } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useSelector } from "react-redux";
import formatName from "../../utils/formatName";

const SearchBar = ({ closeExpandedSearch }) => {
  const { items, loading, error } = useSelector((state) => state.categories);
  const categories = [
    {
      categoryId: 0,
      categoryName: "all",
    },
    ...items,
  ];
  const [searchParams, setSearchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const [category, setCategory] = useState(categories[0].categoryName);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    closeExpandedSearch ? closeExpandedSearch() : "";
    if (query === "" && searchParams.get("keyword")) {
      searchParams.delete("keyword");
    }
    if (query) {
      searchParams.set("keyword", query);
    }
    if (category.toLowerCase() != "all") {
      searchParams.set("category", category);
    } else {
      searchParams.delete("category");
    }
    navigate(`/products?${searchParams.toString()}`);
  };

  useEffect(() => {
    searchParams.get("category");
    setQuery(searchParams.get("keyword") || "");
    setCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  return (
    <div className="relative flex items-center bg-white border border-gray-300 rounded-2xl shadow-sm w-full">
      {loading ? (
        "Loading"
      ) : (
        <Listbox value={category} onChange={setCategory}>
          <div className="relative">
            <ListboxButton className="flex items-center gap-1 bg-gray-50 text-gray-700 px-3 py-2 rounded-l-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 w-auto">
              <span>{loading ? "Loading..." : formatName(category)}</span>
              <FiChevronDown className="w-4 h-4 text-gray-500" />
            </ListboxButton>
            <ListboxOptions className="absolute mt-1 bg-white border border-gray-200 rounded-xl shadow-md z-10 focus:outline-none">
              {categories.map((cat) => (
                <ListboxOption
                  key={cat.categoryName}
                  value={cat.categoryName}
                  className={
                    "px-4 py-2 cursor-pointer text-sm data-selected:bg-blue-100 data-active:bg-gray-100 text-black"
                  }
                >
                  {formatName(cat.categoryName)}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      )}

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          aria-label="Clear search"
        >
          <FiX className="w-5 h-5" />
        </button>
      )}

      <button
        onClick={handleSearch}
        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
        aria-label="Search"
      >
        <FiSearch className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;
