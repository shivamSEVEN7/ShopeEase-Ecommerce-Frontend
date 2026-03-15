import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoreUserOrders, fetchUserOrders } from "../../store/actions";
import NoOrdersPage from "./NoOrdersPage";

// --- Main Page Component ---
const OrderHistory = () => {
  const dispatch = useDispatch();

  const { orders, pagination, loading, error } = useSelector(
    (state) => state.order
  );
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);
  const showMoreButtonHandler = () => {
    console.log("Show More Button Clicked");
    dispatch(fetchMoreUserOrders(pagination.offset + pagination.limit, 4));
  };
  return orders.length == 0 && !loading ? (
    <NoOrdersPage />
  ) : (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto p-2">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </div>
        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </div>
        )}
        <div className="mt-6 flex justify-center">
          {pagination.last ? (
            <button
              disabled
              className="flex items-center justify-center gap-2 py-2 px-6 text-sm font-semibold text-black bg-gray-100 rounded-lg border shadow-sm "
            >
              No more results to display
            </button>
          ) : (
            <button
              onClick={showMoreButtonHandler}
              className="flex items-center justify-center gap-2 py-2 px-6 text-sm font-semibold text-blue-600 bg-white hover:bg-blue-50 rounded-lg border shadow-sm transition-colors"
            >
              Show More Orders
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
