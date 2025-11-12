import React, { useState, useEffect } from "react";

import toast from "react-hot-toast";

import { useAuth } from "../contexts/AuthContext";
import { updateUser } from "../services/apiUsers";
import { updateMyPassword } from "../services/apiAuth";

function ProfilePage() {
  const { currentUser, setCurrentUser } = useAuth();
  const [profileData, setProfileData] = useState({
    userId: "",
    name: "",
    email: "",
    designation: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Prefill data from currentUser
  useEffect(() => {
    if (currentUser) {
      setProfileData({
        userId: currentUser.userId || "",
        name: currentUser.name || "",
        email: currentUser.email || "",
        designation: currentUser.designation || "",
      });
    }
  }, [currentUser]);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Submit profile update
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateUser(currentUser._id, profileData);

      if (res.status === "success") {
        toast.success("Profile updated successfully!");
        setCurrentUser(res.data);
      } else {
        toast.error("Update profile failed!");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Submit password update
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = passwordData;
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    setPasswordLoading(true);
    try {
      const res = await updateMyPassword({
        currentPassword,
        newPassword,
      });

      if (res.status === "success") {
        toast.success("Password updated successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error("Failed to update password");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="p-6 text-gray-100">
      <h1 className="text-2xl font-semibold mb-6">Profile</h1>

      {/* ===== USER INFO SECTION ===== */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-10 shadow-lg">
        <h2 className="text-lg font-medium mb-4 text-gray-200">
          User Information
        </h2>
        <form
          onSubmit={handleProfileSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm text-gray-400 mb-1">User Id</label>
            <input
              type="text"
              name="userId"
              value={profileData.userId}
              onChange={handleProfileChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
              disabled
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={profileData.designation}
              onChange={handleProfileChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="mt-4 px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 transition"
            >
              {loading ? "Saving..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>

      {/* ===== PASSWORD SECTION ===== */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-medium mb-4 text-gray-200">
          Change Password
        </h2>
        <form
          onSubmit={handlePasswordSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3 flex justify-end">
            <button
              type="submit"
              disabled={passwordLoading}
              className="mt-4 px-6 py-2 rounded-md bg-green-600 hover:bg-green-500 disabled:bg-gray-600 transition"
            >
              {passwordLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
