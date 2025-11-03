import React from "react";

import { FiLogOut, FiMenu } from "react-icons/fi";

function Header({ sidebarOpen, setSidebarOpen, currentUser, logoutUser }) {
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
                console.log("navigate to profile page");
              }}
            >
              <span className="font-medium text-gray-100 group-hover:text-red-500">
                {currentUser.name}
              </span>
              <img
                src={"logo.png"}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border-2 group-hover:border-red-500"
              />
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
