import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaSearchPlus,
} from "react-icons/fa";
import Rating from "@mui/material/Rating";
import ReviewsSection from "./ReviewsSection";
import { Link, useParams, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  decreaseItemQuantityInCart,
  fetchProductByProductId,
  increaseItemQuantityInCart,
} from "../../store/actions";
import ProductPageSkeleton from "./ProductPageSkelton";
import formatToINR from "../../utils/formatToINR";
import ProductNotFound from "./ProductNotFound";
import GenericErrorPage from "../shared/GenericErrorPage";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  return (
    <div className="flex flex-col-reverse">
      <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
        <div className="grid grid-cols-4 gap-6">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 ${
                selectedImage === image ? "ring-2 ring-indigo-500" : ""
              }`}
            >
              <span className="absolute inset-0 overflow-hidden rounded-md bg-gray-50">
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-contain object-center"
                />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={selectedImage}
          alt={"Product Name"}
          className="h-full w-full object-contain object-center"
        />

        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 z-10 rounded-full bg-white/60 p-3 text-gray-700 backdrop-blur-sm transition hover:scale-110 hover:text-red-500"
        >
          <FaHeart
            className={`h-6 w-6 ${
              isWishlisted ? "fill-red-500 text-red-500" : ""
            }`}
          />
          <span className="sr-only">Add to favorites</span>
        </button>
      </div>
    </div>
  );
};

const ProductPage = () => {
  const { productId, slug } = useParams();
  const btnLoader = false;
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { currentProduct: product } = useSelector((state) => state.products);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    dispatch(fetchProductByProductId(productId, setLoading, setError));
  }, [productId, dispatch]);
  const isAvailable = product?.quantity && Number(product?.quantity) > 0;
  const inTheCart = items.findIndex((item) => item.product.id === product?.id);
  const handleIncreaseQuantity = () => {
    dispatch(
      increaseItemQuantityInCart(
        items[inTheCart].product.id,
        items[inTheCart].product.productName
      )
    );
  };

  const handleDecreaseQuantity = () => {
    dispatch(
      decreaseItemQuantityInCart(
        items[inTheCart].product.id,
        items[inTheCart].product.productName
      )
    );
  };

  const handleAddToCart = () => {
    dispatch(addItemsToCart(product.id, product.productName));
  };

  return loading ? (
    <ProductPageSkeleton />
  ) : error ? (
    error.status === 404 ? (
      <ProductNotFound />
    ) : (
      <GenericErrorPage />
    )
  ) : (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-x-8 gap-y-10 md:grid-cols-2 lg:gap-x-16">
          <ImageGallery images={[product.image, ...product.additionalImages]} />

          <div className="self-start">
            <div className="mb-2">
              <span className="capitalize text-sm font-medium text-gray-500 hover:text-indigo-600 hover:underline">
                {product.category.categoryName}
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product.productName}
            </h1>

            <div className="mt-4">
              <div className="flex items-center">
                <div className="flex text-yellow-500">
                  <Rating
                    name="read-only"
                    precision={0.1}
                    value={product.averageRating}
                    size="small"
                    readOnly
                  />
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  {product.averageRating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Sold by{" "}
              <span className="font-medium text-indigo-600">
                {product.seller.businessName}
              </span>
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-baseline gap-x-4">
                <span className="text-3xl font-bold tracking-tight text-gray-900">
                  {formatToINR(product.specialPrice)}
                </span>
                <span className="text-xl font-medium text-gray-500 line-through">
                  {formatToINR(product.price)}
                </span>
                <span className="rounded-md bg-red-100 px-2 py-1 text-sm font-semibold text-red-700">
                  {product.discount}% OFF
                </span>
              </div>
            </div>

            <p className="mt-6 text-base text-gray-700">
              {product.description}
            </p>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Highlights</h3>
              <ul
                role="list"
                className="mt-4 list-disc space-y-2 pl-4 text-base text-gray-600"
              >
                {product.highlights?.map((highlight) => (
                  <li key={highlight.id}>{highlight.text}</li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              {inTheCart !== -1 ? (
                <div className="flex w-full items-center justify-between gap-x-4">
                  <div className="py-2 px-3 inline-block bg-white border border-gray-300 rounded-lg">
                    <div className="flex items-center gap-x-3">
                      <button
                        onClick={handleDecreaseQuantity}
                        type="button"
                        className="size-9 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        <svg
                          className="shrink-0 size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                        </svg>
                      </button>
                      <input
                        readOnly
                        className="p-0 w-12 bg-transparent border-0 text-gray-800 text-center text-lg font-medium focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        type="number"
                        value={items[inTheCart].quantity}
                      />
                      <button
                        onClick={handleIncreaseQuantity}
                        type="button"
                        className="size-9 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        <svg
                          className="shrink-0 size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <Link
                    to={"/cart"}
                    className="flex-1 inline-flex items-center justify-center rounded-md border border-indigo-600 bg-white px-6 py-3 text-base font-medium text-indigo-600 shadow-sm hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                  >
                    <FaShoppingCart className="mr-2 h-5 w-5" />
                    Go to Cart
                  </Link>
                </div>
              ) : !isAvailable ? (
                <button
                  disabled
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-200 px-8 py-3 text-base font-medium text-gray-500 cursor-not-allowed"
                >
                  Out of Stock
                </button>
              ) : (
                <button
                  disabled={btnLoader}
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-400"
                >
                  {btnLoader ? (
                    <FaSpinner className="animate-spin h-5 w-5" />
                  ) : (
                    <>
                      <FaShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <ReviewsSection
        reviews={product.reviews}
        reviewCount={product.reviewCount}
        averageRating={product.averageRating}
      />
    </div>
  );
};

export default ProductPage;
