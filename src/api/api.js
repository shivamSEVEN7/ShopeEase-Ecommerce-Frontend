import axios from "axios";
import store from "../store/store";
import { refreshAccessToken } from "../store/actions";
import { authFailure } from "../store/slice/authSlice";
const apiUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: `${apiUrl}/api`,
  // baseURL: "https://shopease-service.onrender.com/api"
});

api.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().authentication.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let queue = [];

const processQueue = (token) => {
  queue.forEach((cb) => cb(token));
  queue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await store.dispatch(refreshAccessToken());

        isRefreshing = false;
        processQueue(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        isRefreshing = false;
        store.dispatch(
          authFailure({ toastMessage: "You Have Been Logged Out" }),
        );

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export const publicApi = axios.create({ baseURL: `${apiUrl}/api` }, (error) => {
  return Promise.reject(error);
});

export default api;
