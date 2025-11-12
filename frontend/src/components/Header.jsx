import React from "react";

import { useNavigate } from "react-router";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

function Header({ sidebarOpen, setSidebarOpen, currentUser, logoutUser }) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between h-16 px-4 bg-gray-800 shadow-md border-b border-gray-700">
      <button
        className="text-gray-200 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FiMenu size={24} />
      </button>

      <h2 className="text-xl font-semibold text-gray-200">Dashboard</h2>

      <div className="flex items-center gap-4">
        {currentUser && (
          <>
            <div
              className="flex gap-2 items-center cursor-pointer group"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <span className="font-medium text-gray-100 group-hover:text-green-500">
                {currentUser.name}
              </span>
              <FaUserCircle className="group-hover:text-green-500" />
            </div>
            <button
              onClick={() => {
                logoutUser();
              }}
              className="text-gray-200 hover:text-red-500 transition-colors"
            >
              <FiLogOut size={20} />
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
