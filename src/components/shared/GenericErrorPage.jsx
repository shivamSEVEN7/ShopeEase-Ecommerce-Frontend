import { Link } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";

const GenericErrorPage = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-4 py-12 text-center">
      <FaExclamationCircle className="h-20 w-20 text-red-500" />
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
        Oops! Something went wrong.
      </h1>
      <p className="mt-4 max-w-md text-base text-gray-600">
        We're sorry, but we're having trouble loading this page. It might be a
        temporary server issue or a network problem. Please try again in a
        moment.
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

export default GenericErrorPage;
