import "./App.css";
import Products from "./components/products/Products";
import Home from "./components/home/Home";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Layout from "./components/shared/Layout";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCategories,
  getCart,
  getUserAddresses,
  refreshAccessToken,
} from "./store/actions";
import OrderDetailsPage from "./components/profile/orderDetails/OrderDetailsPage";

import OrderHistory from "./components/profile/OrderHistory";
import MyAccountPage from "./components/profile/MyAccountPage";

import UserProfileInformation from "./components/profile/UserProfileInformation";
import ManageAddresses from "./components/profile/ManageAddresses";
import GiftCardAccount from "./components/profile/GiftCard/GiftCardAccount";
import MyReviews from "./components/profile/MyReviews";

import NotificationsPage from "./components/profile/NotificationsPage";
import WishlistPage from "./components/profile/WishlistPage";
import EnterOtp from "./components/auth/EnterOtp";
import VerifyPage from "./components/auth/VerifyPage";
import ProductPage from "./components/products/ProductPage";
import NotFoundPage from "./components/shared/NotFoundPage";
import SellerRegistrationForm from "./components/seller/SellerRegistrationForm";
import SellerDashboard from "./components/seller/SellerDashboard";
import SellerLayout from "./components/seller/SellerLayout";
import SellerOrdersPage from "./components/seller/SellerOrdersPage";
import SellerProductsPage from "./components/seller/SellerProductsPage";
import SellerInventoryPage from "./components/seller/SellerInventoryPage";
import SellerAnalyticsPage from "./components/seller/SellerAnalyticsPage";
import SellerPaymentsPage from "./components/seller/SellerPaymentsPage";
import SellerSettingsPage from "./components/seller/SellerSettingsPage";
import AddNewProductForm from "./components/seller/AddNewProductForm";
const App = () => {
  const dispatch = useDispatch();
  const initUserDetails = async () => {
    if (localStorage.getItem("isLoggedIn")) {
      dispatch(refreshAccessToken());
    }
  };
  useEffect(() => {
    initUserDetails(), dispatch(fetchCategories());
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "products", element: <Products /> },
        { path: "about", element: <About /> },
        { path: "contactus", element: <Contact /> },
        { path: "cart", element: <Cart /> },
        { path: "verify", element: <VerifyPage /> },
        { path: "product/:productId/:slug", element: <ProductPage /> },
        { path: "become-seller", element: <SellerRegistrationForm /> },

        {
          element: <PublicRoute />,
          children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
          ],
        },
        {
          element: <PrivateRoute />,
          children: [
            {
              path: "/account",
              element: <MyAccountPage />,
              children: [
                { index: true, element: <Navigate to="profile" replace /> },
                { path: "profile", element: <UserProfileInformation /> },
                { path: "addresses", element: <ManageAddresses /> },
                { path: "gift-cards", element: <GiftCardAccount /> },
                { path: "reviews", element: <MyReviews /> },
                { path: "notifications", element: <NotificationsPage /> },
                { path: "wishlist", element: <WishlistPage /> },
                { path: "orders", element: <OrderHistory /> },

                {
                  path: "orders/view/:orderIdParam",
                  element: <OrderDetailsPage />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/seller",
      element: <SellerLayout />,
      children: [
        { index: true, element: <Navigate to="dashboard" replace /> },
        { path: "dashboard", element: <SellerDashboard /> },
        { path: "orders", element: <SellerOrdersPage /> },
        { path: "products", element: <SellerProductsPage /> },
        { path: "products/new", element: <AddNewProductForm /> },
        { path: "inventory", element: <SellerInventoryPage /> },
        { path: "analytics", element: <SellerAnalyticsPage /> },
        { path: "payments", element: <SellerPaymentsPage /> },
        { path: "settings", element: <SellerSettingsPage /> },
      ],
    },

    { path: "/checkout", element: <Checkout /> },
    { path: "*", element: <NotFoundPage /> },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
