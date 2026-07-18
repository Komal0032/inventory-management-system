import API from "./axios";

export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};