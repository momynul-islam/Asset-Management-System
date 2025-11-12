import React, { useState } from "react";

import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";

import Spinner from "../../components/Spinner";
import { useAuth } from "../../contexts/AuthContext";
import { deleteDepartment } from "../../services/apiDepartments";
import TableHeader from "../../components/TableHeader";
import TableBody from "../../components/TableBody";
import ViewModal from "../../components/ViewModal";
import DepartmentModal from "./DepartmentModal";

function DepartmentTable({ departments, isLoading, isError }) {
  const { currentUser } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [mode, setMode] = useState("add");

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
      <div className="flex justify-end mb-4">
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
            data={departments}
            label="department"
            handleViewClick={handleViewClick}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        </table>
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
