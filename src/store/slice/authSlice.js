import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  username: null,
  userDetails: null,
  accessToken: null,
  isAuthenticated: localStorage.getItem("isLoggedIn"),
  loading: false,
  error: null,
  expiresAt: null,
  roles: [],
};
const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.username = action.payload.username;
      state.userDetails = action.payload.userDetails;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.loading = false;
      state.roles = action.payload.roles;
      state.expiresAt = action.payload.expiresAt || null;
      localStorage.setItem("isLoggedIn", true);
      toast.success("Login successful");
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      localStorage.removeItem("isLoggedIn");
      toast.error(action.payload.toastMessage);
    },
    regenerateAccessToken: (state, action) => {
      state.username = action.payload.username;
      state.userDetails = action.payload.userDetails;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.loading = false;
      state.roles = action.payload.roles;
      state.expiresAt = action.payload.expiresAt || null;
      localStorage.setItem("isLoggedIn", true);
    },
    logout: (state) => {
      localStorage.removeItem("isLoggedIn");
      toast.success("Logout successful");
      return { ...initialState, isAuthenticated: null };
    },
    logoutFromOtherDeviceSuccess: (state, action) => {
      state.userDetails.activeSessions =
        state.userDetails.activeSessions.filter((s) => s.id != action.payload);
    },
    registerUserSuccess: (state) => {
      state.loading = false;
      state.error = null;
      toast.success("Account Created Successfully");
    },
  },
});
export const {
  authStart,
  loginSuccess,
  authFailure,
  regenerateAccessToken,
  logout,
  registerUserSuccess,
  logoutFromOtherDeviceSuccess,
} = authSlice.actions;
export default authSlice.reducer;
