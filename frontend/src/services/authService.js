import API from "./api"; // Adjust the path if needed

export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};