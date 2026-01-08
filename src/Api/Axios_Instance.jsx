

import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7155/api", 
  headers: { "Content-type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default api;






