import api from "../../api/api";
import { publicApi } from "../../api/api";
import {
  fetchCategoriesFailure,
  fetchCategoriesLoading,
  fetchCategoriesSuccess,
} from "../slice/categorySlice";
import {
  fetchProductByProductIdFailure,
  fetchProductByProductIdLoading,
  fetchProductByProductIdSuccess,
  fetchProductsFailure,
  fetchProductsLoading,
  fetchProductsSuccess,
} from "../slice/productSlice";
import {
  authStart,
  loginSuccess,
  authFailure,
  logout,
  regenerateAccessToken,
  registerUserSuccess,
  logoutFromOtherDeviceSuccess,
} from "../slice/authSlice";
import {
  addItem,
  cartFailure,
  cartLoading,
  removeItem,
  updateCart,
  updateItemQuantity,
} from "../slice/cartSlice";
import toast from "react-hot-toast";
import {
  addAddress,
  addressError,
  addressLoading,
  deleteAddress,
  editAddress,
  getAddresses,
} from "../slice/addressSlice";
import {
  createOrderSuccess,
  fetchMoreUserOrderSuccess,
  fetchOrderByOrderIdSuccess,
  fetchUserOrderSuccess,
  orderError,
  orderLoading,
  updateOrderItemReviewByOrderItemId,
} from "../slice/orderSlice";
export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch(fetchProductsLoading());
    const { data } = await publicApi.get(`/public/products?${queryString}`);
    dispatch(
      fetchProductsSuccess({
        content: data.content,
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        lastPage: data.lastPage,
      })
    );
  } catch (err) {
    console.dir(err);
    dispatch(fetchProductsFailure(err.message));
  }
};

export const fetchProductByProductId =
  (productId, setLoading, setError) => async (dispatch) => {
    try {
      setLoading(true);
      const { data } = await publicApi.get(`/public/products/${productId}`);
      setLoading(false);
      dispatch(fetchProductByProductIdSuccess(data));
    } catch (err) {
      console.dir(err);
      setLoading(false);
      setError(err);
    }
  };

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(fetchCategoriesLoading());
    const { data } = await publicApi.get(`/public/categories`);
    dispatch(
      fetchCategoriesSuccess({
        content: data.content,
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        lastPage: data.lastPage,
      })
    );
  } catch (err) {
    console.dir(err);
    dispatch(fetchCategoriesFailure(err.message));
  }
};

export const login = (formData, reset) => async (dispatch) => {
  try {
    dispatch(authStart());
    console.log(formData);
    const { data } = await publicApi.post(
      "/auth/login",
      {
        username: formData.username,
        password: formData.password,
      },
      { withCredentials: true }
    );
    reset();
    dispatch(loginSuccess(data));
    dispatch(getCart());
    dispatch(getUserAddresses());
  } catch (err) {
    const { status, data } = err.response;
    dispatch(
      authFailure({
        message: err.message,
        toastMessage: data.message || "Login Failed",
      })
    );
  }
};

export const logoutUser = (navigate) => async (dispatch) => {
  try {
    const data = await api.post("/auth/logout", {}, { withCredentials: true });
    console.log(data);
    dispatch(logout());
    navigate("/login", { replace: true });
  } catch (err) {
    console.log("LOGOUT FAILED " + err.message);
  }
};

export const logoutFromOtherDevice = (sessionId) => async (dispatch) => {
  try {
    await api.post(`/auth/sessions/${sessionId}/logout`, {});
    dispatch(logoutFromOtherDeviceSuccess(sessionId));
    toast.success("Logged out from other device");
  } catch (err) {
    console.log("Logout from Other Device Failed");
  }
};

export const refreshAccessToken = () => async (dispatch) => {
  try {
    console.log("RGA");
    dispatch(authStart());
    const { data } = await publicApi.post(
      "/auth/refresh",
      {},
      { withCredentials: true }
    );
    console.log(data);
    dispatch(regenerateAccessToken(data));
    dispatch(getUserAddresses());
    dispatch(getCart());
  } catch (err) {
    dispatch(authFailure({ toastMessage: "You Have Been Logged Out" }));
  }
};

