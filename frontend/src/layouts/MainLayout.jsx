import { useState } from "react";

import { Outlet } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logoutUser } = useAuth();

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentUser={currentUser}
          logoutUser={logoutUser}
        />
        <main className="flex-1 overflow-y-auto bg-gray-900 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
