import React, { useState, useEffect } from "react";

import toast from "react-hot-toast";

import { createAsset, updateAsset } from "../../services/apiAssets";
import { getAllVendors } from "../../services/apiVendors";
import { getAllDepartments } from "../../services/apiDepartments";
import { getAllUsers } from "../../services/apiUsers";

function AssetModal({ mode = "add", asset, closeModal }) {
  const [formData, setFormData] = useState({
    assetName: "",
    manufacturer: "",
    origin: "",
    category: "",
    serialNumber: "",
    vendor: "",
    price: "",
    assignedDepartment: "",
    warranty: "",
    purchaseDate: "",
    installationDate: "",
    room: "",
    assignedUser: "",
    branch: "",
    status: "active",
  });

  const [vendors, setVendors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const vendorsData = await getAllVendors();
        const departmentsData = await getAllDepartments();
        const usersData = await getAllUsers();

        setVendors(vendorsData || []);
        setDepartments(departmentsData || []);
        setUsers(usersData || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDropdowns();

    if (mode === "edit" && asset) {
      setFormData({
        assetName: asset.assetName || "",
        manufacturer: asset.manufacturer || "",
        origin: asset.origin || "",
        category: asset.category || "",
        serialNumber: asset.serialNumber || "",
        vendor: asset.vendor?._id || "",
        price: asset.price || "",
        assignedDepartment: asset.assignedDepartment?._id || "",
        warranty: asset.warranty || "",
        purchaseDate: asset.purchaseDate
          ? new Date(asset.purchaseDate).toISOString().split("T")[0]
          : "",
        installationDate: asset.installationDate
          ? new Date(asset.installationDate).toISOString().split("T")[0]
          : "",
        room: asset.room || "",
        assignedUser: asset.assignedUser?._id || "",
        branch: asset.branch || "",
        status: asset.status || "active",
      });
    }
  }, [mode, asset]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (mode === "edit") {
        res = await updateAsset(asset._id, formData);

        res.status === "success"
          ? toast.success("Asset updated")
          : toast.error("Update failed");
      } else {
        res = await createAsset(formData);

        res.status === "success"
          ? toast.success("Asset created")
          : toast.error("Creation failed");
      }

      closeModal();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 text-gray-100 rounded-lg w-full max-w-5xl max-h-[90vh] flex flex-col shadow-lg overflow-y-auto">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">
            {mode === "edit" ? "Edit Asset" : "Add Asset"}
          </h2>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">Asset Name</label>
            <input
              type="text"
              name="assetName"
              value={formData.assetName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Origin</label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Serial Number</label>
            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Vendor</label>
            <select
              name="vendor"
              value={formData.vendor}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            >
              <option value="">-- Select Vendor --</option>
              {vendors.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Assigned Department</label>
            <select
              name="assignedDepartment"
              value={formData.assignedDepartment}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            >
              <option value="">-- Select Department --</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Assigned User</label>
            <select
              name="assignedUser"
              value={formData.assignedUser}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            >
              <option value="">-- Select User --</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Warranty</label>
            <input
              type="text"
              name="warranty"
              value={formData.warranty}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Purchase Date</label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Installation Date</label>
            <input
              type="date"
              name="installationDate"
              value={formData.installationDate}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Room</label>
            <input
              type="text"
              name="room"
              value={formData.room}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Branch</label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            >
              <option value="active">Active</option>
              <option value="in-repair">In Repair</option>
              <option value="inactive">Inactive</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </div>

        <div className="p-4 border-t border-gray-700 flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssetModal;