export const registerUser =
  (formData, setRegistrationSuccess) => async (dispatch) => {
    try {
      const data = await publicApi.post("/auth/signup", {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        mobileNumber: formData.mobile,
        gender: formData.gender,
        password: formData.password,
      });
      console.log(data);
      setRegistrationSuccess(true);
      dispatch(registerUserSuccess());
    } catch (err) {
      dispatch(
        authFailure({
          message: err.message,
          toastMessage: "Registration failed",
        })
      );
      console.log("Registration failed " + err.message);
    }
  };

export const verifyAccount = async (token, setStatus) => {
  try {
    setStatus("loading");
    const data = await publicApi.post(`/auth/verify?token=${token}`);
    setStatus("success");
  } catch (error) {
    setStatus("error");
  }
};

export const getCart = () => async (dispatch) => {
  try {
    dispatch(cartLoading());
    const { data } = await api.get(`carts/user/cart`);
    dispatch(
      updateCart({
        cartId: data.cartId,
        price: data.price,
        discount: data.discount,
        shipping: data.shipping,
        totalAmount: data.totalAmount,
        items: data.cartItems,
      })
    );
  } catch (err) {
    console.dir(err);
    dispatch(cartFailure(err.message));
  }
};

export const addItemsToCart = (productId, productName) => async (dispatch) => {
  try {
    dispatch(cartLoading());
    const { data } = await api.post(`cart/product/${productId}/quantity/1`);
    dispatch(
      addItem({
        cartId: data.cartId,
        price: data.price,
        discount: data.discount,
        shipping: data.shipping,
        totalAmount: data.totalAmount,
        items: data.cartItems,
      })
    );
    toast.success(`${productName} added to cart`);
  } catch (err) {
    console.dir(err);
    dispatch(cartFailure(err.message));
  }
};

export const removeItemFromCart =
  (productId, productName) => async (dispatch) => {
    try {
      dispatch(cartLoading());
      const { data } = await api.delete(`/cart/product/${productId}`);
      dispatch(
        removeItem({
          cartId: data.cartId,
          price: data.price,
          discount: data.discount,
          shipping: data.shipping,
          totalAmount: data.totalAmount,
          items: data.cartItems,
        })
      );
      toast.success(`${productName} removed from cart`);
    } catch (err) {
      console.dir(err);
      dispatch(cartFailure(err.message));
    }
  };

export const increaseItemQuantityInCart =
  (productId, productName) => async (dispatch) => {
    try {
      dispatch(cartLoading());
      const { data } = await api.put(
        `/cart/product/${productId}/quantity/increase`
      );
      dispatch(
        updateItemQuantity({
          cartId: data.cartId,
          price: data.price,
          discount: data.discount,
          shipping: data.shipping,
          totalAmount: data.totalAmount,
          items: data.cartItems,
        })
      );
      toast.success(`${productName} quantity increased`);
    } catch (err) {
      console.dir(err);
      dispatch(cartFailure(err.message));
    }
  };

export const decreaseItemQuantityInCart =
  (productId, productName) => async (dispatch) => {
    try {
      dispatch(cartLoading());
      const { data } = await api.put(
        `/cart/product/${productId}/quantity/decrease`
      );
      dispatch(
        updateItemQuantity({
          cartId: data.cartId,
          price: data.price,
          discount: data.discount,
          shipping: data.shipping,
          totalAmount: data.totalAmount,
          items: data.cartItems,
        })
      );
      toast.success(`${productName} quantity decreased`);
    } catch (err) {
      console.dir(err);
      dispatch(cartFailure(err.message));
    }
  };

export const getUserAddresses = () => async (dispatch) => {
  try {
    dispatch(addressLoading());
    const { data } = await api.get(`/user/address`);

    dispatch(
      getAddresses({
        data,
      })
    );
  } catch (err) {
    console.dir(err);
    dispatch(addressError(err.message));
  }
};

export const addNewAddresses = (formData) => async (dispatch) => {
  try {
    dispatch(addressLoading());
    console.log(formData);

    const { data } = await api.post(`/address`, {
      name: formData.name,
      buildingName: formData.buildingName,
      locality: formData.streetAddress,
      ...(formData.landmark && { landmark: formData.landmark }),
      city: formData.city,
      state: formData.state,
      zipcode: formData.pinCode,
      mobileNumber: formData.mobile,
    });
    dispatch(
      addAddress({
        data,
      })
    );
  } catch (err) {
    console.dir(err);
    dispatch(addressError(err.message));
  }
};

