import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice";
const initialState = {
  cartId: null,
  price: null,
  discount: null,
  shipping: null,
  totalAmount: null,
  items: [],
  loading: false,
  error: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCart: (state, action) => {
      state.cartId = action.payload.cartId;
      state.price = action.payload.price;
      state.discount = action.payload.discount;
      state.shipping = action.payload.shipping;
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
      state.loading = false;
    },

    addItem: (state, action) => {
      state.cartId = action.payload.cartId;
      state.price = action.payload.price;
      state.discount = action.payload.discount;
      state.shipping = action.payload.shipping;
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
      state.loading = false;
    },
    cartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    removeItem: (state, action) => {
      state.cartId = action.payload.cartId;
      state.price = action.payload.price;
      state.discount = action.payload.discount;
      state.shipping = action.payload.shipping;
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
      state.loading = false;
    },

    updateItemQuantity: (state, action) => {
      state.cartId = action.payload.cartId;
      state.price = action.payload.price;
      state.discount = action.payload.discount;
      state.shipping = action.payload.shipping;
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      return initialState;
    });
  },
});
export const {
  cartLoading,
  updateCart,
  addItem,
  cartFailure,
  removeItem,
  updateItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
