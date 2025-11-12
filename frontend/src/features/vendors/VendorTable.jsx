import React, { useState } from "react";

import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";

import Spinner from "../../components/Spinner";
import { useAuth } from "../../contexts/AuthContext";
import { deleteVendor } from "../../services/apiVendors";
import TableHeader from "../../components/TableHeader";
import TableBody from "../../components/TableBody";
import ViewModal from "../../components/ViewModal";
import VendorModal from "./VendorModal";

const VendorTable = ({ vendors, isLoading, isError }) => {
  const { currentUser } = useAuth();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [mode, setMode] = useState("add");

  const handleEditClick = (vendor) => {
    if (currentUser.role != "admin") {
      return toast.error("You don't have permission");
    }

    setSelectedVendor(vendor);
    setMode("edit");
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (vendor) => {
    if (currentUser.role != "admin") {
      return toast.error("You don't have permission");
    }

    const res = await deleteVendor(vendor._id);

    res.status === 204
      ? toast.success("Vendor deleted")
      : toast.error("Failed");
  };

  const handleViewClick = (vendor) => {
    setSelectedVendor(vendor);
    setIsViewModalOpen(true);
  };

  const handleAddClick = () => {
    if (currentUser.role != "admin") {
      return toast.error("You don't have permission");
    }

    setMode("add");
    setSelectedVendor(null);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return (
      <div className="text-red-500 text-center py-10">
        Error loading vendors.
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
          <span>Add Vendor</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-gray-900 text-gray-100">
        <table className="min-w-full divide-y divide-gray-700">
          <TableHeader
            headerTitles={[
              "vendor code",
              "name",
              "contact person",
              "phone",
              "email",
              "address",
              "status",
              "actions",
            ]}
          />
          <TableBody
            fields={[
              "vendorCode",
              "name",
              "contactPerson",
              "phone",
              "email",
              "address",
              "status",
            ]}
            statusField={true}
            data={vendors}
            label="vendor"
            handleViewClick={handleViewClick}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        </table>
      </div>

      {isViewModalOpen && (
        <ViewModal
          title="Vendor Details"
          data={selectedVendor}
          fields={[
            "vendorCode",
            "name",
            "contactPerson",
            "phone",
            "email",
            "address",
            "website",
            "status",
            "notes",
          ]}
          closeModal={() => setIsViewModalOpen(false)}
        />
      )}

      {isModalOpen && (
        <VendorModal
          mode={mode}
          vendor={selectedVendor}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default VendorTable;
