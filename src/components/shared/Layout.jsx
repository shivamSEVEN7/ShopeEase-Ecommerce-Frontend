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
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <div>
        <Toaster />
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
