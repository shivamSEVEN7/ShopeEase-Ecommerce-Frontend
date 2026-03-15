import React from "react";

const SellerFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-white px-6 py-4">
      <p className="text-center text-sm text-gray-500">
        &copy; {currentYear} ShopEase. All rights reserved.
      </p>
    </footer>
  );
};

export default SellerFooter;
