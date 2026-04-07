import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputField from "../shared/InputField";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addNewAddresses } from "../../store/actions";
import { HiOutlineLocationMarker, HiOutlineTrash } from "react-icons/hi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MiniMap from "../shared/MiniMap";
import axios from "axios";

export default function AddAddressModal({ isOpen, onClose }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLocationLocked, setIsLocationLocked] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onTouched",
  });
  const dispatch = useDispatch();
  const submitHandler = (data) => {
    const finalData = {
      ...data,
      latitude: coords.lat,
      longitude: coords.lng,
    };

    dispatch(addNewAddresses(finalData));
    onClose();
    reset();
    setCoords({ lat: null, lng: null });
    setIsLocationLocked(false);
  };
  const [isDetecting, setIsDetecting] = useState(false);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const fetchAddressFromCoords = async (lat, long) => {
    if (!lat || !long) return;
    setIsDetecting(true);
    try {
      const { data } = await axios.get(`${apiUrl}/api/location/reverse`, {
        params: { lat: lat, lng: long },
      });

      if (data) {
        const options = { shouldValidate: true, shouldDirty: true };
        setValue("streetAddress", data.streetAddress, options);
        setValue("city", data.city, options);
        setValue("state", data.state, options);
        setValue("pinCode", data.pinCode, options);
        setIsLocationLocked(true);
        toast.success("Address updated from map!");
        setIsLocationLocked(true);
      }
    } catch (error) {
      toast.error("Failed to fetch details for this point.");
    } finally {
      setIsDetecting(false);
    }
  };
  const handleAutoLocation = () => {
    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
        toast.error("Location permission denied or unavailable.");
        setIsDetecting(false);
      },
      { enableHighAccuracy: true, timeout: 5000 },
    );
  };
  useEffect(() => {
    if (coords.lat && coords.lng) {
      fetchAddressFromCoords(coords.lat, coords.lng);
    }
  }, [coords.lat, coords.lng]);

  const handleFullReset = () => {
    setCoords({ lat: null, lng: null });

    setIsLocationLocked(false);

    reset();

    toast.success("All fields cleared.");
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50 ">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-xl rounded-lg bg-white p-6 shadow-lg ">
            <div className="flex flex-col gap-6 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                <DialogTitle className="text-lg sm:text-xl font-black text-slate-800 tracking-tight flex-1 min-w-[150px]">
                  Add New Address
                </DialogTitle>

                <button
                  type="button"
                  onClick={handleAutoLocation}
                  disabled={isDetecting}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 
               text-blue-600 rounded-lg text-[10px] sm:text-xs font-bold transition-all 
               active:scale-95 disabled:opacity-50 shrink-0"
                >
                  <HiOutlineLocationMarker
                    className={
                      isDetecting ? "animate-bounce" : "text-sm sm:text-base"
                    }
                  />
                  {isDetecting ? "Detecting..." : "Detect My Location"}
                </button>
              </div>

              <div className="w-full">
                <MiniMap position={coords} setPosition={setCoords} />
              </div>
            </div>
            <form className="space-y-2" onSubmit={handleSubmit(submitHandler)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  name="name"
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
                  name="city"
                  label="City"
                  readOnly={isLocationLocked}
                  required
                  id="city"
                  type="text"
                  message="*City is required"
                  placeholder="Enter City"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="State"
                  required
                  id="state"
                  readOnly={isLocationLocked}
                  type="text"
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
                  readOnly={isLocationLocked}
                  type="number"
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
                  min={10}
                  max={{
                    value: 10,
                    message: "Please Enter a Valid Mobile Number",
                  }}
                  message="*Mobile No. is required"
                  placeholder="Enter Mobile No."
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="w-full sm:w-auto sm:order-3">
                    <button
                      type="submit"
                      className="w-full px-10 py-3 sm:py-2.5 text-sm font-black text-white 
                   bg-gradient-to-r from-blue-600 to-indigo-600 
                   hover:from-blue-700 hover:to-indigo-700 
                   rounded-xl shadow-lg shadow-blue-100 transition-all 
                   active:scale-[0.98] text-center"
                    >
                      Save Address
                    </button>
                  </div>

                  <div className="flex-1 sm:flex-none sm:order-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full px-6 py-2.5 text-xs font-bold text-slate-500 
                   bg-slate-50 hover:bg-slate-100 rounded-xl transition-all 
                   text-center border border-transparent"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="flex-1 sm:flex-none sm:order-1">
                    <button
                      type="button"
                      onClick={handleFullReset}
                      className="w-full px-4 py-2.5 text-xs font-bold text-red-500 
                   hover:bg-red-50 rounded-xl transition-all 
                   flex items-center justify-center gap-2"
                    >
                      <HiOutlineTrash className="text-sm" />
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Buttons */}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
