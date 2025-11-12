import React from "react";

function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="flex justify-center gap-2 my-4">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 rounded bg-gray-800 text-gray-200 disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-gray-400">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 rounded bg-gray-800 text-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
