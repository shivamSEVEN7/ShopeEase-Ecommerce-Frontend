import { Badge } from "@mui/material";
import { useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { FiGrid, FiSearch, FiShoppingCart } from "react-icons/fi";

import { FaRegUserCircle } from "react-icons/fa";

import { CiLogin } from "react-icons/ci";
import { CiShop } from "react-icons/ci";

import { Link, Navigate, useNavigate } from "react-router";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions";
import SearchBar from "./SearchBar";
import { MdStore } from "react-icons/md";

export default function NavigationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { isAuthenticated, roles } = useSelector(
    (state) => state.authentication
  );
  const { items } = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    dispatch(logoutUser(navigate));
  };
  const closeExpandedSearch = () => {
    setIsSearchExpanded(false);
  };
  const { userDetails } = useSelector((state) => state.authentication);

  return (
    <>
      <nav className="bg-white shadow-md sticky w-full z-50">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {isSearchExpanded ? (
              <div
                className="w-full transition-all duration-300 ease-in-out"
                style={{
                  opacity: isSearchExpanded ? 1 : 0,
                  transform: isSearchExpanded ? "scale(1)" : "scale(0.95)",
                }}
              >
                <SearchBar closeExpandedSearch={closeExpandedSearch} />
              </div>
            ) : (
              <>
                <div className="flex flex-shrink-0 text-2xl font-bold text-blue-600">
                  <Link to={"/"}>ShopEase</Link>
                </div>

                <div className="hidden  md:flex flex-1 items-center mx-4 space-x-2">
                  <SearchBar />
                </div>

                {/* Right: Icons */}

                <div className="flex space-x-4 items-center">
                  <FiSearch
                    onClick={() => {
                      setIsSearchExpanded(true);
                    }}
                    className="md:hidden w-6 h-6"
                  />
                  {isAuthenticated ? (
                    <Dropdown
                      arrowIcon={false}
                      inline
                      placement="bottom"
                      label={<FaRegUserCircle className="h-6 w-6" />}
                    >
                      <DropdownHeader>
                        <span className="block text-sm">
                          {userDetails?.name}
                        </span>
                        <span className="block truncate text-sm font-medium">
                          {userDetails?.email}
                        </span>
                      </DropdownHeader>
                      <Link to={"/account/profile"}>
                        <DropdownItem className="!text-gray-700 hover:!text-gray-900 hover:!bg-gray-100">
                          My Profile
                        </DropdownItem>
                      </Link>
                      <Link to={"/account/orders"}>
                        <DropdownItem className="!text-gray-700 hover:!text-gray-900 hover:!bg-gray-100">
                          Orders
                        </DropdownItem>
                      </Link>
                      <Link to={"/account/wishlist"}>
                        <DropdownItem className="!text-gray-700 hover:!text-gray-900 hover:!bg-gray-100">
                          Wishlist
                        </DropdownItem>
                      </Link>
                      <Link to={"/account/gift-cards"}>
                        <DropdownItem className="!text-gray-700 hover:!text-gray-900 hover:!bg-gray-100">
                          Gift Cards
                        </DropdownItem>
                      </Link>
                      <Link to={"/account/notifications"}>
                        <DropdownItem className="!text-gray-700 hover:!text-gray-900 hover:!bg-gray-100">
                          Notifications
                        </DropdownItem>
                      </Link>
                      <DropdownDivider />
                      <DropdownItem
                        className="!text-gray-700 hover:!text-gray-900 hover:!bg-gray-100"
                        onClick={() => {
                          handleLogout();
                        }}
                      >
                        Sign out
                      </DropdownItem>
                    </Dropdown>
                  ) : (
                    ""
                  )}
                  {isAuthenticated ? (
                    ""
                  ) : (
                    <Link
                      className="flex items-center space-x-2 px-4 py-[6px] 
                            text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm  text-center dark:focus:ring-[#2557D6]/50 "
                      to="/login"
                    >
                      <span className="flex items-center gap-1">
                        <CiLogin className="h-6 w-6" />
                        Login
                      </span>
                    </Link>
                  )}

                  <Link to={"/cart"}>
                    <Badge
                      showZero
                      badgeContent={items.length}
                      color="primary"
                      className="rounded-full hover:bg-gray-100"
                    >
                      <span className="flex items-center gap-1">
                        <FiShoppingCart className="h-6 w-6" />
                      </span>
                    </Badge>
                  </Link>

                  {roles.includes("SELLER", "ADMIN") || !isAuthenticated ? (
                    roles.includes("SELLER") ? (
                      <Link
                        to="/seller/dashboard"
                        className="hidden lg:inline-flex items-center gap-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm transition-all duration-150 ease-in-out hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <MdStore className="h-5 w-5 text-indigo-600" />
                        <span>Seller Panel</span>
                      </Link>
                    ) : (
                      ""
                    )
                  ) : (
                    <Link
                      className="hidden lg:flex items-center space-x-2 px-4 py-[6px] 
                            bg-linear-to-r from-purple-600 to-red-500 
                            text-white font-semibold rounded-md shadow-lg 
                            hover:from-purple-500 hover:to-red-400 transition 
                            duration-300 ease-in-out transform "
                      to="/become-seller"
                    >
                      <CiShop />
                      <span>Become a Seller</span>
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      {isSearchExpanded && (
        <div
          onTouchStart={() => {
            setIsSearchExpanded(false);
          }}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
        ></div>
      )}
    </>
  );
}
