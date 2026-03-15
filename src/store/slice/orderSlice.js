import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice";
const initialState = {
  orders: [],
  pagination: {},
  currentOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    orderLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    orderError: (state, action) => {
      (state.loading = false), (state.error = action.payload.message);
    },
    createOrderSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    fetchUserOrderSuccess: (state, action) => {
      state.loading = false;
      (state.orders = action.payload.content),
        (state.pagination = action.payload.pagination),
        (state.loading = false),
        (state.error = null);
    },
    fetchMoreUserOrderSuccess: (state, action) => {
      state.loading = false;
      (state.orders = [...state.orders, ...action.payload.content]),
        (state.pagination = action.payload.pagination),
        (state.loading = false),
        (state.error = null);
    },
    fetchOrderByOrderIdSuccess: (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
      state.error = null;
    },
    updateOrderItemReviewByOrderItemId: (state, action) => {
      const { review, orderItemId } = action.payload;
      state.orders.forEach((order) => {
        const item = order.orderItems.find((i) => i.id === orderItemId);
        if (item) {
          item.review = review;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      return initialState;
    });
  },
});

export default orderSlice.reducer;
export const {
  orderLoading,
  orderError,
  fetchUserOrderSuccess,
  fetchMoreUserOrderSuccess,
  createOrderSuccess,
  fetchOrderByOrderIdSuccess,
  updateOrderItemReviewByOrderItemId,
} = orderSlice.actions;
