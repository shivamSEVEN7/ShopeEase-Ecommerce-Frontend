const GenderSelector = ({ register, name, error, required, message }) => {
  const options = ["Male", "Female"];

  return (
    <div className="w-full max-w-xs">
      <div className="mb-2 block font-semibold text-sm text-slate-800">
        Gender
      </div>
      <div className="flex items-center gap-x-6">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <input
              id={option.toLowerCase()}
              type="radio"
              value={option.toLowerCase()}
              {...register(name, {
                required: { value: required, message },
              })}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <label
              htmlFor={option.toLowerCase()}
              className="ml-2 block text-sm text-gray-900 cursor-pointer"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-sm font-semibold text-red-600 mt-0">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default GenderSelector;
