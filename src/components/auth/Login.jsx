import { Link, useNavigate } from "react-router";
import InputField from "../shared/InputField";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import PasswordInputField from "../shared/PasswordInputField";
import { login } from "../../store/actions";
import { PuffLoader } from "react-spinners";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authentication);
  const loader = loading;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  const loginHandler = async (data) => {
    console.log(data);
    dispatch(login(data, reset));
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 selection:bg-blue-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 md:p-10 p-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Sign In
          </h2>
          <p className="text-sm text-slate-400 mt-2 font-medium uppercase tracking-widest text-[10px]">
            Welcome back to ShopEase
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(loginHandler)}>
          <div className="space-y-1">
            <InputField
              label="Email, Username, or Mobile"
              required
              id="identifier"
              type="text"
              message="*Email, Username, or Mobile is required"
              placeholder="Email, Username, or Mobile"
              register={register}
              errors={errors}
            />
          </div>

          <div className="space-y-1">
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

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-all"
                {...register("rememberMe")}
              />
              <span className="ml-2 text-sm text-slate-500 group-hover:text-slate-700 transition-colors">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <button
            disabled={loader}
            className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-100 active:scale-[0.98]"
          >
            <span className={loader ? "mr-2" : ""}>Sign In</span>
            {loader && <PuffLoader color="#ffffff" size={20} />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-50 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="text-blue-600 hover:text-blue-700 font-bold ml-1 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
