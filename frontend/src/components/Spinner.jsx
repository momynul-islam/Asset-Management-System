import React from "react";

function Spinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-16 h-16 border-4 border-t-indigo-600 border-gray-700 rounded-full animate-spin"></div>
    </div>
  );
}

export default Spinner;
