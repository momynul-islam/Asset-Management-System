import React, { useEffect, useState } from "react";

import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";

import Spinner from "../../components/Spinner";
import { useAuth } from "../../contexts/AuthContext";
import { deleteUser } from "../../services/apiUsers";
import TableHeader from "../../components/TableHeader";
import TableBody from "../../components/TableBody";
import ViewModal from "../../components/ViewModal";
import UserModal from "./UserModal";
import Searchbar from "../../components/Searchbar";
import { PER_PAGE } from "../../utils/constants";

const UserTable = ({ users, isLoading, isError }) => {
  const { currentUser } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

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
      toast.error("User deletion failed");
    }
  };

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleAddClick = () => {
    if (currentUser.role != "admin") {
      return toast.error("You don't have permission to add user");
    }

    setSelectedUser(null);
    setMode("add");
    setIsModalOpen(true);
  };

  // 🧮 Filtering + Pagination logic
  useEffect(() => {
    const filteredData =
      search.trim().length === 0
        ? users
        : users.filter(
            (user) =>
              user?.userId &&
              user?.userId.toLowerCase().includes(search.toLowerCase())
          );

    const start = (page - 1) * PER_PAGE;
    const end = start + PER_PAGE;
    setFilteredUsers(filteredData.slice(start, end));

    setTotalPages(Math.ceil(filteredData.length / PER_PAGE));
  }, [users, page, search]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center py-10">Error loading users.</div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Searchbar
          search={search}
          handleSearchChange={handleSearchChange}
          placeholderLabel="user by id"
        />
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
          <TableHeader
            headerTitles={[
              "user id",
              "name",
              "email",
              "designation",
              "role",
              "actions",
            ]}
          />
          <TableBody
            fields={["userId", "name", "email", "designation", "role"]}
            data={filteredUsers}
            statusField={false}
            label="user"
            handleViewClick={handleViewClick}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        </table>

        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>

      {isViewModalOpen && (
        <ViewModal
          title="User Details"
          data={selectedUser}
          fields={["userId", "name", "email", "designation", "role"]}
          closeModal={() => setIsViewModalOpen(false)}
        />
      )}

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
