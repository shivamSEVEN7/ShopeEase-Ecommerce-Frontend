import React, { useState, useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import InputField from "../shared/InputField";
import { FaUpload, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import { MoonLoader } from "react-spinners";
import { FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import formatName from "../../utils/formatName";
import { addNewProduct } from "../../store/actions";

const AddNewProductForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      productName: "",
      description: "",
      quantity: "",
      price: "",
      specialPrice: "",
      discount: "",
      highlights: [{ text: "" }],
      mainImage: null,
      additionalImages: null,
    },
    mode: "onSubmit",
  });

  const dispatch = useDispatch();

  const {
    items: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "highlights",
  });

  const price = watch("price") || 0;
  const discount = watch("discount") || 0;
  const specialPrice = price - (price * discount) / 100 || 0;
  const mainImageRef = useRef(null);
  const additionalImagesRef = useRef(null);

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setAdditionalImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    const newImage = {
      url: URL.createObjectURL(file),
      name: file.name,
    };
    console.log(newImage);
    setMainImagePreview(newImage);
  };
  const handleMainImageDelete = () => {
    if (mainImagePreview != null) URL.revokeObjectURL(mainImagePreview.url);
    setMainImagePreview(null);
  };
  const handleDelete = (id) => {
    const deletedPreview = additionalImagePreviews.find((p) => p.id === id);
    if (deletedPreview) URL.revokeObjectURL(deletedPreview.url);
    setAdditionalImagePreviews((prev) => prev.filter((p) => p.id !== id));
  };

  const onSubmit = async (data) => {
    const product = {
      productName: data.productName,
      description: data.description,
      quantity: data.quantity,
      price: data.price,
      discount: data.discount,
      highlights: data.highlights,
    };
    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    if (data.mainImage instanceof FileList && data.mainImage.length > 0) {
      formData.append("mainImage", data.mainImage[0]);
    }
    if (
      data.additionalImages instanceof FileList &&
      data.additionalImages.length > 0
    ) {
      Array.from(data.additionalImages).forEach((file) => {
        formData.append(`additionalImages`, file);
      });
    }
    addNewProduct(
      formData,
      data.categoryId,
      setIsLoading,
      setError,
      setIsSuccess
    );
  };

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Add New Product</h1>
      <div className="rounded-lg bg-white p-6 shadow-sm">
        {isSuccess ? (
          <div className="rounded-md border border-green-200 bg-green-50 p-6 text-center text-green-700">
            <h3 className="text-lg font-semibold">
              Product Added Successfully!
            </h3>
            <p>It will be live on the site shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* --- Basic Information --- */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold text-gray-700">
                Basic Information
              </legend>
              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="categoryId"
                  className="font-semibold text-sm text-slate-800"
                >
                  Category*
                </label>

                <div className="relative w-full">
                  <select
                    id="categoryId"
                    className={`w-full px-2 py-2 border outline-none bg-white text-slate-800 rounded-md 
                   appearance-none pr-8 ${""}
                   ${
                     errors.categoryId?.message
                       ? "border-red-500"
                       : "border-slate-700"
                   } 
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    {...register("categoryId", {
                      required: {
                        value: true,
                        message: "Please select a category.",
                      },
                      validate: (value) =>
                        value !== "" || "Please select a category.",
                    })}
                  >
                    <option value="">Select a category...</option>
                    {categories.map((category) => (
                      <option
                        value={category.categoryId}
                        key={category.categoryId}
                      >
                        {formatName(category.categoryName)}
                      </option>
                    ))}
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FiChevronDown className="h-5 w-5" />
                  </div>
                </div>

                {errors.categoryId?.message && (
                  <p className="text-sm font-semibold text-red-600 mt-0">
                    {errors.categoryId?.message}
                  </p>
                )}
              </div>
              <InputField
                label="Product Name*"
                id="productName"
                type="text"
                placeholder="e.g., Wireless Headphones"
                register={register}
                errors={errors}
                required={true}
                message="Product name is required."
              />
              <div>
                <label
                  htmlFor="description"
                  className="block font-semibold text-sm text-slate-800 mb-1"
                >
                  Description*
                </label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Detailed product description..."
                  className={`block w-full resize-none rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${
                    errors.description ? "border-red-500" : "border-slate-700"
                  }`}
                  {...register("description", {
                    required: "Description is required.",
                  })}
                />
                {errors.description && (
                  <p className="text-sm font-semibold text-red-600 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </fieldset>

            {/* --- Pricing & Stock --- */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold text-gray-700">
                Pricing & Stock
              </legend>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <InputField
                  label="Price (MRP)*"
                  id="price"
                  type="number"
                  className={
                    "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  }
                  step="0.01"
                  placeholder="e.g., 2499.00"
                  register={register}
                  errors={errors}
                  required={true}
                  message="Required."
                  min={1}
                  minValue={1}
                  customValidation={(v) => parseFloat(v) > 0 || "> 0"}
                />
                <InputField
                  label="Discount (%)"
                  id="discount"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 20"
                  register={register}
                  errors={errors}
                  min={0}
                  minValue={1}
                  max={{ value: 100, message: "Max 100%" }}
                  customValidation={(v) =>
                    v === "" ||
                    (parseFloat(v) >= 0 && parseFloat(v) <= 100) ||
                    "0-100"
                  }
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Price (₹)
                  </label>

                  <div
                    className="px-3 py-[10px] bg-gray-100/70 border border-gray-200 text-gray-700 rounded-md 
               flex items-center cursor-default select-none"
                  >
                    ₹{specialPrice.toFixed(2)}
                  </div>
                </div>

                <InputField
                  label="Quantity*"
                  id="quantity"
                  type="number"
                  placeholder="e.g., 100"
                  register={register}
                  errors={errors}
                  required={true}
                  message="Required."
                  min={0}
                  minValue={1}
                  customValidation={(v) => parseInt(v) >= 0 || ">= 0"}
                />
              </div>
            </fieldset>

            {/* --- Highlights --- */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold text-gray-700">
                Product Highlights
              </legend>
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                  <InputField
                    label={`Highlight ${index + 1}${index === 0 ? "*" : ""}`}
                    id={`highlights.${index}.text`}
                    type="text"
                    placeholder="e.g., Noise Cancellation"
                    register={register}
                    errors={errors}
                    nestedError={errors.highlights?.[index]?.text}
                    required={true}
                    message="Highlight is Required"
                    className="!mb-0"
                  />
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="mt-6 rounded-md bg-red-100 p-2 text-red-600 hover:bg-red-200"
                      title="Remove"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ text: "" })}
                className="inline-flex items-center gap-1 rounded-md border border-dashed border-gray-400 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
              >
                <FaPlus size={12} /> Add Highlight
              </button>
            </fieldset>

            {/* --- Images --- */}
            <fieldset className="space-y-6">
              <legend className="text-lg font-semibold text-gray-700">
                Images
              </legend>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Main Image */}
                <div>
                  <label className="block font-semibold text-sm text-slate-800 mb-2">
                    Main Image*
                  </label>
                  <input
                    id="mainImage"
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                    className="hidden"
                    {...register("mainImage", {
                      required: "Main image is required.",

                      validate: {
                        acceptedFormats: (files) =>
                          !files ||
                          files.length === 0 ||
                          ["image/jpeg", "image/png", "image/webp"].includes(
                            files[0]?.type
                          ) ||
                          "Only PNG, JPG, WEBP",
                      },
                      onChange: handleMainImageChange,
                    })}
                    ref={(el) => {
                      register("mainImage").ref(el);
                      mainImageRef.current = el;
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => mainImageRef.current?.click()}
                    className={`flex items-center justify-center gap-2 rounded-md border p-4 text-sm font-medium transition-all w-full ${
                      errors.mainImage
                        ? "border-red-500 text-red-600 bg-red-50 hover:bg-red-100"
                        : "border-gray-400 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FaUpload /> Upload Main Image
                  </button>
                  {errors.mainImage && (
                    <p className="text-sm font-semibold text-red-600 mt-1">
                      {errors.mainImage.message}
                    </p>
                  )}

                  {mainImagePreview && (
                    <div className="mt-4 relative w-32 h-32">
                      <img
                        src={mainImagePreview.url}
                        alt={mainImagePreview.name}
                        className="h-full w-full rounded-md object-cover border"
                      />
                      <button
                        type="button"
                        onClick={handleMainImageDelete}
                        className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white shadow-md hover:bg-red-600"
                        title="Remove"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Additional Images */}
                <div>
                  <label className="block font-semibold text-sm text-slate-800 mb-2">
                    Additional Images (Optional, max 4)
                  </label>
                  <input
                    id="additionalImages"
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                    multiple
                    className="hidden"
                    {...register("additionalImages", {
                      validate: {
                        maxFiles: (files) =>
                          !files || files.length <= 4 || "Max 4 images",
                        acceptedFormats: (files) =>
                          !files ||
                          files.length === 0 ||
                          Array.from(files).every((file) =>
                            ["image/jpeg", "image/png", "image/webp"].includes(
                              file?.type
                            )
                          ) ||
                          "Only PNG, JPG, WEBP",
                      },
                      onChange: handleAdditionalImagesChange,
                    })}
                    ref={(el) => {
                      register("additionalImages").ref(el);
                      additionalImagesRef.current = el;
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      additionalImagesRef.current?.click();
                    }}
                    className={`flex items-center justify-center gap-2 rounded-md border p-4 text-sm font-medium transition-all w-full ${
                      errors.additionalImages
                        ? "border-red-500 text-red-600 bg-red-50 hover:bg-red-100"
                        : "border-gray-400 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FaUpload /> Upload Additional Images
                  </button>
                  {errors.additionalImages && (
                    <p className="text-sm font-semibold text-red-600 mt-1">
                      {errors.additionalImages.message}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3 mt-3 justify-center">
                    {additionalImagePreviews.map((preview, index) => (
                      <div className="mt-4 relative w-32 h-32" key={index}>
                        <img
                          src={preview.url}
                          alt={preview.name}
                          className="h-full w-full rounded-md object-cover border"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            handleDelete(preview.id);
                          }}
                          className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white shadow-md hover:bg-red-600"
                          title="Remove"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </fieldset>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <MoonLoader size={20} color={"#ffffff"} />
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default AddNewProductForm;
