import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import AddressList from "./AddressList";
import NavigationBar from "../shared/Navbar";
import PaymentModeList from "./PaymentModeList";
import { useRef, useState } from "react";
import OrderSummary from "./OrderSummary";
import PaymentPage from "./PaymentPage";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../store/actions";
import Loader from "../shared/Loader";
import { ClipLoader, GridLoader, MoonLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import Countdown from "../shared/Countdown";

const Checkout = () => {
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { selectedAddress } = useSelector((state) => state.address);
  const { paymentMode } = useSelector((state) => state.payment);
  const { loading: orderLoading, error: orderError } = useSelector(
    (state) => state.order
  );
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const [steps, setSteps] = useState([
    "Address",
    "Payment Method",
    "Order Summary",
    "Payment",
  ]);
  const [orderComplete, setOrderComplete] = useState(false);
  let paymentSessionId = useRef("");
  let orderId = useRef("");
  const proceedButtonHandler = async () => {
    if (activeStep === 1) {
      console.log(paymentMode.id);
      if (paymentMode.id === "cod") {
        setSteps(["Address", "Payment Method", "Order Summary"]);
      } else {
        setSteps(["Address", "Payment Method", "Order Summary", "Payment"]);
      }
    }

    if (activeStep === 2) {
      //For COD Orders
      if (paymentMode.id === "cod") {
        try {
          console.log("Creating COD order...");
          const data = await dispatch(
            createOrder(
              items,
              selectedAddress.addressId,
              paymentMode.name.toUpperCase()
            )
          );

          orderId.current = data.orderId;
          setOrderComplete(true);
          setTimeout(() => {
            navigate(`/account/orders/view/${orderId.current}`);
          }, 5000);
        } catch (error) {
          console.error("Could not proceed:", error);
          alert("Failed to create the order. Please try again.");
        }
      } else {
        //For Online Orders
        try {
          console.log("Creating order...");
          const data = await dispatch(
            createOrder(
              items,
              selectedAddress.addressId,
              paymentMode.name.toUpperCase()
            )
          );
          paymentSessionId.current = data.paymentSessionId;
          orderId.current = data.orderId;
          setActiveStep((prev) => prev + 1);
        } catch (error) {
          console.error("Could not proceed:", error);
          alert("Failed to create the order. Please try again.");
        }
      }
    }
    // For any other step before the end
    else if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const previousButtonHandler = () => {
    activeStep > 0 ? setActiveStep((prev) => prev - 1) : "";
  };
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Toaster />
      <NavigationBar />

      {/* Content wrapper with bottom padding equal to footer height */}
      <div className="flex-grow w-full py-4 sm:p-6 lg:p-8 pb-24">
        <div className="min-h-[calc(100vh-200px)] bg-white p-0 sm:p-8">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className="mt-2 min-h-[400px]">
            {activeStep === 0 && <AddressList />}
            {activeStep === 1 && <PaymentModeList />}
            {activeStep === 2 && <OrderSummary orderComplete={orderComplete} />}
            {activeStep === 3 && (
              <PaymentPage
                paymentSessionId={paymentSessionId.current}
                orderId={orderId.current}
                setOrderComplete={setOrderComplete}
              />
            )}
          </div>
        </div>
      </div>

      {/* Fixed footer */}
      <footer className="sticky bottom-0 w-full bg-white border-t border-gray-200 h-20">
        {orderComplete ? (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-2xl font-semibold text-gray-800">
            Redirecting in{" "}
            <span className="ml-2">
              <Countdown seconds={5} />
            </span>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
            <button
              disabled={orderLoading || activeStep === 0}
              onClick={previousButtonHandler}
              className="py-2 px-5 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-100 transition-colors disabled:opacity-50"
            >
              Back
            </button>

            <button
              disabled={orderLoading}
              onClick={proceedButtonHandler}
              className="py-2 px-8 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors shadow-sm disabled:bg-gray-400"
            >
              {orderLoading ? (
                <ClipLoader size={20} color="white" />
              ) : (
                "Proceed"
              )}
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};

export default Checkout;
