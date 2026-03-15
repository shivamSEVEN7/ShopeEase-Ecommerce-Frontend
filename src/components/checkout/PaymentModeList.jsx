import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setPaymentMode } from "../../store/slice/paymentSlice";
import PaymentModeCard from "./PaymentModeCard";
const PaymentModeList = () => {
  const paymentOptions = [
    {
      id: "cod",
      name: "Cash on Delivery",
    },
    {
      id: "online",
      name: "Online",
    },
  ];

  return (
    <div className=" flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-6 md:p-8  w-full max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Choose Your Payment Method
        </h2>
        <div className="flex flex-wrap justify-center gap-5">
          {paymentOptions.map((option) => (
            <PaymentModeCard key={option.id} option={option} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default PaymentModeList;
