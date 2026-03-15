import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { useForm, Controller } from "react-hook-form";
import Rating from "@mui/material/Rating";
import { useEffect } from "react";
import { addNewReview } from "../../store/actions";
import { useDispatch } from "react-redux";

export default function AddReviewModal({
  isOpen,
  onClose,
  orderItem,
  reviewDetails,
}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      rating: 0,
      title: "",
      comment: "",
    },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (reviewDetails) {
      reset({
        rating: reviewDetails?.rating,
        title: reviewDetails?.title,
        comment: reviewDetails?.comment,
      });
    }
  }, [reviewDetails, reset, isOpen]);
  const onSubmit = (data) => {
    dispatch(addNewReview(orderItem.id, data));
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
      transition
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <DialogTitle className="text-xl font-bold leading-6 text-gray-900">
            {reviewDetails ? "Edit your Review" : "Write a Review"}
          </DialogTitle>
          <Description className="mt-1 text-sm text-gray-500">
            {reviewDetails ? "" : "Share your experience with this product."}
          </Description>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
            <div className="flex flex-col items-start gap-y-2">
              <label className="text-sm font-medium text-gray-700">
                Your Rating*
              </label>
              <Controller
                name="rating"
                control={control}
                rules={{
                  validate: (value) => value > 0 || "A rating is required",
                }}
                render={({ field }) => (
                  <Rating
                    {...field}
                    precision={0.5}
                    size="large"
                    onChange={(_, value) => field.onChange(value)}
                  />
                )}
              />
              {errors.rating && (
                <p className="text-xs text-red-600">{errors.rating.message}</p>
              )}
            </div>

            <div className="flex flex-col items-start gap-y-2">
              <label
                htmlFor="review-title"
                className="text-sm font-medium text-gray-700"
              >
                Review Title (Optional)
              </label>
              <input
                id="review-title"
                type="text"
                {...register("title")}
                className="block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g., A fantastic purchase!"
              />
              {errors.title && (
                <p className="text-xs text-red-600">
                  {errors.reviewTitle.message}
                </p>
              )}
            </div>

            <div className="flex flex-col items-start gap-y-2">
              <label
                htmlFor="review-message"
                className="text-sm font-medium text-gray-700"
              >
                Your Review
              </label>
              <textarea
                id="review-message"
                rows={4}
                {...register("comment", {
                  required: {
                    value: true,
                    message: "Review is required",
                  },
                })}
                className="block w-full resize-none rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                placeholder="Tell us more about your experience..."
              />
              {errors.comment && (
                <p className="text-xs text-red-600">{errors.comment.message}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Submit Review
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
