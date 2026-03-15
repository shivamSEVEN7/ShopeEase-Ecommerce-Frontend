import { useRef, useState } from "react";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInputField = ({
  label,
  id,
  errors,
  register,
  required,
  message,
  className,
  min,
  value,
  placeholder,
  customValidation,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={id}
        className={`${
          className ? className : ""
        } font-semibold text-sm text-slate-800`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          className={`${
            className ? className : ""
          } px-2 py-2 border block w-full outline-hidden bg-transparent text-slate-800 rounded-md ${
            errors[id]?.message ? "border-red-500" : "border-slate-700"
          }`}
          {...register(id, {
            required: { value: required, message },
            minLength: min
              ? { value: min, message: `Minimum ${min} character is required` }
              : null,
            validate: customValidation
              ? (value) => customValidation(value)
              : null,
          })}
        />

        <span
          onClick={toggleShowPassword}
          className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-hidden focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
        >
          {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
        </span>
      </div>

      {errors[id]?.message && (
        <p className="text-sm font-semibold text-red-600 mt-0">
          {errors[id]?.message}
        </p>
      )}
    </div>
  );
};

export default PasswordInputField;
