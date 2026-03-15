import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  paymentMode: { id: null, name: null },
};
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentMode: (state, action) => {
      state.paymentMode = action.payload;
    },
  },
});

export const { setPaymentMode } = paymentSlice.actions;
export default paymentSlice.reducer;
