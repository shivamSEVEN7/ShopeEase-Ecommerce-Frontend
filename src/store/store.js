import productReducer from "./slice/productSlice";
import categoryReducer from "./slice/categorySlice";
import authReducer from "./slice/authSlice";
import cartReducer from "./slice/cartSlice";
import addressReducer from "./slice/addressSlice";
import paymentReducer from "./slice/paymentSlice";
import orderReducer from "./slice/orderSlice";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
    authentication: authReducer,
    cart: cartReducer,
    address: addressReducer,
    payment: paymentReducer,
    order: orderReducer,
  },
});

export default store;
