import {
  FaBuilding,
  FaCheckCircle,
  FaEdit,
  FaStreetView,
  FaTrash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAddress } from "../../store/actions";
import { selectAddress } from "../../store/slice/addressSlice";

const AddressCard = ({ addressDetails, setIsEditModalOpen }) => {
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteUserAddress(addressDetails.addressId));
  };
  const editHandler = () => {
    setIsEditModalOpen({ state: true, addressDetails: addressDetails });
  };
  const selectAddressHandler = () => {
    dispatch(selectAddress(addressDetails));
  };
  const { selectedAddress } = useSelector((state) => state.address);
  const isSelected = selectedAddress === addressDetails ? true : false;
  return (
    <div className="max-w-md mx-auto px-4 space-y-6">
      <div
        className={`p-4 rounded-lg border-2 relative ${
          isSelected
            ? "border-green-500 bg-green-50 cursor-pointer shadow-lg transform scale-[1.02]"
            : "border-gray-200 bg-white cursor-pointer transition-all duration-300 hover:border-blue-400 hover:shadow-md"
        } `}
      >
        <div
          onClick={selectAddressHandler}
          className="flex items-start space-x-4"
        >
          {/* Radio button style indicator */}
          <div
            className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 ${
              isSelected
                ? "flex items-center justify-center border-green-500 bg-green-500"
                : "border-gray-400"
            } `}
          >
            {isSelected ? (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            ) : (
              ""
            )}
          </div>

          {/* Address Details */}
          <div className="flex-grow">
            <p className="font-bold text-gray-900">
              {addressDetails.name}{" "}
              {/* <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full ml-2">
                {address.type}
              </span> */}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              {addressDetails.buildingName}
            </p>
            <p className="text-sm text-gray-700">{addressDetails.locality}</p>
            <p className="text-sm text-gray-700">{`${addressDetails.city}, ${addressDetails.state} - ${addressDetails.zipcode}`}</p>
            <p className="text-sm text-gray-600 mt-2 font-medium">
              Phone: {addressDetails.mobileNumber}
            </p>
          </div>
        </div>
        <div className="flex gap-3 absolute top-4 right-2">
          <button onClick={editHandler}>
            <FaEdit size={18} className="text-teal-700" />
          </button>
          <button onClick={deleteHandler}>
            <FaTrash size={17} className="text-rose-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
