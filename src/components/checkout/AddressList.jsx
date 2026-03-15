import { useState } from "react";
import AddressCard from "./AddressCard";
import { IoAdd } from "react-icons/io5";
import AddAddressModal from "./AddAddressModal";
import EditAddressModal from "./EditAddressModal";
import { useSelector } from "react-redux";
const AddressList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState({ state: false });
  const { list } = useSelector((state) => state.address);
  return (
    <div className="max-w-2xl mx-auto p-0 sm:p-6  rounded-lg">
      <h1 className="text-2xl font-bold text-slate-800 text-center mb-6">
        Select Address
      </h1>

      <div className="space-y-2">
        {list.map((li) => (
          <AddressCard
            key={li.addressId}
            addressDetails={li}
            setIsEditModalOpen={setIsEditModalOpen}
          />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          className="flex items-center space-x-2 py-2 px-4 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <IoAdd size={20} />
          <span>Add New Address</span>
        </button>
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
export default AddressList;
