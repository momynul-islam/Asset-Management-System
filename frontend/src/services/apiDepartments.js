import apiClient from "./apiClient";

export const getAllDepartments = async () => {
  const res = await apiClient.get("/departments");
  return res.data.data;
};

export const getDepartment = async (id) => {
  const res = await apiClient.get(`/departments/${id}`);
  return res.data;
};

export const createDepartment = async (data) => {
  const res = await apiClient.post("/departments", data);
  return res.data;
};

export const updateDepartment = async (id, data) => {
  const res = await apiClient.patch(`/departments/${id}`, data);
  return res.data;
};

export const deleteDepartment = async (id) => {
  const res = await apiClient.delete(`/departments/${id}`);
  return res;
};
