import React, { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { FiMail, FiCheckCircle } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";

const VerifyEmailBanner = ({ email }) => {
  const [status, setStatus] = useState("idle");

  const handleResendEmail = () => {
    if (status === "sending") return;

    setStatus("sending");
    console.log("Requesting new verification email...");

    setTimeout(() => {
      console.log("Verification email sent!");
      setStatus("sent");

      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }, 2000);
  };

  return (
    <div
      className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 w-full max-w-2xl mx-auto rounded-md shadow-md"
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <IoWarningOutline className="h-6 w-6 text-orange-500 mr-4" />
        </div>
        <div>
          <p className="font-bold text-lg">Please verify your account</p>
          <p className="text-sm mt-1">
            We've sent a verification link to your email address:
            <span className="font-semibold mx-1">{email}</span>
            Please check your inbox (and spam folder) to complete the
            registration.
          </p>
          <div className="mt-4">
            <button
              onClick={handleResendEmail}
              disabled={status !== "idle"}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors"
            >
              {status === "sending" && (
                <ImSpinner2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
              )}
              {status === "sent" && (
                <FiCheckCircle className="-ml-1 mr-2 h-5 w-5" />
              )}
              {status === "idle" && <FiMail className="-ml-1 mr-2 h-5 w-5" />}

              {status === "idle" && "Resend verification email"}
              {status === "sending" && "Sending..."}
              {status === "sent" && "Sent!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailBanner;
