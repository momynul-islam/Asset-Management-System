import React, { useState, useEffect } from "react";

import toast from "react-hot-toast";

import { createVendor, updateVendor } from "../../services/apiVendors";

const VendorModal = ({ mode = "add", vendor, closeModal }) => {
  const [formData, setFormData] = useState({
    vendorCode: "",
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    status: "active",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && vendor) {
      setFormData({
        vendorCode: vendor.vendorCode || "",
        name: vendor.name || "",
        contactPerson: vendor.contactPerson || "",
        phone: vendor.phone || "",
        email: vendor.email || "",
        website: vendor.website || "",
        address: vendor.address || "",
        status: vendor.status || "active",
        notes: vendor.notes || "",
      });
    } else {
      setFormData({
        vendorCode: "",
        name: "",
        contactPerson: "",
        phone: "",
        email: "",
        website: "",
        address: "",
        status: "active",
        notes: "",
      });
    }
  }, [mode, vendor]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (mode === "edit") {
        res = await updateVendor(vendor._id, formData);

        res.status === "success"
          ? toast.success("Vendor updated successfully")
          : toast.error("Failed to update vendor");
      } else {
        res = await createVendor(formData);

        res.status === "success"
          ? toast.success("Vendor added successfully")
          : toast.error("Failed to add vendor");
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
      <div className="bg-gray-900 text-gray-100 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-lg">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">
            {mode === "edit" ? "Edit Vendor" : "Add Vendor"}
          </h2>
        </div>

        <div className="overflow-y-auto p-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div>
              <label className="block text-sm mb-1">Vendor Code</label>
              <input
                type="text"
                name="vendorCode"
                value={formData.vendorCode}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Contact Person</label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Website</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
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
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-sm mb-1">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
              ></textarea>
            </div>
          </form>
        </div>

        <div className="p-4 border-t border-gray-700 flex justify-end gap-2">
          <button
            type="button"
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
};

export default VendorModal;
