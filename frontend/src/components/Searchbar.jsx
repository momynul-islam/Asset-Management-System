import React from "react";

function Searchbar({ search, handleSearchChange }) {
  return (
    <div className="flex justify-between items-center">
      <input
        type="text"
        placeholder="Search assets..."
        value={search}
        onChange={handleSearchChange}
        className="px-3 py-2 rounded bg-gray-800 text-gray-200 border border-gray-700 w-64"
      />
    </div>
  );
}

export default Searchbar;
