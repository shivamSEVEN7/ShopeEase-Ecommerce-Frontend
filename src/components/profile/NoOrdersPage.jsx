import { FiShoppingCart } from "react-icons/fi"; // React Icon

const NoOrdersPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <FiShoppingCart size={80} className="mb-4" />
      <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
      <p className="text-center max-w-sm">
        You haven’t placed any orders yet. Start shopping to see them here!
      </p>
    </div>
  );
};

export default NoOrdersPage;
