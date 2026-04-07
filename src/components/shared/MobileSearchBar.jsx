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

const MobileSearchBar = ({ closeExpandedSearch }) => {
  const { items, loading, error } = useSelector((state) => state.categories);
  const categories = [
    {
      categoryId: 0,
      categoryName: "all",
    },
    ...items,
  ];
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(categories[0].categoryName);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("QUERY is");
    closeExpandedSearch ? closeExpandedSearch() : "";
    if (query) {
      searchParams.set("keyword", query);
    }
    navigate(`/products?keyword=${query}`);
  };

  useEffect(() => {
    searchParams.get("category");
    setQuery(searchParams.get("keyword") || "");
    setCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  return (
    <div className="flex flex-col h-full w-full bg-white animate-in slide-in-from-top duration-300 ease-out">
      <div className="flex items-center gap-3 p-4 border-b border-slate-100">
        <div className="flex-1 relative flex items-center bg-slate-100/80 rounded-2xl px-3 h-10 group focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <input
            autoFocus
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-base placeholder:text-slate-400"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="flex items-center justify-center w-8 h-8 ml-1 rounded-full hover:bg-slate-200 transition-colors shrink-0"
              aria-label="Clear search"
            >
              <FiX className="w-4 h-4 text-slate-500" />
            </button>
          )}

          <button
            onClick={handleSearch}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-200 transition-colors shrink-0"
            aria-label="Search"
          >
            <FiSearch className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <button
          onClick={closeExpandedSearch}
          className="text-sm font-bold text-slate-600 hover:text-blue-600 px-1 transition-colors whitespace-nowrap"
        >
          Cancel
        </button>
      </div>

      <div className="flex-1 bg-white" />
    </div>
  );
};

export default MobileSearchBar;
