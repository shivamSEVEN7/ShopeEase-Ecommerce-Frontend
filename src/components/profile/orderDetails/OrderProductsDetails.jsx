import React from "react";
import ProductItem from "./ProductItem";

const OrderProductsDetails = ({ items }) => (
  // We remove the outer shadow and padding, as each card now has its own styling
  <div className="lg:col-span-2 space-y-6">
    <h3 className="text-2xl font-bold text-gray-800 px-1">
      Items in Your Order ({items.length})
    </h3>

    {/* The list of product cards */}
    <div className="space-y-6">
      {items.map((item) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </div>
  </div>
);

export default OrderProductsDetails;
