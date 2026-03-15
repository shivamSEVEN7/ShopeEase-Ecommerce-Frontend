import React from "react";
import { FiMail } from "react-icons/fi";

const RegistrationSuccess = ({ email }) => {
  return (
    <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg max-w-lg mx-auto text-center">
      <FiMail className="mx-auto h-16 w-16 text-green-500" />

      <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-800">
        Account Created Successfully!
      </h1>

      <p className="mt-3 text-base text-gray-600">
        A verification link has been sent to your email address:
        <br />
        <span className="font-semibold text-gray-900">{email}</span>
      </p>

      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-md text-left">
        <p className="font-bold">One last step...</p>
        <p className="text-sm">
          Please click the link in the email within{" "}
          <span className="font-bold">24 hours</span> to activate your account
          before you can log in.
        </p>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Please check your inbox and spam folder.
      </p>
    </div>
  );
};

export default RegistrationSuccess;
