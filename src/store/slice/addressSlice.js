import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice";
const initialState = {
  list: [],
  selectedAddress: null,
  loading: false,
  error: null,
};
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addressLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAddresses: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
    },
    addressError: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    addAddress: (state, action) => {
      state.list = [...state.list, action.payload.data];
      state.loading = false;
    },
    deleteAddress: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
    },
    editAddress: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
    },
    selectAddress: (state, action) => {
      state.selectedAddress = action.payload;
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
  addressLoading,
  getAddresses,
  addressError,
  addAddress,
  deleteAddress,
  editAddress,
  selectAddress,
} = addressSlice.actions;
export default addressSlice.reducer;
