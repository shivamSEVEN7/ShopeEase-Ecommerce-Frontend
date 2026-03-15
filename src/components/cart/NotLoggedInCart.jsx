import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NotLoggedInCart() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <FaUserPlus className="text-blue-500 text-6xl mb-4 drop-shadow-md" />

      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Create an Account
      </h1>

      <p className="text-gray-600 mb-6 max-w-md">
        Start adding products to your cart and enjoy a seamless shopping
        experience. Sign up now and discover amazing deals!
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-100 transition"
        >
          Browse Products
        </button>
      </div>
    </div>
  );
}
