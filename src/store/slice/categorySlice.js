import { createSlice } from "@reduxjs/toolkit";
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],

    loading: false,
    error: null,
  },
  reducers: {
    fetchCategoriesLoading: (state) => {
      ((state.loading = true), (state.error = null));
    },
    fetchCategoriesSuccess: (state, action) => {
      ((state.items = action.payload.content),
        (state.loading = false),
        (state.error = null));
    },
    fetchCategoriesFailure: (state, action) => {
      ((state.loading = false), (state.error = action.payload));
    },
  },
});
export const {
  fetchCategoriesSuccess,
  fetchCategoriesLoading,
  fetchCategoriesFailure,
} = categorySlice.actions;
export default categorySlice.reducer;
