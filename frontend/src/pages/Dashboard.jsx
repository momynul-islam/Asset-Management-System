import React, { useState, useEffect } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import StatCard from "../components/StatCard";
import {
  getDashboardStats,
  getRecentActivities,
  getStatsByDepartment,
} from "../services/apiDashboard";
import ActivityDescriptionCell from "../features/activities/ActivityDescriptionCell";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const statsData = await getDashboardStats();
    const recent = await getRecentActivities();
    const departmentStats = await getStatsByDepartment();

    setStats(statsData);
    setActivities(recent);
    setDepartmentData(departmentStats);
  }

  const statusData = [
    { name: "Active", value: stats?.activeAssets || 0 },
    { name: "Inactive", value: stats?.inactiveAssets || 0 },
    { name: "Under Repair", value: stats?.repairAssets || 0 },
    { name: "Lost", value: stats?.lostAssets || 0 },
  ];

  const COLORS = ["#22c55e", "#9ca3af", "#f59e0b", "#ef4444"];

  return (
    <div className="p-6 space-y-6">
      {/* ====== STATS CARDS ====== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Assets" value={stats?.totalAssets} />
        <StatCard title="Active" value={stats?.activeAssets} />
        <StatCard title="Inactive" value={stats?.inactiveAssets} />
        <StatCard title="Under Repair" value={stats?.repairAssets} />
        <StatCard title="Lost" value={stats?.lostAssets} />
      </div>

      {/* ====== CHARTS SECTION ====== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart for Asset Status */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">
            Asset Status Overview
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "0.5rem",
                    color: "#e5e7eb",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center mt-5 gap-4 text-sm text-gray-400">
              {statusData.map((s, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  ></span>
                  {s.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Chart for Assets per Department */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">
            Assets by Department
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="departmentName" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "0.5rem",
                    color: "#e5e7eb",
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ====== RECENT ACTIVITY TABLE ====== */}
      <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">
          Recent Activities
        </h2>

        <table className="w-full text-sm text-gray-300">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="py-2">Date</th>
              <th className="py-2">Type</th>
              <th className="py-2">User</th>
              <th className="py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {activities.slice(0, 5).map((act) => (
              <tr key={act._id} className="border-b border-gray-800">
                <td className="py-2 text-gray-400">
                  {new Date(act.createdAt).toLocaleString()}
                </td>
                <td className="py-2">
                  <span className="px-2 py-1 rounded text-xs bg-gray-800">
                    {act.type}
                  </span>
                </td>
                <td className="py-2 text-blue-400">{act.performedBy}</td>
                <td className="py-2">
                  <ActivityDescriptionCell description={act.description} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
