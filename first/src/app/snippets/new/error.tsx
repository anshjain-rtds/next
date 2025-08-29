"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-100 dark:bg-gray-900">
      {" "}
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full">
        {" "}
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
          Oops! Something went wrong.
        </h1>
        {" "}
        <p className="text-gray-700 dark:text-gray-300 mb-6">{error.message}</p>
        {" "}
        <button
          onClick={reset}
          className="px-6 py-3 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Try Again{" "}
        </button>
        {" "}
      </div>
      {" "}
    </div>
  );
}
