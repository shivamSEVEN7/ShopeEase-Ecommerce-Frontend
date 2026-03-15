import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputField from "../shared/InputField";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addNewAddresses, editUserAddress } from "../../store/actions";
import { useEffect } from "react";

export default function EditAddressModal({ isOpen, onClose, addressDetails }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  useEffect(() => {
    if (addressDetails) {
      reset({
        name: addressDetails?.name,
        buildingName: addressDetails?.buildingName,
        streetAddress: addressDetails?.locality,
        landmark: addressDetails?.landmark,
        city: addressDetails?.city,
        state: addressDetails?.state,
        pinCode: addressDetails?.zipcode,
        mobile: addressDetails?.mobileNumber,
      });
    }
  }, [addressDetails, reset]);
  const dispatch = useDispatch();
  const submitHandler = (data) => {
    console.log(data);
    dispatch(editUserAddress(data, addressDetails.addressId));
    onClose();
    reset();
  };
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50 ">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-xl rounded-lg bg-white p-6 shadow-lg ">
            <DialogTitle className="text-lg font-bold text-gray-800 mb-4">
              Edit Address
            </DialogTitle>

            {/* MUI TextFields */}

            <form className="space-y-2" onSubmit={handleSubmit(submitHandler)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Name"
                  required
                  id="name"
                  type="text"
                  message="*Name is required"
                  placeholder="Enter Name"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Building Name"
                  required
                  id="buildingName"
                  type="text"
                  value={addressDetails?.buildingName}
                  message="*Building Name is required"
                  placeholder="Enter Building Name"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="w-full">
                <InputField
                  label="Street Address"
                  required
                  id="streetAddress"
                  type="text"
                  message="*Street Address is required"
                  placeholder="Enter Street Address"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="w-full">
                <InputField
                  label="Landmark"
                  id="landmark"
                  type="text"
                  placeholder="Enter Landmark"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="City"
                  required
                  id="city"
                  type="text"
                  value={addressDetails?.city}
                  message="*City is required"
                  placeholder="Enter City"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="State"
                  required
                  id="state"
                  type="text"
                  value={addressDetails?.state}
                  message="*State is required"
                  placeholder="Enter State"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Pin Code"
                  required
                  id="pinCode"
                  type="number"
                  value={addressDetails?.zipcode}
                  message="*Pin Code is required"
                  placeholder="Enter Pin Code"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Mobile No."
                  required
                  id="mobile"
                  type="number"
                  value={addressDetails?.mobileNumber}
                  message="*Mobile No. is required"
                  placeholder="Enter Mobile No."
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Button variant="contained" type="submit">
                  Update Address
                </Button>
                <Button onClick={onClose} color="inherit">
                  Cancel
                </Button>
              </div>
            </form>

            {/* Buttons */}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
