import React, { useEffect, useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import Loader from "../shared/Loader";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { verifyOrderStatus } from "../../store/actions";
import { useNavigate } from "react-router";

const PaymentPage = ({ paymentSessionId, orderId, setOrderComplete }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const initPayment = async () => {
      setIsGatewayLoading(true);
      const cashfree = await load({ mode: "sandbox" }); // or "production"
      setIsGatewayLoading(false);
      cashfree
        .checkout({
          paymentSessionId,
          redirectTarget: "_modal",
        })
        .then((result) => {
          if (result.error) {
            console.log(
              "User has closed the popup or there is some payment error, Check for Payment Status"
            );
            console.log(result.error);
            setPaymentFailed(true);
            console.log("Payment Failed is " + paymentFailed);
          }
          if (result.redirect) {
            console.log("Payment will be redirected");
          }
          if (result.paymentDetails) {
            console.log(
              "Payment has been completed, Verifying payment from Backend"
            );
            console.log("Order Id is " + orderId);
            setIsProcessing(true);
            verifyOrderStatus(orderId).then((orderStatus) => {
              setIsProcessing(false);
              if (orderStatus === "CONFIRMED") {
                setIsPaymentSuccess(true);
                setOrderComplete(true);
                setTimeout(() => {
                  navigate(`/account/orders/view/${orderId}`);
                }, 5000);
              } else if (orderStatus === "PAYMENT_FAILED") {
                setPaymentFailed(true);
              } else if (orderStatus === "PENDING_PAYMENT") {
                setIsPaymentPending(true);
                setTimeout(() => {
                  navigate(`/account/orders`);
                }, 3000);
              }
            });
          }
        });
    };

    initPayment();
  }, [paymentSessionId]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [isGatewayLoading, setIsGatewayLoading] = useState(true);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isPaymentPending, setIsPaymentPending] = useState(false);

  return (
    <div class="row">
      {isGatewayLoading && (
        <div className="flex flex-col items-center justify-center mt-38">
          <DotLottieReact
            src="https://lottie.host/e1bc5a57-b005-4d1a-af71-41f137c63adc/o36erDNDTv.lottie"
            loop
            autoplay
            className="w-70 h-35"
          />
          <h1>Payment Gateway Loading</h1>
        </div>
      )}
      {paymentFailed && (
        <div className="flex flex-col items-center justify-center mt-38">
          <DotLottieReact
            src="https://lottie.host/ec366b0d-2608-41e7-a378-c8a2cb44e4e2/GlDtZZC3is.lottie"
            loop
            autoplay
            className="w-70 h-35"
          />
          <h1>Payment not completed Order has not been placed</h1>
        </div>
      )}
      {isPaymentSuccess && (
        <div className="flex flex-col items-center justify-center mt-38">
          <DotLottieReact
            src="https://lottie.host/68b3294f-c458-4d48-909f-9750d50490b6/8Yh8kwnB1n.lottie"
            loop
            autoplay
            className="w-70 h-35"
          />
          <h1>Your payment was successful! Your order has been placed</h1>
        </div>
      )}
      {isPaymentPending && (
        <div className="flex flex-col items-center justify-center mt-38">
          <DotLottieReact
            src="https://lottie.host/9aab0b21-b4d2-4b13-9562-b38991b3d125/kFwLClhVaq.lottie"
            loop
            autoplay
            className="w-70 h-35"
          />
          <h1>
            Payment successful. Your order will be confirmed shortly once we
            finish processing.
          </h1>
        </div>
      )}
      {isProcessing && (
        <div className="flex flex-col items-center justify-center ">
          <Loader text={"Verifying Payment from backend"} />
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
