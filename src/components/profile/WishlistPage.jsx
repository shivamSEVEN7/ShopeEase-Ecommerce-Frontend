import React, { useState } from "react";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";

// --- Mock Data (Same as before) ---
const initialWishlist = {
  wishlistId: 123,
  wishlistItems: [
    {
      wishlistItemId: 1,
      product: {
        id: 12,
        productName: "Dell XPS 15",
        description: "15-inch laptop with Intel i7, RTX 4060 and OLED display",
        image: "https://via.placeholder.com/300/09f/fff.png?text=Laptop",
        quantity: 7,
        price: 1899,
        discount: 8,
        specialPrice: 1747.08,
      },
    },
    {
      wishlistItemId: 2,
      product: {
        id: 15,
        productName: "Sony WH-1000XM5 Headphones",
        description: "Industry leading noise canceling wireless headphones",
        image: "https://via.placeholder.com/300/f6f/fff.png?text=Headphones",
        quantity: 15,
        price: 399,
        discount: 15,
        specialPrice: 339.15,
      },
    },
    // ... other items
  ],
};

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const handleRemoveItem = (wishlistItemId) => {
    setWishlist((prevWishlist) => ({
      ...prevWishlist,
      wishlistItems: prevWishlist.wishlistItems.filter(
        (item) => item.wishlistItemId !== wishlistItemId
      ),
    }));
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>
        {wishlist.wishlistItems.length > 0 ? (
          <div className="space-y-6">
            {wishlist.wishlistItems.map(({ wishlistItemId, product }) => (
              <div
                key={wishlistItemId}
                className="bg-white rounded-lg shadow-md flex flex-col md:flex-row overflow-hidden group"
              >
                <div className="relative md:w-48 flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-full h-48 md:h-full object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {product.discount}% OFF
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  {/* FONT SIZE REDUCED on h2 */}
                  <h2 className="text-lg font-bold text-gray-800">
                    {product.productName}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {product.description}
                  </p>

                  {/* FONT SIZES REDUCED on prices */}
                  <div className="mt-2 flex items-baseline space-x-2">
                    <p className="text-xl font-bold text-gray-900">
                      ₹{product.specialPrice.toLocaleString("en-IN")}
                    </p>
                    <p className="text-sm text-gray-500 line-through">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="flex-grow"></div>

                  {/* BUTTON and flex layout IMPROVED */}
                  <div className="mt-4 flex items-center justify-end">
                    <button className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-600">
                      <FiShoppingCart className="mr-2" />
                      Move to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveItem(wishlistItemId)}
                      className="ml-4 text-gray-500 hover:text-red-600 transition-colors p-2 rounded-full flex-shrink-0"
                      aria-label="Remove from wishlist"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mt-2">
              Add items you love to your wishlist to see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
