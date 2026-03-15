import React, { useState, useRef, useEffect } from "react";
import { IoSearch, IoClose } from "react-icons/io5";

export default function ExpandingSearchBar() {
  // State to manage if the search bar is open or closed
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Ref to the input element for focusing
  const inputRef = useRef(null);

  // When the search bar opens, focus the input field
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <div className="relative flex items-center">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        className={`
      h-10 rounded-full border-2 bg-white pl-4 pr-10 outline-none
      transition-all duration-300 ease-in-out
      ${
        isSearchOpen
          ? "w-64 sm:w-48 xs:w-40 border-gray-300 opacity-100"
          : "w-0 border-transparent opacity-0"
      }
    `}
      />

      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="absolute right-2 top-1/2 -translate-y-1/2"
        aria-label="Toggle search"
      >
        {isSearchOpen ? <IoClose size={24} /> : <IoSearch size={24} />}
      </button>
    </div>
  );
}
