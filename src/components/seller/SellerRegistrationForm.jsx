import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../shared/InputField";
import { registerSeller } from "../../store/actions";
import { MoonLoader } from "react-spinners";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";

const SellerRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = (data) => {
    console.log("Seller Registration Data:", data);
    registerSeller(data, setIsLoading, setError, setIsSuccess);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl p-6 sm:p-8 space-y-6 bg-white rounded-lg shadow-lg">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center text-center py-12">
            <FaCheckCircle className="h-16 w-16 text-green-500" />
            <h2 className="mt-6 text-2xl font-bold text-gray-800">
              Details Submitted Successfully!
            </h2>
            <p className="mt-3 max-w-md text-base text-gray-600">
              Your details will be verified by our team soon. Once verified, you
              will be able to list your products.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Go to Home
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Become a Seller
            </h2>
            <p className="text-center text-gray-600">
              Please fill out the form to register your business.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <fieldset className="space-y-4 rounded-lg border p-4">
                <legend className="px-2 text-lg font-semibold text-gray-700">
                  Business Details
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Business Name"
                    id="businessName"
                    type="text"
                    placeholder="e.g., Acme Innovations Inc."
                    register={register}
                    errors={errors}
                    required={true}
                    message="Business name is required."
                  />
                  <InputField
                    label="Business Email"
                    id="businessEmail"
                    type="email"
                    placeholder="e.g., contact@acme.com"
                    register={register}
                    errors={errors}
                    required={true}
                    message="A valid business email is required."
                  />
                </div>
                <InputField
                  label="Business Phone"
                  id="businessPhone"
                  type="tel"
                  placeholder="e.g., +91 9876543210"
                  register={register}
                  errors={errors}
                  required={true}
                  message="A 10-digit phone number is required."
                  min={10}
                />
              </fieldset>

              <fieldset className="space-y-4 rounded-lg border p-4">
                <legend className="px-2 text-lg font-semibold text-gray-700">
                  Tax & Legal Information
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="GST Number"
                    id="gstNumber"
                    type="text"
                    placeholder="e.g., 22AAAAA0000A1Z5"
                    register={register}
                    errors={errors}
                    required={true}
                    message="GST number is required."
                    min={15}
                    max={{ value: 15, message: "GST must be 15 characters" }}
                    toUpperCase={true}
                  />
                  <InputField
                    label="PAN Number"
                    id="panNumber"
                    type="text"
                    placeholder="e.g., ABCDE1234F"
                    register={register}
                    errors={errors}
                    required={true}
                    message="PAN number is required."
                    min={10}
                    max={{ value: 10, message: "PAN must be 10 characters" }}
                    toUpperCase={true}
                  />
                </div>
              </fieldset>

              <fieldset className="space-y-4 rounded-lg border p-4">
                <legend className="px-2 text-lg font-semibold text-gray-700">
                  Bank Account Details
                </legend>
                <InputField
                  label="Bank Account Number"
                  id="bankAccountNumber"
                  type="text"
                  placeholder="e.g., 000123456789"
                  register={register}
                  errors={errors}
                  required={true}
                  message="Bank account number is required."
                />
                <InputField
                  label="IFSC Code"
                  id="ifscCode"
                  type="text"
                  placeholder="e.g., SBIN0001234"
                  register={register}
                  errors={errors}
                  required={true}
                  message="IFSC code is required."
                  min={11}
                  max={{ value: 11, message: "IFSC must be 11 characters" }}
                  toUpperCase={true}
                />
              </fieldset>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <MoonLoader size={20} color={"#ffffff"} />
                  ) : (
                    "Register Business"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SellerRegistrationForm;
