import React, { useState, useEffect } from "react";

import toast from "react-hot-toast";

import {
  createDepartment,
  updateDepartment,
} from "../../services/apiDepartments";
import { getAllUsers } from "../../services/apiUsers";

function DepartmentModal({ mode = "add", department, closeModal }) {
  const [formData, setFormData] = useState({
    departmentCode: "",
    name: "",
    description: "",
    headOfDepartment: "",
    status: "active",
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();

    if (mode === "edit" && department) {
      setFormData({
        departmentCode: department.departmentCode || "",
        name: department.name || "",
        description: department.description || "",
        headOfDepartment: department.headOfDepartment._id || "",
        status: department.status || "active",
      });
    }
  }, [mode, department]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (mode === "edit") {
        res = await updateDepartment(department._id, formData);

        res.status === "success"
          ? toast.success("Department updated")
          : toast.error("Update failed");
      } else {
        res = await createDepartment(formData);

        res.status === "success"
          ? toast.success("Department created")
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
      <div className="bg-gray-900 text-gray-100 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-lg">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">
            {mode === "edit" ? "Edit Department" : "Add Department"}
          </h2>
        </div>

        <div className="overflow-y-auto p-6">
          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1">Department Code</label>
              <input
                type="text"
                name="departmentCode"
                value={formData.departmentCode}
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
              <label className="block text-sm mb-1">Head of Department</label>
              <select
                name="headOfDepartment"
                value={formData.headOfDepartment}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
              >
                <option value="">-- Select User --</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <label className="block text-sm mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
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
          </form>
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

export default DepartmentModal;
