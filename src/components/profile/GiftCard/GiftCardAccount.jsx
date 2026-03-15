import React from "react";
import { FiGift } from "react-icons/fi";

import BuyGiftCardForm from "./BuyGiftCardForm";

const GiftCardAccount = () => {
  const currentBalance = 2500;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <div className="flex items-center mb-6">
        <FiGift className="text-2xl text-blue-500 mr-3" />

        <h1 className="text-2xl font-bold text-gray-800">My Gift Cards</h1>
      </div>

      <div className="text-center bg-gray-50 rounded-lg p-5 mb-6">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          Available Balance
        </p>

        <p className="text-4xl font-bold text-gray-900 mt-2">
          ₹{currentBalance.toLocaleString("en-IN")}
        </p>
      </div>

      <div>
        {/* REDUCED heading size from xl to lg */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Redeem a Gift Card
        </h2>
        <form>
          <div className="max-w-md mx-auto space-y-4">
            {" "}
            {/* Changed to max-w-md for a tighter form */}
            <div>
              <label htmlFor="giftCardCode" className="sr-only">
                Gift Card Code
              </label>
              <input
                type="text"
                id="giftCardCode"
                placeholder="Enter Gift Card Code"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
            >
              Redeem
            </button>
          </div>
        </form>
      </div>

      {/* --- Divider --- */}
      {/* REDUCED vertical margin from my-10 to my-8 */}
      <div className="my-8 border-t border-gray-200"></div>

      {/* --- Section 2: Buy a New Gift Card --- */}
      <BuyGiftCardForm />
    </div>
  );
};

export default GiftCardAccount;
