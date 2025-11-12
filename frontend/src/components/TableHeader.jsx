import React from "react";

function TableHeader({ headerTitles }) {
  return (
    <thead className="bg-gray-800">
      <tr>
        {headerTitles.map((ht, idx) => (
          <th
            key={idx}
            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            {ht}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
