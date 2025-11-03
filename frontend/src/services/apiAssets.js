import apiClient from "./apiClient";

export const getAllAssets = async () => {
  const res = await apiClient.get("/assets");
  return res.data;
};

export const getAsset = async (id) => {
  const res = await apiClient.get(`/assets/${id}`);
  return res.data;
};

export const createAsset = async (assetData) => {
  const res = await apiClient.post("/assets", assetData);
  return res.data;
};

export const updateAsset = async (id, updatedData) => {
  const res = await apiClient.patch(`/assets/${id}`, updatedData);
  return res.data;
};

export const deleteAsset = async (id) => {
  const res = await apiClient.delete(`/assets/${id}`);
  return res.data;
};
