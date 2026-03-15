import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    pagination: {},
    loading: false,
    error: null,
    currentProduct: null,
    currentProductLoading: false,
    currentProductError: null,
  },
  reducers: {
    fetchProductsLoading: (state) => {
      (state.loading = true), (state.error = null);
    },
    fetchProductsSuccess: (state, action) => {
      (state.products = action.payload.content),
        (state.pagination = {
          pageNumber: action.payload.pageNumber,
          pageSize: action.payload.pageSize,
          totalElements: action.payload.totalElements,
          totalPages: action.payload.totalPages,
          lastPage: action.payload.lastPage,
        }),
        (state.loading = false),
        (state.error = null);
    },
    fetchProductsFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    fetchProductByProductIdSuccess: (state, action) => {
      state.currentProductLoading = false;
      state.currentProductError = null;
      state.currentProduct = action.payload;
    },
    fetchProductByProductIdLoading: (state, action) => {
      (state.currentProductLoading = true), (state.currentProductError = null);
    },
    fetchProductByProductIdFailure: (state, action) => {
      (state.currentProductLoading = true),
        (state.currentProductError = action.payload);
    },
  },
});
export const {
  fetchProductsSuccess,
  fetchProductsLoading,
  fetchProductsFailure,
  fetchProductByProductIdSuccess,
  fetchProductByProductIdLoading,
  fetchProductByProductIdFailure,
} = productSlice.actions;
export default productSlice.reducer;
