const InputField = ({
  label,
  id,
  type,
  errors,
  nestedError,
  register,
  required,
  message,
  className,
  minValue,
  min,
  max,
  value,
  readOnly,
  placeholder,
  customValidation,
  toUpperCase,
}) => {
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
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        readOnly={readOnly}
        min={minValue}
        className={`${
          className ? className : ""
        } px-2 py-2 border outline-hidden bg-transparent text-slate-800 rounded-md ${
          errors[id]?.message || nestedError
            ? "border-red-500"
            : "border-slate-700"
        }`}
        {...register(id, {
          required: { value: required, message },
          onChange: (e) => {
            if (toUpperCase) {
              e.target.value = e.target.value.toUpperCase();
            }
          },
          minLength: min
            ? { value: min, message: `Minimum ${min} character is required` }
            : null,
          maxLength: max
            ? {
                value: max.value,
                message: max.message,
              }
            : null,
          pattern:
            type === "email"
              ? {
                  value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                  message: "Invalid email",
                }
              : type === "url"
              ? {
                  value:
                    /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                  message: "Please enter a valid url",
                }
              : null,
          validate: customValidation
            ? (value) => customValidation(value)
            : null,
        })}
      />

      {(errors[id]?.message || nestedError) && (
        <p className="text-sm font-semibold text-red-600 mt-0">
          {errors[id]?.message || nestedError.message}
        </p>
      )}
    </div>
  );
};

export default InputField;
