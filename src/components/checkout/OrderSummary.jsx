import { FaPaypal } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FaMoneyBillWave } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import formatToINR from "../../utils/formatToINR";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const OrderSummary = ({ orderComplete }) => {
  const {
    items: cartItems,
    price,
    discount,
    totalAmount,
    shipping,
  } = useSelector((state) => state.cart);

  const { selectedAddress } = useSelector((state) => state.address);
  const { paymentMode } = useSelector((state) => state.payment);

  return orderComplete ? (
    <div className="flex flex-col items-center justify-center mt-38">
      <DotLottieReact
        src="https://lottie.host/68b3294f-c458-4d48-909f-9750d50490b6/8Yh8kwnB1n.lottie"
        loop
        autoplay
        className="w-70 h-35"
      />
      <h1>Your order has been placed</h1>
    </div>
  ) : (
    <div className="  flex items-center justify-center font-sans">
      <div className="bg-white p-6 md:p-8 w-full max-w-5xl lg:max-w-6xl">
        {" "}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Order Summary
        </h1>
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-5 mb-8 lg:mb-0 p-4 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700 border-b pb-3">
                Your Items
              </h2>
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.productName}
                    className="w-16 h-16 rounded-lg object-contain bg-white p-1 shadow-sm flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-800 text-lg">
                      {item.product.productName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-gray-900 text-lg">
                    {formatToINR(item.quantity * item.product.specialPrice)}
                  </p>
                </div>
              ))}
            </div>
            <hr className="my-6 lg:hidden" />{" "}
            <div className="space-y-3 p-4 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700 border-b pb-3">
                Order Totals
              </h2>
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>{formatToINR(price)}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Discount</span>
                <span>-{formatToINR(discount)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>{formatToINR(shipping)}</span>
              </div>

              <div className="flex justify-between text-xl font-bold text-gray-900 mt-4 pt-4 border-t border-gray-300">
                <span>Total</span>
                <span>{formatToINR(totalAmount)}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 mt-8 lg:mt-0 space-y-8">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                Delivery Address
              </h3>
              <div className="text-gray-600 space-y-1">
                <p className="font-medium text-lg">{selectedAddress.name}</p>
                <p>{selectedAddress.buildingName},</p>
                <p>{selectedAddress.locality},</p>
                <p>
                  {selectedAddress.city},{selectedAddress.state},
                </p>

                <p>Pin - {selectedAddress.zipcode}</p>
                <p className="text-sm mt-1">
                  Phone: {selectedAddress.mobileNumber}
                </p>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                Payment Method
              </h3>
              <div className="flex items-center gap-3">
                {paymentMode.id === "online" ? (
                  <MdPayment color="#4CAF50" />
                ) : (
                  <FaMoneyBillWave color="#FF9800" />
                )}
                <span className="font-medium text-gray-700 text-lg">
                  {paymentMode.id === "online" ? "Online" : "Cash On Delievery"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;
