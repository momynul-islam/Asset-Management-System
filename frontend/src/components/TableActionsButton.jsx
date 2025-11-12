import React from "react";

import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";

function TableActionsButton({
  handleViewClick,
  handleEditClick,
  handleDeleteClick,
  data,
}) {
  return (
    <td className="px-6 py-4">
      <div className="flex space-x-4 items-center">
        <button
          className="text-lime-400 hover:text-lime-600"
          onClick={() => handleViewClick(data)}
        >
          <FiEye size={18} />
        </button>
        <button
          className="text-blue-400 hover:text-blue-600"
          onClick={() => handleEditClick(data)}
        >
          <FiEdit size={18} />
        </button>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => handleDeleteClick(data)}
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </td>
  );
}

export default TableActionsButton;
