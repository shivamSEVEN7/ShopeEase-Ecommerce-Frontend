import React, { useState } from "react";

const BuyGiftCardForm = () => {
  const [cardValue, setCardValue] = useState(500);
  const [quantity, setQuantity] = useState(1);

  return (
    // This is now a simple div, as the parent provides the 'card' styling
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Buy a New Gift Card
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1: Form Fields */}
        <div className="space-y-6">
          <div>
            <label
              htmlFor="receiverEmail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Receiver's Email ID *
            </label>
            <input
              type="email"
              id="receiverEmail"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="receiverName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Receiver's Name *
            </label>
            <input
              type="text"
              id="receiverName"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="cardValue"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Card Value in ₹
              </label>
              <select
                id="cardValue"
                value={cardValue}
                onChange={(e) => setCardValue(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value={500}>₹500</option>
                <option value={1000}>₹1,000</option>
                <option value={2000}>₹2,000</option>
                <option value={5000}>₹5,000</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                No. of Cards
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <button className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Proceed to Pay ₹{(cardValue * quantity).toLocaleString("en-IN")}
          </button>
        </div>

        {/* Column 2: Gift Card Preview */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm h-56 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-2xl text-white p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-lg font-semibold">Gift Card</span>
              <span className="font-bold text-2xl">Shop Ease</span>
            </div>
            <div className="text-center my-4">
              <span className="text-5xl font-bold tracking-wider">
                ₹{cardValue.toLocaleString("en-IN")}
              </span>
            </div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyGiftCardForm;
