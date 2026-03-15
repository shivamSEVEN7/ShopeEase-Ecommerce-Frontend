import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router";
import EmptyCart from "./EmptyCart";
import NotLoggedInCart from "./NotLoggedInCart";
import formatToINR from "../../utils/formatToINR";

const Cart = () => {
  const {
    items: cartItems,
    price,
    discount,
    totalAmount,
    shipping,
  } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  return isAuthenticated ? (
    cartItems.length === 0 ? (
      <EmptyCart />
    ) : (
      <div className="max-w-5xl max-lg:max-w-2xl mx-auto p-4">
        <h1 className="text-xl font-semibold text-slate-900">Shopping Cart</h1>
        <div className="grid lg:grid-cols-3 lg:gap-x-8 gap-x-6 gap-y-8 mt-6">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItem key={item.cartItemId} item={item} />
            ))}
          </div>

          <div className="bg-white rounded-md px-4 py-6 h-max shadow-sm border border-gray-200">
            <ul className="text-slate-500 font-medium space-y-4">
              <li className="flex flex-wrap gap-4 text-sm">
                Price{" "}
                <span className="ml-auto font-semibold text-slate-900">
                  {formatToINR(price)}
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Discount{" "}
                <span className="ml-auto font-semibold text-slate-900">
                  -{formatToINR(discount)}
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Shipping{" "}
                <span className="ml-auto font-semibold text-slate-900">
                  {formatToINR(shipping)}
                </span>
              </li>

              <hr className="border-slate-300" />
              <li className="flex flex-wrap gap-4 text-sm font-semibold text-slate-900">
                Total{" "}
                <span className="ml-auto">{formatToINR(totalAmount)}</span>
              </li>
            </ul>
            <div className="mt-8 space-y-4">
              <button
                onClick={() => navigate("/checkout")}
                type="button"
                className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-slate-800 hover:bg-slate-900 text-white rounded-md cursor-pointer"
              >
                Buy Now
              </button>
              <Link to={"/products"}>
                <button
                  type="button"
                  className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-slate-50 hover:bg-slate-100 text-slate-900 border border-gray-300 rounded-md cursor-pointer"
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-4">
              <img
                src="https://readymadeui.com/images/master.webp"
                alt="card1"
                className="w-10 object-contain"
              />
              <img
                src="https://readymadeui.com/images/visa.webp"
                alt="card2"
                className="w-10 object-contain"
              />
              <img
                src="https://readymadeui.com/images/american-express.webp"
                alt="card3"
                className="w-10 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    <NotLoggedInCart />
  );
};
export default Cart;
