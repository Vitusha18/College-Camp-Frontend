import axios from "axios";

const userClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


export const registerUser = async (userData) => {
  const response = await userClient.post("/user/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await userClient.post("/user/login", credentials);
  return response.data;
};

export const logoutUser = async () => {
  const response = await userClient.post("/user/logout");
  return response.data;
};


export const getCurrentUser = async () => {
  const response = await userClient.get("/v1/user/me");
  return response.data.user;
};


export const getAllUsers = async () => {
  const response = await userClient.get("/user");
  return response.data.users;
};

export const getUserById = async (id) => {
  const response = await userClient.get(`/user/${id}`);
  return response.data.user;
};

export const updateUser = async (id, updateData) => {
  const response = await userClient.put(
    `/v1/user/update/${id}`,
    updateData
  );

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await userClient.delete(
    `/v1/user/delete/${id}`
  );

  return response.data;
};