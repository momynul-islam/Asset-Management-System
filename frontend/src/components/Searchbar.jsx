import React from "react";

function Searchbar({ search, handleSearchChange, placeholderLabel }) {
  return (
    <div className="flex justify-between items-center">
      <input
        type="text"
        placeholder={`Search ${placeholderLabel}...`}
        value={search}
        onChange={handleSearchChange}
        className="px-3 py-2 rounded bg-gray-800 text-gray-200 border border-gray-700 w-64"
      />
    </div>
  );
}

export default Searchbar;
