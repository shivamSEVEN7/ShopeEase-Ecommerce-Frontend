// MyAccountPage.js
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { IoMenu } from "react-icons/io5";
import { Outlet, ScrollRestoration } from "react-router";
import { useSelector } from "react-redux";

const MyAccountPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleSectionClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="bg-slate-100 flex flex-col font-sans pb-8">
      <div className="container mx-auto p-4 flex-grow">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden bg-white p-2 rounded-md shadow-md mb-4 flex items-center text-gray-700"
        >
          <IoMenu size={24} className="mr-2" />
          My Account Menu
        </button>

        <div className="flex flex-col md:flex-row md:space-x-6">
          {isSidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 lg:hidden"
            ></div>
          )}

          <Sidebar
            onSectionClick={handleSectionClick}
            isOpen={isSidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <main className="flex-grow mt-4 md:mt-4">
            <Outlet />
          </main>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default MyAccountPage;
