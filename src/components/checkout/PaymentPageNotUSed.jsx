import React, { useEffect, useState } from "react";

const PaymentPage = () => {
  const handleOnClick = function () {
    var data = {
      key: "O85456",
      hash: "ebcdd544f74c205f6d64ec83dabd27fef2ea3d45ad7a69b42a2ed68f70e5e942fcb2fc136c4970eafc8d548aa8f79bce149dc340ad98fad49ab9eb899af2df14",
      txnid: "TXN-20250924212714549-9af7fe2d",
      amount: "10000",
      firstname: "surbhi",
      email: "text@example.com",
      phone: "1234567890",
      productinfo: "BOLT",
      surl: "http://localhost:8080/api/order/payment/success",
      furl: "http://localhost:8080/api/order/payment/failed",
      lastname: "soni",
      enforce_paymethod: "creditcard|debitcard|HDFB|AXIB",
      display_lang: "Hindi",
      drop_category: "creditcard|debitcard",
      pg: "CC",
      custom_note:
        "You will be charged an extra amount of Rs 100 on this transaction",
    };
    var handlers = {
      responseHandler: function (BOLT) {
        if (BOLT.response.txnStatus == "SUCCESS") {
          console.log("Your payment has been successful");
        }
        if (BOLT.response.txnStatus == "FAILED") {
          console.log("Payment failed. Please try again.");
        }
        if (BOLT.response.txnStatus == "CANCEL") {
          console.log("Payment failed. Please try again.");
        }
      },
      catchException: function (BOLT) {
        console.log("Payment failed. Please try again.");
      },
    };
    bolt.launch(data, handlers);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Complete Your Payment</h2>
      <button onClick={handleOnClick}>Pay Now</button>
    </div>
  );
};

export default PaymentPage;
