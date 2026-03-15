import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../utils/truncateText";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  decreaseItemQuantityInCart,
  increaseItemQuantityInCart,
} from "../../store/actions";
import formatToINR from "../../utils/formatToINR";
import { Link } from "react-router";

const ProductCard = ({
  id,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  slug,
  specialPrice,
}) => {
  const dispatch = useDispatch();
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const btnLoader = false;
  const [selectedViewProduct, setSelectedViewProduct] = useState("");
  const isAvailable = quantity && Number(quantity) > 0;
  const { items } = useSelector((state) => state.cart);
  const inTheCart = items.findIndex((item) => item.product.id === id);
  const handleAddToCart = () => {
    dispatch(addItemsToCart(id, productName));
  };
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
  return (
    <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
      <Link to={`/product/${id}/${slug}`}>
        <div className="w-full overflow-hidden aspect-[3/2] flex items-center justify-center bg-gray-100">
          <img
            className="max-w-full max-h-full object-contain cursor-pointer transition-transform duration-300 transform hover:scale-105"
            src={image}
            alt={productName}
          ></img>
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${id}/${slug}`}>
          <h2 className="text-lg font-semibold mb-2 cursor-pointer line-clamp-1">
            {productName}
          </h2>
          <div className="min-h-20 max-h-20">
            <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
          </div>
        </Link>
        <div className="flex items-center justify-between">
          <Link to={`/product/${id}/${slug}`}>
            {specialPrice ? (
              <div className="flex flex-col">
                <span className="text-gray-400 line-through">
                  {formatToINR(price)}
                </span>
                <span className="text-xl font-bold text-slate-700">
                  {formatToINR(specialPrice)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-slate-700">
                {"  "}
                {formatToINR(price)}
              </span>
            )}
          </Link>
          {inTheCart != -1 ? (
            <div
              className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg"
              data-hs-input-number=""
            >
              <div className="flex items-center gap-x-1.5">
                <button
                  onClick={handleDecreaseQuantity}
                  type="button"
                  className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  tabIndex="-1"
                  aria-label="Decrease"
                  data-hs-input-number-decrement=""
                >
                  <svg
                    className="shrink-0 size-3.5"
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
                  disabled
                  className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="number"
                  aria-roledescription="Number field"
                  value={items[inTheCart].quantity}
                  data-hs-input-number-input=""
                />
                <button
                  onClick={handleIncreaseQuantity}
                  type="button"
                  className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  tabIndex="-1"
                  aria-label="Increase"
                  data-hs-input-number-increment=""
                >
                  <svg
                    className="shrink-0 size-3.5"
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
          ) : (
            <button
              disabled={!isAvailable || btnLoader}
              onClick={handleAddToCart}
              className={`bg-blue-500 ${
                isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70"
              }
                        text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}
            >
              <FaShoppingCart className="mr-2" />

              {isAvailable ? "Add to Cart" : "Stock Out"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
