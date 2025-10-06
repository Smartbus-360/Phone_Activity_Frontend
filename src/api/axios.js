// import axios from "axios";

// const API = axios.create({ baseURL: "https://phone.smartbus360.com/api" });

// // Add JWT token automatically
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: "https://phone.smartbus360.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Do not send cookies automatically
});

// ✅ Attach JWT token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("⚠️ No token found in localStorage");
  }
  return req;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.error("🚫 Unauthorized — Token missing or expired");
    } else if (err.response?.status === 403) {
      console.error("🚫 Forbidden — Not allowed for this role");
    }
    return Promise.reject(err);
  }
);

export default API;
