import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import InputField from "../shared/InputField";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editUserAddress } from "../../store/actions";
import { useEffect, useState, useCallback } from "react";
import { HiOutlineLocationMarker, HiOutlineTrash } from "react-icons/hi";
import MiniMap from "../shared/MiniMap";
import toast from "react-hot-toast";
import axios from "axios";

export default function EditAddressModal({ isOpen, onClose, addressDetails }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLocationLocked, setIsLocationLocked] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [coords, setCoords] = useState({ lat: null, lng: null });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (addressDetails && isOpen) {
      if (addressDetails.latitude && addressDetails.longitude) {
        setCoords({
          lat: addressDetails.latitude,
          lng: addressDetails.longitude,
        });
        setIsLocationLocked(true);
      } else {
        setCoords({ lat: null, lng: null });
        setIsLocationLocked(false);
      }

      reset({
        name: addressDetails.name || "",
        buildingName: addressDetails.buildingName || "",
        streetAddress: addressDetails.locality || "",
        landmark: addressDetails.landmark || "",
        city: addressDetails.city || "",
        state: addressDetails.state || "",
        pinCode: addressDetails.zipcode || "",
        mobile: addressDetails.mobileNumber || "",
      });
    }
  }, [addressDetails, isOpen, reset]);

  const fetchAddressFromCoords = useCallback(
    async (lat, long) => {
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
        }
      } catch (error) {
        toast.error("Failed to fetch details for this point.");
      } finally {
        setIsDetecting(false);
      }
    },
    [apiUrl, setValue],
  );

  useEffect(() => {
    if (coords.lat && coords.lng && isDetecting) {
      fetchAddressFromCoords(coords.lat, coords.lng);
    }
  }, [coords.lat, coords.lng, fetchAddressFromCoords]);

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
        toast.error("Location permission denied or unavailable.");
        setIsDetecting(false);
      },
      { enableHighAccuracy: true, timeout: 5000 },
    );
  };

  const handleFullReset = () => {
    setCoords({ lat: null, lng: null });
    setIsLocationLocked(false);
    reset({
      name: "",
      buildingName: "",
      streetAddress: "",
      landmark: "",
      city: "",
      state: "",
      pinCode: "",
      mobile: "",
    });
    toast.success("Form cleared.");
  };

  const submitHandler = (data) => {
    const finalData = {
      ...data,
      latitude: coords.lat,
      longitude: coords.lng,
    };
    dispatch(editUserAddress(finalData, addressDetails.addressId));
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl transition-all">
            {/* Header & Map Toggle */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <DialogTitle className="text-xl font-black text-slate-800 tracking-tight">
                  Edit Address
                </DialogTitle>
                <button
                  type="button"
                  onClick={handleAutoLocation}
                  disabled={isDetecting}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold transition-all active:scale-95 disabled:opacity-50"
                >
                  <HiOutlineLocationMarker
                    className={isDetecting ? "animate-bounce" : ""}
                  />
                  {isDetecting ? "Detecting..." : "Update Location"}
                </button>
              </div>

              {coords.lat && coords.lng && (
                <div className="w-full animate-in fade-in zoom-in duration-300">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Pin Location
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setCoords({ lat: null, lng: null });
                        setIsLocationLocked(false);
                      }}
                      className="text-[10px] text-red-500 font-bold hover:underline"
                    >
                      Remove Map Pin
                    </button>
                  </div>
                  <MiniMap
                    position={coords}
                    setPosition={(newPos) => {
                      setCoords(newPos);
                      setIsDetecting(true);
                    }}
                  />
                </div>
              )}
            </div>

            <form className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
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
                                 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl 
                                 shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
                    >
                      Update Address
                    </button>
                  </div>

                  <div className="flex-1 sm:flex-none sm:order-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full px-6 py-2.5 text-xs font-bold text-slate-500 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Reset Button: Right-bottom on mobile, Left on desktop */}
                  <div className="flex-1 sm:flex-none sm:order-1">
                    <button
                      type="button"
                      onClick={handleFullReset}
                      className="w-full px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <HiOutlineTrash />
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
