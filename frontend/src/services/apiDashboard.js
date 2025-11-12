import apiClient from "./apiClient";

export const getDashboardStats = async () => {
  const res = await apiClient.get("/dashboard/stats");
  return res.data?.data;
};

export const getRecentActivities = async () => {
  const res = await apiClient.get("/dashboard/recentActivities");
  return res.data?.data;
};

export const getStatsByDepartment = async () => {
  const res = await apiClient.get("/dashboard/statsByDepartment");
  return res.data?.data;
};
