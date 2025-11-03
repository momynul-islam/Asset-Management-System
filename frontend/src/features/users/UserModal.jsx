import React, { useState, useEffect } from "react";

import toast from "react-hot-toast";

import { createUser, updateUser } from "../../services/apiUsers";

const UserModal = ({ mode = "add", user, closeModal }) => {
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    password: "",
    designation: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && user) {
      setFormData({
        userId: user.userId || "",
        name: user.name || "",
        email: user.email || "",
        designation: user.designation || "",
        role: user.role || "user",
      });
    } else {
      setFormData({
        userId: "",
        name: "",
        email: "",
        password: "",
        designation: "",
        role: "user",
      });
    }
  }, [mode, user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "edit") {
        const res = await updateUser(user._id, formData);
        if (res.status === "success") {
          toast.success("Successfully updated the user");
        } else {
          toast.error("Error in updating the user", res?.message);
        }
      } else {
        const res = await createUser(formData);
        if (res.status === "success") {
          toast.success("Successfully added a new user");
        } else {
          toast.error("Error in adding a new user", res?.message);
        }
      }

      closeModal();
    } catch (err) {
      console.log(err);
      if (mode === "edit") {
        toast.error("Error in editng user");
      } else {
        toast.error("Error in creating user");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-gray-100 rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {mode === "edit" ? "Edit User" : "Add User"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">User Id</label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-700"
            />
          </div>
          {mode != "edit" && (
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-700"
              />
            </div>
          )}
          <div>
            <label className="block text-sm mb-1">Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-700"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
