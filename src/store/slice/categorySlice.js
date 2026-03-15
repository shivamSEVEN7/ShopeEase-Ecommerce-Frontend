import { createSlice } from "@reduxjs/toolkit";
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    pagination: {},
    loading: false,
    error: null,
  },
  reducers: {
    fetchCategoriesLoading: (state) => {
      (state.loading = true), (state.error = null);
    },
    fetchCategoriesSuccess: (state, action) => {
      (state.items = action.payload.content),
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
    fetchCategoriesFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
  },
});
export const {
  fetchCategoriesSuccess,
  fetchCategoriesLoading,
  fetchCategoriesFailure,
} = categorySlice.actions;
export default categorySlice.reducer;
