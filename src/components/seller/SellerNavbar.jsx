import React from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import {
  FiBell,
  FiSearch,
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { MdStore } from "react-icons/md"; // 1. Corrected import

const SellerNavbar = ({ setIsOpen }) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-4 shadow-sm sm:px-6">
      {/* --- Hamburger & Search --- */}
      <div className="flex items-center">
        <button
          onClick={() => setIsOpen(true)}
          className="mr-4 text-gray-500 hover:text-gray-700 md:hidden"
          aria-label="Open sidebar"
        >
          <FiMenu className="h-6 w-6" />
        </button>
        <div className="relative w-full max-w-sm md:max-w-md lg:max-w-xl">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="search"
            placeholder="Search orders, products..."
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* --- Icons & Profile --- */}
      <div className="flex items-center space-x-3">
        {/* Notification Bell */}
        <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none">
          <FiBell className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            3
          </span>
        </button>

        {/* Profile Dropdown */}
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center space-x-2 rounded-md p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            {/* 2. Replaced with MdStore */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600">
              <MdStore className="h-5 w-5" />
            </div>

            <span className="hidden text-sm font-medium text-gray-700 md:block">
              Acme Inc.
            </span>
            <FiChevronDown className="h-4 w-4 text-gray-500" />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
                      transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            {/* ... (MenuItems remain the same) ... */}
            <div className="px-1 py-1">
              <MenuItem>
                <button
                  className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 
                             data-[focus]:bg-indigo-500 data-[focus]:text-white"
                >
                  <FiUser className="mr-2 h-5 w-5 text-gray-400 group-data-[focus]:text-white" />
                  My Profile
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 
                             data-[focus]:bg-indigo-500 data-[focus]:text-white"
                >
                  <FiSettings className="mr-2 h-5 w-5 text-gray-400 group-data-[focus]:text-white" />
                  Account Settings
                </button>
              </MenuItem>
            </div>
            <div className="px-1 py-1">
              <MenuItem>
                <button
                  className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 
                             data-[focus]:bg-indigo-500 data-[focus]:text-white"
                >
                  <FiLogOut className="mr-2 h-5 w-5 text-gray-400 group-data-[focus]:text-white" />
                  Logout
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
};

export default SellerNavbar;
