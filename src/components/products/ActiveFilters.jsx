import React from "react";
import { IoClose } from "react-icons/io5";

const ActiveFilters = ({
  mockActiveFilters,
  handleRemoveFilter,
  handleClearAllFilters,
}) => {
  // const handleRemoveFilter = (id) => {
  //   console.log(`Remove filter: ${id}`);
  // };

  // const handleClearAll = () => {
  //   console.log("Clear all filters");
  // };

  return (
    <div className="hidden mb-6 mt-4 lg:flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-gray-500">Active Filters:</span>

      {Object.entries(mockActiveFilters).map(([key, value]) =>
        value != "" ? (
          <span
            key={value.key}
            className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
          >
            {value.label}
            <button
              onClick={() => handleRemoveFilter(value.key)}
              className="ml-1 rounded-full p-0.5 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-800 focus:outline-none"
              aria-label={`Remove ${value.label}`}
            >
              <IoClose className="h-4 w-4" />
            </button>
          </span>
        ) : (
          ""
        )
      )}

      <button
        onClick={handleClearAllFilters}
        className="ml-2 text-sm font-medium text-red-600 hover:text-red-800 hover:underline focus:outline-none"
      >
        Clear All
      </button>
    </div>
  );
};

export default ActiveFilters;
