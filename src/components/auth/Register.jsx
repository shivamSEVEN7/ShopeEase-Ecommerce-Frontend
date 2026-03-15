import { Link, useNavigate } from "react-router";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import PasswordInputField from "../shared/PasswordInputField";
import RegistrationSuccess from "./RegistrationSuccess";
import { registerUser } from "../../store/actions";
import GenderSelector from "../shared/GenderSelector";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
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
    dispatch(registerUser(data, setRegistrationSuccess));
    console.log(data);
  };
  const p1 = watch("password");
  const confirmPasswordMatch = (value) =>
    value === p1 || "Pasword does not match";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {registrationSuccess ? (
        <RegistrationSuccess />
      ) : (
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-blue-600 drop-shadow-md">
              Create Account
            </h1>
          </div>

          <form onSubmit={handleSubmit(registerHandler)}>
            <div className="space-y-6">
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
                placeholder="Enter your Username"
                register={register}
                errors={errors}
              />
              <GenderSelector
                name="gender"
                register={register}
                required
                message="*Please Select a Gender"
                error={errors.gender}
              />
              <InputField
                label="Mobile No."
                required
                id="mobile"
                type="number"
                message="*Mobile number is required"
                placeholder="Enter your Mobile number"
                min="10"
                register={register}
                errors={errors}
                max={{ value: "10", message: "Please Enter a valid Number" }}
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
              <div>
                <PasswordInputField
                  label="Password"
                  required
                  id="password"
                  message="*Password is required"
                  placeholder="Enter your password"
                  register={register}
                  errors={errors}
                />
              </div>
              <div>
                <PasswordInputField
                  label="Confirm Password"
                  required
                  id="confirmPassword"
                  message="*Confirm Password is required"
                  placeholder="Confirm Password"
                  register={register}
                  errors={errors}
                  customValidation={confirmPasswordMatch}
                />
              </div>
              <div className="flex items-center">
                <input
                  id="tc"
                  name="tc"
                  {...register("tc", { required: "Accept" })}
                  type="checkbox"
                  className={`h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded `}
                />
                <label
                  htmlFor="tc"
                  className={`${
                    errors.tc?.message
                      ? "font-semibold text-red-600"
                      : "text-slate-600"
                  } ml-3 block text-sm`}
                >
                  I accept the{" "}
                  <a
                    href="javascript:void(0);"
                    className="text-blue-600 font-medium hover:underline ml-1"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
              >
                Create an account
              </button>
            </div>
            <p className="text-slate-600 text-sm mt-6 text-center">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-blue-600 font-medium hover:underline ml-1"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};
export default Register;
