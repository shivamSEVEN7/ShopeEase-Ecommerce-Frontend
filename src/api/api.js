import axios from "axios";
import store from "../store/store";
import { refreshAccessToken } from "../store/actions";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});
api.interceptors.request.use(
  async (config) => {
    console.log("request intercepted");
    const expiryDate = new Date(store.getState().authentication.expiresAt);
    const isAuthenticated = store.getState().authentication.isAuthenticated;
    let accessToken = store.getState().authentication.accessToken;

    if (isAuthenticated) {
      if (accessToken == null || expiryDate <= new Date()) {
        await store.dispatch(refreshAccessToken());
        accessToken = store.getState().authentication.accessToken;
      }
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const publicApi = axios.create(
  { baseURL: "http://localhost:8080/api" },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
