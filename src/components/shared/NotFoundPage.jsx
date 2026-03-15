import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-4 py-12 text-center">
      <FaExclamationTriangle className="h-16 w-16 text-yellow-500" />
      <h1 className="mt-6 text-6xl font-extrabold tracking-tighter text-gray-900">
        404
      </h1>
      <h2 className="mt-2 text-2xl font-semibold text-gray-800">
        Page Not Found
      </h2>
      <p className="mt-4 max-w-md text-base text-gray-600">
        Sorry, we couldn't find the page you're looking for. It might have been
        moved, deleted, or you may have mistyped the URL.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
