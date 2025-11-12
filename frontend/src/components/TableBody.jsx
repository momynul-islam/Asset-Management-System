import React from "react";

import NoTableData from "./NoTableData";
import TableActionsButton from "./TableActionsButton";

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc && acc[key], obj);
};

function TableBody({
  data = [],
  fields = [],
  statusField = false,
  handleViewClick,
  handleEditClick,
  handleDeleteClick,
  actionButtons = true,
  label = "record",
}) {
  return (
    <tbody className="divide-y divide-gray-700">
      {data.map((item) => (
        <tr key={item._id} className="hover:bg-gray-800">
          {fields.map((field) => {
            const value = getNestedValue(item, field);
            return (
              <td key={field} className="px-6 py-4">
                {statusField && field === "status" ? (
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      value === "active"
                        ? "bg-green-600 text-white"
                        : value === "in-repair" || value === "inactive"
                        ? "bg-[#f59e0b]"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {value}
                  </span>
                ) : (
                  value || "-"
                )}
              </td>
            );
          })}

          {actionButtons && (
            <TableActionsButton
              data={item}
              handleViewClick={handleViewClick}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
            />
          )}
        </tr>
      ))}

      <NoTableData data={data} label={label} />
    </tbody>
  );
}

export default TableBody;
