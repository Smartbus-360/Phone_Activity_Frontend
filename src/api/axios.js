import axios from "axios";

const API = axios.create({ baseURL: "https://phone.smartbus360.com/api" });

// Add JWT token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
