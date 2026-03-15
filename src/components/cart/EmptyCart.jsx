import { BsCart4 } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <BsCart4 className="text-gray-400 text-6xl mb-4 drop-shadow-md" />

      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Your Cart is Empty
      </h1>

      <p className="text-gray-600 mb-6 max-w-md">
        Looks like you haven't added anything to your cart yet. Explore our
        products and find something you love!
      </p>

      <button
        onClick={() => navigate("/products")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Browse Products
      </button>
    </div>
  );
}
