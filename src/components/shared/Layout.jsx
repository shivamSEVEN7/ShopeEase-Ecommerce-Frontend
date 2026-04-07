import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "./Footer";
import NavigationBar from "./Navbar";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  getCart,
  getUserAddresses,
  refreshAccessToken,
} from "../../store/actions";
import { useEffect } from "react";
const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            className: "text-sm font-medium",
            style: {
              border: "1px solid #f1f5f9",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
            },
          }}
        />
      </div>
      <NavigationBar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <ScrollRestoration />
    </div>
  );
};
export default Layout;
