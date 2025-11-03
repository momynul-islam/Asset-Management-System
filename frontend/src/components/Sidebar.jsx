import React from "react";

import { NavLink } from "react-router-dom";
import { FiUsers, FiHome, FiBox, FiLayers, FiActivity } from "react-icons/fi";

const links = [
  { name: "Dashboard", path: "/", icon: <FiHome /> },
  { name: "Assets", path: "/assets", icon: <FiBox /> },
  { name: "Departments", path: "/departments", icon: <FiLayers /> },
  { name: "Vendors", path: "/vendors", icon: <FiLayers /> },
  { name: "Users", path: "/users", icon: <FiUsers /> },
  { name: "Activities", path: "/activities", icon: <FiActivity /> },
];

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 transform bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out
                ${
                  sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:static md:flex md:flex-col`}
      >
        <div className="flex items-center justify-center h-16 shadow-md border-b border-gray-700">
          <h1 className="text-xl font-bold text-green-400">AssetTrack</h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 mx-2 my-1 rounded-md text-gray-200 hover:bg-gray-700 transition-colors ${
                  isActive ? "bg-green-600 font-semibold" : ""
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
