import React from "react";

function NoTableData({ data, label }) {
  return (
    <>
      {data.length === 0 && (
        <tr>
          <td colSpan="7" className="text-center text-gray-400 py-6 italic">
            No {label} found
          </td>
        </tr>
      )}
    </>
  );
}

export default NoTableData;
