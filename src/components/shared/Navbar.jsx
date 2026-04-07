import { Badge, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { FiGrid, FiSearch, FiShoppingCart, FiX } from "react-icons/fi";

import { FaRegUserCircle } from "react-icons/fa";

import { CiLogin } from "react-icons/ci";
import { CiShop } from "react-icons/ci";

import { Link, Navigate, useNavigate, useSearchParams } from "react-router";
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

import { MdStore } from "react-icons/md";
import CategoryNavBar from "./CategoryNavBar";
import CategoryNavBarSkeleton from "./CategoryNavBarSkelton";
import MobileSearchBar from "./MobileSearchBar";
import { Dialog, DialogPanel } from "@headlessui/react";

export default function NavigationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const {
    items: categories,
    loading: categoriesLoading,
    error,
  } = useSelector((state) => state.categories);
  const {
    isAuthenticated,
    loading: isAuthenticating,
    roles,
  } = useSelector((state) => state.authentication);
  const { items } = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleLogout = () => {
    dispatch(logoutUser(navigate));
  };
  const closeExpandedSearch = () => {
    setIsSearchExpanded(false);
  };
  const { userDetails } = useSelector((state) => state.authentication);
  const handleSearch = () => {
    if (query) {
      searchParams.set("keyword", query);
      navigate(`/products?keyowrd=${query}`);
    }
  };
  const { loading: isCartLoading } = useSelector((state) => state.cart);

  return (
    <>
      <nav
        className={`sticky top-0 w-full z-50 transition-all duration-300
  ${scrolled ? "bg-white/60 backdrop-blur-md shadow-md" : "bg-white"}`}
      >
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {isSearchExpanded ? (
              <Dialog
                open={isSearchExpanded}
                onClose={() => setIsSearchExpanded(false)}
                className="relative z-[100]"
              >
                <div
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                  aria-hidden="true"
                />

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-start justify-center p-0 sm:p-4">
                    <DialogPanel className="w-full bg-white shadow-xl transition-all">
                      <MobileSearchBar
                        closeExpandedSearch={closeExpandedSearch}
                      />
                    </DialogPanel>
                  </div>
                </div>
              </Dialog>
            ) : (
              <>
                <div className="flex flex-shrink-0 text-2xl font-black tracking-tight text-blue-600">
                  <Link to={"/"}>ShopEase</Link>
                </div>

                <div className="flex space-x-4 items-center">
                  <div className="hidden  md:flex flex-1 items-center mx-4 space-x-2">
                    <div className="hidden lg:flex items-center bg-slate-100/50 rounded-full px-4 py-1.5">
                      <FiSearch className="text-slate-400 text-lg mr-2" />
                      <input
                        type="text"
                        placeholder="Search for products..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSearch();
                          }
                        }}
                        className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-sm w-96 placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                  <FiSearch
                    onClick={() => {
                      setIsSearchExpanded(true);
                    }}
                    className="md:hidden w-6 h-6"
                  />
                  {isAuthenticated ? (
                    isAuthenticating ? (
                      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                    ) : (
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
                    )
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
                  {isAuthenticating ? (
                    <div className="relative">
                      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
                    </div>
                  ) : (
                    <Badge
                      showZero
                      badgeContent={
                        isCartLoading ? (
                          <CircularProgress
                            size={10}
                            thickness={6}
                            sx={{ color: "#36d7b7" }}
                          />
                        ) : (
                          items.length
                        )
                      }
                      color="primary"
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: isCartLoading ? "white" : undefined,
                          color: isCartLoading ? "inherit" : "white",
                          border: isCartLoading ? "1px solid #e2e8f0" : "none",
                          padding: isCartLoading ? "2px" : "0",
                          minWidth: isCartLoading ? "18px" : "20px",
                          height: isCartLoading ? "18px" : "20px",
                        },
                      }}
                    >
                      <span className="flex items-center gap-1">
                        <FiShoppingCart className="h-6 w-6" />
                      </span>
                    </Badge>
                  )}

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
                  ) : isAuthenticating ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full animate-pulse">
                      <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                      <div className="w-20 h-3 bg-gray-300 rounded animate-pulse"></div>
                    </div>
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
      {categoriesLoading ? (
        <CategoryNavBarSkeleton />
      ) : (
        <CategoryNavBar
          categories={categories}
          categoriesLoading={categoriesLoading}
        />
      )}
      {/* {isSearchExpanded && (
        <div
          onTouchStart={() => {
            setIsSearchExpanded(false);
          }}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
        ></div>
      )} */}
    </>
  );
}