export const editUserAddress = (formData, addressId) => async (dispatch) => {
  try {
    dispatch(addressLoading());

    const { data } = await api.put(`/address/${addressId}`, {
      name: formData.name,
      buildingName: formData.buildingName,
      locality: formData.streetAddress,
      ...(formData.landmark && { landmark: formData.landmark }),
      city: formData.city,
      state: formData.state,
      zipcode: formData.pinCode,
      mobileNumber: formData.mobile,
    });
    dispatch(
      editAddress({
        data,
      })
    );
  } catch (err) {
    console.dir(err);
    dispatch(addressError(err.message));
  }
};

export const deleteUserAddress = (addressId) => async (dispatch) => {
  try {
    dispatch(addressLoading());
    const { data } = await api.delete(`/address/${addressId}`);
    dispatch(
      deleteAddress({
        data,
      })
    );
  } catch (err) {
    console.dir(err);
    dispatch(addressError(err.message));
  }
};
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const createOrder =
  (cartItems, selectedAddressId, paymentMode) => async (dispatch) => {
    dispatch(orderLoading());
    try {
      // await delay(10000);
      const { data } = await api.post(`/orders/create`, {
        items: cartItems.map((cartItem) => {
          return { productId: cartItem.product.id };
        }),
        addressId: selectedAddressId,
        paymentMode: paymentMode,
      });
      dispatch(createOrderSuccess());
      dispatch(getCart());
      return data;
    } catch (err) {
      console.dir(err);
      dispatch(orderError(err.message));
      throw new Error(err.message || "Some Error in Creating Order");
    }
  };

export const verifyOrderStatus = async (orderId) => {
  let attempts = 0;
  while (attempts < 5) {
    const { data } = await api.get(`/orders/status?orderId=${orderId}`);
    console.log(data);
    if (data === "CONFIRMED") {
      return "CONFIRMED";
    } else if (data === "PAYMENT_FAILED") {
      return "PAYMENT_FAILED";
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    attempts++;
  }
  return "PENDING_PAYMENT";
};

export const fetchUserOrders =
  (offset = 0, limit = 8) =>
  async (dispatch) => {
    try {
      dispatch(orderLoading());
      const { data } = await api.get(`/orders`);
      dispatch(fetchUserOrderSuccess(data));
    } catch (error) {
      dispatch(orderError(error));
    }
  };

export const fetchMoreUserOrders =
  (offset = 0, limit = 8) =>
  async (dispatch) => {
    try {
      dispatch(orderLoading());
      const { data } = await api.get(`/orders?offset=${offset}&limit=${limit}`);
      dispatch(fetchMoreUserOrderSuccess(data));
    } catch (error) {
      dispatch(orderError(error));
    }
  };

export const fetchOrderByOrderId =
  (orderId, setLoading, setError) => async (dispatch) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/orders/${orderId}`);
      dispatch(fetchOrderByOrderIdSuccess(data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

// Reviews

export const addNewReview = (orderItemId, review) => async (dispatch) => {
  try {
    const { data } = await api.post(`order-item/${orderItemId}/review`, {
      rating: review.rating,
      comment: review.comment,
    });
    dispatch(
      updateOrderItemReviewByOrderItemId({
        orderItemId: orderItemId,
        review: data.review,
      })
    );
    toast.success("Review added");
  } catch (err) {
    toast.error(err.message);
  }
};

//Seller

export const registerSeller = async (
  formData,
  setIsLoading,
  setError,
  setIsSuccess
) => {
  try {
    setIsLoading(true);
    const { data } = await api.post("/sellers/register", {
      ...formData,
    });
    setIsLoading(false);
    setIsSuccess(true);
  } catch (err) {
    setIsLoading(false);
    setError(err);
    toast.error("Registration Failed");
  }
};

export const addNewProduct = async (
  formData,
  categoryId,
  setIsLoading,
  setError,
  setIsSuccess
) => {
  try {
    setIsLoading(true);
    const { data } = await api.post(
      `public/categories/${categoryId}/product`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    setIsLoading(false);
    setIsSuccess(true);
  } catch (err) {
    setIsLoading(false);
    setError(err);
    toast.error("Add new product failed");
  }
};
