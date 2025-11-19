import React, { useEffect, useState } from "react";

import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";

import Spinner from "../../components/Spinner";
import { useAuth } from "../../contexts/AuthContext";
import { deleteDepartment } from "../../services/apiDepartments";
import TableHeader from "../../components/TableHeader";
import TableBody from "../../components/TableBody";
import ViewModal from "../../components/ViewModal";
import DepartmentModal from "./DepartmentModal";
import Searchbar from "../../components/Searchbar";
import Pagination from "../../components/Pagination";
import { PER_PAGE } from "../../utils/constants";

function DepartmentTable({ departments = [], isLoading, isError }) {
  const { currentUser } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleEditClick = (department) => {
    if (currentUser.role !== "admin") {
      return toast.error("You don't have permission");
    }

    setSelectedDepartment(department);
    setMode("edit");
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (department) => {
    if (currentUser.role !== "admin") {
      return toast.error("You don't have permission");
    }

    const res = await deleteDepartment(department._id);

    res.status === 204
      ? toast.success("Department deleted")
      : toast.error("Failed");
  };

  const handleViewClick = (department) => {
    setSelectedDepartment(department);
    setIsViewModalOpen(true);
  };

  const handleAddClick = () => {
    if (currentUser.role !== "admin") {
      return toast.error("You don't have permission");
    }

    setMode("add");
    setSelectedDepartment(null);
    setIsModalOpen(true);
  };

  // 🧮 Filtering + Pagination logic
  useEffect(() => {
    const filteredData =
      search.trim().length === 0
        ? departments
        : departments.filter((department) => {
            const departmentName = department?.name?.toString().toLowerCase();
            return (
              departmentName && departmentName.includes(search.toLowerCase())
            );
          });

    const start = (page - 1) * PER_PAGE;
    const end = start + PER_PAGE;
    setFilteredDepartments(filteredData.slice(start, end));

    setTotalPages(Math.ceil(filteredData.length / PER_PAGE));
  }, [departments, page, search]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center py-10">
        Error loading departments.
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4 gap-4">
        <Searchbar
          search={search}
          handleSearchChange={handleSearchChange}
          placeholderLabel="department by name"
        />
        <button
          onClick={handleAddClick}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md text-gray-100"
        >
          <FiPlus size={18} />
          <span>Add Department</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-gray-900 text-gray-100">
        <table className="min-w-full divide-y divide-gray-700">
          <TableHeader
            headerTitles={[
              "department code",
              "name",
              "head of department",
              "description",
              "status",
              "actions",
            ]}
          />

          <TableBody
            fields={[
              "departmentCode",
              "name",
              "headOfDepartment.name",
              "description",
              "status",
            ]}
            statusField={true}
            data={filteredDepartments}
            label="department"
            handleViewClick={handleViewClick}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        </table>

        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>

      {isViewModalOpen && (
        <ViewModal
          title="Department Details"
          data={selectedDepartment}
          fields={[
            "departmentCode",
            "name",
            "description",
            "status",
            "headOfDepartment.name",
          ]}
          closeModal={() => setIsViewModalOpen(false)}
        />
      )}

      {isModalOpen && (
        <DepartmentModal
          mode={mode}
          department={selectedDepartment}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default DepartmentTable;
