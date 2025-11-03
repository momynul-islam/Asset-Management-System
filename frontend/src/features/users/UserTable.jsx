import React, { useState } from "react";

import { FiTrash2, FiEdit, FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";

import UserModal from "./UserModal";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../contexts/AuthContext";
import { deleteUser } from "../../services/apiUsers";

const UserTable = ({ users, isLoading, isError }) => {
  const { currentUser } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("add"); // "add" or "edit"

  const handleEditClick = (user) => {
    if (currentUser.role != "admin") {
      return toast.error("You don't have permission to edit user");
    }

    setSelectedUser(user);
    setMode("edit");
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (user) => {
    if (currentUser.role != "admin") {
      return toast.error("You don't have permission to delete user");
    }

    const res = await deleteUser(user._id);

    if (res.status === 204) {
      toast.success("User deleted successfully");
    } else {
      toast.error("User delete unseccessfully");
    }
  };

  const handleAddClick = () => {
    if (currentUser.role != "admin") {
      return toast.error("You don't have permission to add user");
    }

    setSelectedUser(null);
    setMode("add");
    setIsModalOpen(true);
  };

  if (isLoading) return <Spinner />;

  if (isError)
    return (
      <div className="text-red-500 text-center py-10">Error loading users.</div>
    );

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md text-gray-100"
          onClick={handleAddClick}
        >
          <FiPlus size={18} />
          <span>Add User</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-gray-900 text-gray-100">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                User Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Designation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-800">
                <td className="px-6 py-4">{user.userId}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.designation || "-"}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4 flex justify-center space-x-4">
                  <button
                    className="text-blue-400 hover:text-blue-600"
                    onClick={() => handleEditClick(user)}
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteClick(user)}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <UserModal
          mode={mode}
          user={selectedUser}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default UserTable;
