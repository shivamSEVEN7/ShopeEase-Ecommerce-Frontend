import { useDispatch, useSelector } from "react-redux";
import { setPaymentMode } from "../../store/slice/paymentSlice";
import { FaMoneyBillWave } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
const PaymentModeCard = ({ option }) => {
  const dispatch = useDispatch();
  const { paymentMode } = useSelector((state) => state.payment);
  const isSelected = paymentMode.id === option.id;

  return (
    <div
      key={option.id}
      onClick={() => dispatch(setPaymentMode({ ...option }))}
      className={`relative flex flex-col items-center justify-center p-5 border-2 rounded-lg cursor-pointer transition-all duration-200 w-full sm:w-40
                                    ${
                                      isSelected
                                        ? "border-blue-500 scale-105 shadow-lg"
                                        : "border-gray-200 hover:border-blue-500"
                                    }`}
    >
      <div
        className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white 
                                    ${
                                      isSelected
                                        ? "border-green-500"
                                        : "border-gray-300"
                                    }`}
      >
        <div
          className={`w-3.5 h-3.5 rounded-full transition-colors duration-200 
                                        ${
                                          isSelected
                                            ? "bg-green-500"
                                            : "bg-gray-300"
                                        }`}
        ></div>
      </div>

      <div className="text-5xl mb-3">
        {option.id === "cod" ? (
          <FaMoneyBillWave color="#FF9800" />
        ) : (
          <MdPayment color="#4CAF50" />
        )}
      </div>
      <span className="text-base font-medium text-gray-700">{option.name}</span>
    </div>
  );
};
export default PaymentModeCard;
