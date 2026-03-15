import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";
import SellerNavbar from "./SellerNavbar";
import SellerFooter from "./SellerFooter";

const SellerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <SellerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="sticky top-0 z-30 flex-shrink-0">
          <SellerNavbar setIsOpen={setIsSidebarOpen} />
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col">
          <main className="flex-grow p-6">
            <Outlet />
          </main>
          <SellerFooter />
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
