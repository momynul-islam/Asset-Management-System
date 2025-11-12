import apiClient from "./apiClient";

export const getAllActivities = async () => {
  const res = await apiClient.get("/activities");
  return res.data.data;
};

export const getActivity = async (id) => {
  const res = await apiClient.get(`/activities/${id}`);
  return res.data;
};

export const getActivitiesByAsset = async (assetId) => {
  const res = await apiClient.get(`/activities/asset/${assetId}`);
  return res.data;
};

export const getActivitiesByUser = async (userId) => {
  const res = await apiClient.get(`/activities/user/${userId}`);
  return res.data;
};
