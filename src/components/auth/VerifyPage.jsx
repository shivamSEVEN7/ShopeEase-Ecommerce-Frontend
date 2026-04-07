import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verifyAccount } from "../../store/actions";
import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import { PuffLoader } from "react-spinners";
const VerifyPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("loading"); // "loading", "success", "error"

  useEffect(() => {
    if (token) {
      verifyAccount(token, setStatus);
    } else {
      setStatus("error");
    }
  }, [token]);

  const renderMessage = () => {
    switch (status) {
      case "loading":
        return (
          <div className="flex flex-col items-center gap-4 animate-pulse">
            <PuffLoader color="#2563eb" size={60} />
            <h2 className="text-xl font-bold text-slate-800">
              Verifying your account...
            </h2>
            <p className="text-sm text-slate-500">
              This will only take a moment.
            </p>
          </div>
        );
      case "success":
        return (
          <div className="flex flex-col items-center gap-4 animate-fadeIn">
            <HiCheckCircle className="text-emerald-500 text-7xl drop-shadow-sm" />
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Verified!
            </h2>
            <p className="text-slate-600 max-w-[250px] mx-auto">
              Your account is now active. You can start shopping on ShopEase.
            </p>
            <Link
              to="/login"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-100"
            >
              Go to Login
            </Link>
          </div>
        );
      case "error":
        return (
          <div className="flex flex-col items-center gap-4 animate-fadeIn">
            <HiExclamationCircle className="text-rose-500 text-7xl drop-shadow-sm" />
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Verification Failed
            </h2>
            <p className="text-slate-600 max-w-[280px] mx-auto">
              The token is either expired or invalid. Please try registering
              again.
            </p>
            <Link
              to="/register"
              className="mt-4 text-blue-600 font-bold hover:underline"
            >
              Back to Registration
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 text-center">
        {renderMessage()}
      </div>
    </div>
  );
};

export default VerifyPage;
