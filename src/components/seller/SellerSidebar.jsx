import React from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiShoppingCart,
  FiPackage,
  FiBarChart2,
  FiSettings,
  FiX,
  FiExternalLink,
} from "react-icons/fi";
import { FaBoxes, FaMoneyBillWave } from "react-icons/fa";

const SidebarLink = ({ icon, text, to }) => (
  <li>
    <NavLink
      to={to}
      end={to === "/seller/dashboard"}
      className={({ isActive }) =>
        `flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${
          isActive
            ? "bg-indigo-600 text-white"
            : "text-gray-300 hover:bg-slate-700 hover:text-white"
        }`
      }
    >
      {React.cloneElement(icon, { className: "h-5 w-5" })}
      <span>{text}</span>
    </NavLink>
  </li>
);

const NavigationContent = () => (
  <nav className="flex flex-1 flex-col h-full">
    <ul className="flex-1 space-y-2 list-none p-0">
      <SidebarLink icon={<FiHome />} text="Dashboard" to="/seller/dashboard" />
      <SidebarLink
        icon={<FiShoppingCart />}
        text="Orders"
        to="/seller/orders"
      />
      <SidebarLink icon={<FiPackage />} text="Products" to="/seller/products" />
      <SidebarLink icon={<FaBoxes />} text="Inventory" to="/seller/inventory" />
      <SidebarLink
        icon={<FiBarChart2 />}
        text="Analytics"
        to="/seller/analytics"
      />
      <SidebarLink
        icon={<FaMoneyBillWave />}
        text="Payments"
        to="/seller/payments"
      />
      <SidebarLink
        icon={<FiSettings />}
        text="Settings"
        to="/seller/settings"
      />
    </ul>
    <div className="mt-6 border-t border-slate-700 pt-4">
      <ul className="list-none p-0">
        <SidebarLink icon={<FiExternalLink />} text="Back to Store" to="/" />
      </ul>
    </div>
  </nav>
);

const SellerSidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <Dialog
        as="div"
        className="relative z-40 md:hidden"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        transition
      >
        <div className="fixed inset-0 bg-black/30 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />
        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative flex w-64 max-w-xs flex-1 flex-col bg-slate-800 p-4 text-gray-200 transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <FiX className="h-6 w-6 text-white" />
              </button>
            </div>

            <div className="mb-8 flex items-center gap-3 flex-shrink-0">
              {" "}
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-2xl font-bold">
                SE
              </span>
              <span className="text-xl font-semibold">ShopEase Panel</span>
            </div>

            <NavigationContent />
          </DialogPanel>
        </div>
      </Dialog>

      <nav
        className="hidden w-64 flex-shrink-0 flex-col bg-slate-800 p-4 text-gray-200 
                   md:sticky md:top-0 md:flex md:h-screen md:overflow-y-auto"
      >
        <div className="mb-8 flex items-center gap-3 flex-shrink-0">
          {" "}
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-2xl font-bold">
            SE
          </span>
          <span className="text-xl font-semibold">ShopEase Panel</span>
        </div>

        <NavigationContent />
      </nav>
    </>
  );
};

export default SellerSidebar;
