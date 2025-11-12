import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";

import Spinner from "../../components/Spinner";
import { useAuth } from "../../contexts/AuthContext";
import { deleteAsset } from "../../services/apiAssets";
import TableHeader from "../../components/TableHeader";
import TableBody from "../../components/TableBody";
import ViewModal from "../../components/ViewModal";
import AssetModal from "./AssetModal";
import Pagination from "../../components/Pagination";
import Searchbar from "../../components/Searchbar";
import { PER_PAGE } from "../../utils/constants";

function AssetTable({ assets = [], isLoading, isError }) {
  const { currentUser } = useAuth();

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [mode, setMode] = useState("add");

  const [filteredAssets, setFilteredAssets] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleAddClick = () => {
    if (currentUser.role !== "admin") {
      return toast.error("You don't have permission");
    }
    setMode("add");
    setSelectedAsset(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (asset) => {
    if (currentUser.role !== "admin") {
      return toast.error("You don't have permission");
    }
    setSelectedAsset(asset);
    setMode("edit");
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (asset) => {
    if (currentUser.role !== "admin") {
      return toast.error("You don't have permission");
    }
    const res = await deleteAsset(asset._id);
    res.status === 204 ? toast.success("Asset deleted") : toast.error("Failed");
  };

  const handleViewClick = (asset) => {
    setSelectedAsset(asset);
    setIsViewModalOpen(true);
  };

  // 🧮 Filtering + Pagination logic
  useEffect(() => {
    const filteredData =
      search.trim().length === 0
        ? assets
        : assets.filter((asset) =>
            asset.assetName.toLowerCase().includes(search.toLowerCase())
          );

    const start = (page - 1) * PER_PAGE;
    const end = start + PER_PAGE;
    setFilteredAssets(filteredData.slice(start, end));

    setTotalPages(Math.ceil(filteredData.length / PER_PAGE));
  }, [assets, page, search]);

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div className="text-red-500 text-center py-10">
        Error loading assets.
      </div>
    );

  return (
    <>
      <div className="flex justify-end mb-4 gap-4">
        <Searchbar
          search={search}
          handleSearchChange={handleSearchChange}
          placeholderLabel="assets by asset name"
        />
        <button
          onClick={handleAddClick}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md text-gray-100"
        >
          <FiPlus size={18} />
          <span>Add Asset</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-gray-900 text-gray-100">
        <table className="min-w-full divide-y divide-gray-700">
          <TableHeader
            headerTitles={[
              "Asset Name",
              "Serial No",
              "Category",
              "Department",
              "User",
              "Status",
              "Actions",
            ]}
          />

          <TableBody
            fields={[
              "assetName",
              "serialNumber",
              "category",
              "assignedDepartment.name",
              "assignedUser.name",
              "status",
            ]}
            statusField={true}
            data={filteredAssets}
            label="asset"
            handleViewClick={handleViewClick}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        </table>

        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>

      {isViewModalOpen && (
        <ViewModal
          title="Asset Details"
          data={selectedAsset}
          fields={[
            "assetName",
            "serialNumber",
            "category",
            "manufacturer",
            "origin",
            "vendor.name",
            "assignedDepartment.name",
            "assignedUser.name",
            "room",
            "branch",
            "price",
            "warranty",
            "purchaseDate",
            "installationDate",
            "status",
          ]}
          closeModal={() => setIsViewModalOpen(false)}
        />
      )}

      {isModalOpen && (
        <AssetModal
          mode={mode}
          asset={selectedAsset}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default AssetTable;
