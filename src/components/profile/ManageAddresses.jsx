import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../shared/Loader";
import AddAddressModal from "../checkout/AddAddressModal";
import EditAddressModal from "../checkout/EditAddressModal";
import { deleteUserAddress } from "../../store/actions";

// Updated mock data to match your provided structure
const userAddresses = [
  {
    id: 1,
    name: "Shivam Ranjan",
    buildingName: "Rekha Sadan",
    locality: "Jalpari Gali, Yogipur, Kankarbagh",
    city: "Patna",
    state: "Bihar",
    zipcode: "800020",
    mobileNumber: "7491087536",
  },
  {
    id: 2,
    name: "Priya Sharma",
    buildingName: "Apt 404, Sunshine Residency",
    locality: "Near G.D. Goenka School, Bailey Road",
    city: "Patna",
    state: "Bihar",
    zipcode: "801503",
    mobileNumber: "9876543210",
  },
];

const ManageAddresses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState({ state: false });
  const dispatch = useDispatch();
  const deleteHandler = (addressId) => {
    dispatch(deleteUserAddress(addressId));
  };
  const editHandler = (addressDetails) => {
    setIsEditModalOpen({ state: true, addressDetails: addressDetails });
  };
  const { list, loading, error } = useSelector((state) => state.address);
  return loading ? (
    <Loader text={"Loading addresses...."} />
  ) : (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 pb-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
          Manage Addresses
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FiPlus className="mr-2 text-lg" />
          Add New Address
        </button>
      </div>

      {/* List of Addresses */}
      <div className="space-y-6">
        {list.map((addr) => (
          <div
            key={addr.addressId}
            className="border border-gray-200 rounded-lg p-6 flex justify-between hover:shadow-md transition-shadow duration-200"
          >
            {/* Address Details */}
            <div className="space-y-2 flex-grow">
              <p className="font-bold text-lg text-gray-900">{addr.name}</p>
              <p className="text-gray-600">
                {addr.buildingName}, {addr.locality}
              </p>
              <p className="text-gray-600">{`${addr.city}, ${addr.state} - ${addr.zipcode}`}</p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Mobile:</span>{" "}
                {addr.mobileNumber}
              </p>
            </div>

            {/* Action Icons */}
            <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 ml-4">
              <button
                className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                aria-label="Edit address"
                onClick={() => {
                  editHandler(addr);
                }}
              >
                <FiEdit size={20} />
              </button>
              <button
                className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                aria-label="Delete address"
                onClick={() => {
                  deleteHandler(addr.addressId);
                }}
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <AddAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <EditAddressModal
        isOpen={isEditModalOpen.state}
        onClose={() => setIsEditModalOpen({ state: false })}
        addressDetails={isEditModalOpen.addressDetails}
      />
    </div>
  );
};

export default ManageAddresses;
