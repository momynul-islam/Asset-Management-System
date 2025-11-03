import React from "react";
import { useMoveBack } from "../hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-900 text-gray-100">
      <h1 className="text-8xl md:text-9xl font-extrabold mb-6 text-indigo-500">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        Page Not Found
      </h2>
      <p className="mb-8 text-gray-400 text-center max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={moveBack}
        className="px-6 py-3 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-md transition-all duration-300"
      >
        Go Back
      </button>
    </div>
  );
}

export default PageNotFound;
