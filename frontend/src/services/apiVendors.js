import apiClient from "./apiClient";

export const getAllVendors = async () => {
  const res = await apiClient.get("/vendors");
  return res.data.data;
};

export const getVendor = async (id) => {
  const res = await apiClient.get(`/vendors/${id}`);
  return res.data;
};

export const createVendor = async (data) => {
  const res = await apiClient.post("/vendors", data);
  return res.data;
};

export const updateVendor = async (id, data) => {
  const res = await apiClient.patch(`/vendors/${id}`, data);
  return res.data;
};

export const deleteVendor = async (id) => {
  const res = await apiClient.delete(`/vendors/${id}`);
  return res;
};
