import { Link, useNavigate } from "react-router";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import PasswordInputField from "../shared/PasswordInputField";
import RegistrationSuccess from "./RegistrationSuccess";
import { registerUser } from "../../store/actions";
import GenderSelector from "../shared/GenderSelector";
import { FaSpinner } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  const registerHandler = async (data) => {
    try {
      setLoading(true);
      await dispatch(registerUser(data, setRegistrationSuccess));
    } finally {
      setLoading(false);
    }
  };
  const p1 = watch("password");
  const confirmPasswordMatch = (value) =>
    value === p1 || "Pasword does not match";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {registrationSuccess ? (
        <RegistrationSuccess />
      ) : (
        <div className="max-w-2xl w-full mx-auto bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Create Account
            </h1>
            <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-[0.2em]">
              Join the ShopEase Community
            </p>
          </div>

          <form onSubmit={handleSubmit(registerHandler)}>
            {/* The magic happens here: grid-cols-1 for mobile, grid-cols-2 for desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InputField
                label="Name"
                required
                id="name"
                type="text"
                message="*Name is required"
                placeholder="Enter your name"
                register={register}
                errors={errors}
              />

              <InputField
                label="Username"
                required
                id="username"
                type="text"
                message="*Username is required"
                placeholder="Choose a username"
                register={register}
                errors={errors}
              />

              <div className="md:col-span-2">
                <GenderSelector
                  name="gender"
                  register={register}
                  required
                  message="*Please Select a Gender"
                  error={errors.gender}
                />
              </div>

              <InputField
                label="Mobile No."
                required
                id="mobile"
                type="number"
                message="*Mobile number is required"
                placeholder="10-digit number"
                register={register}
                errors={errors}
              />

              <InputField
                label="Email"
                required
                id="email"
                type="email"
                message="*Email is required"
                placeholder="Enter your email"
                register={register}
                errors={errors}
              />

              <PasswordInputField
                label="Password"
                required
                id="password"
                message="*Password is required"
                placeholder="••••••••"
                register={register}
                errors={errors}
              />

              <PasswordInputField
                label="Confirm Password"
                required
                id="confirmPassword"
                message="*Confirm Password is required"
                placeholder="••••••••"
                register={register}
                errors={errors}
                customValidation={confirmPasswordMatch}
              />

              <div className="md:col-span-2 flex items-start pt-2">
                <input
                  id="tc"
                  name="tc"
                  {...register("tc", { required: "Accept" })}
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer mt-0.5"
                />
                <label
                  htmlFor="tc"
                  className={`${
                    errors.tc?.message
                      ? "font-bold text-red-500"
                      : "text-slate-500"
                  } ml-3 block text-sm cursor-pointer leading-tight`}
                >
                  I accept the{" "}
                  <a
                    href="#"
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 px-4 text-sm tracking-widest font-bold rounded-xl text-white uppercase
          flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-100
          ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                {loading ? (
                  <>
                    <span>Creating Account</span>
                    <FaSpinner className="animate-spin h-5 w-5" />
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <p className="text-slate-500 text-sm mt-8 text-center font-medium">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="text-blue-600 font-bold hover:underline ml-1"
                >
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default Register;
