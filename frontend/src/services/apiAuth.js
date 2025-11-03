import apiClient from "./apiClient";

export const signup = async (data) => {
  const res = await apiClient.post("/auth/signup", data);
  return res.data;
};

export const login = async (email, password) => {
  const res = await apiClient.post("/auth/login", { email, password });
  return res.data;
};

export const logout = async () => {
  const res = await apiClient.get("/auth/logout");
  return res.data;
};

export const updateMyPassword = async (data) => {
  const res = await apiClient.patch("/auth/updateMyPassword", data);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await apiClient.get("/auth/getCurrentUser");
  return res.data;
};
