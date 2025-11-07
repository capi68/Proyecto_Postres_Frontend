
import axios from "axios";


const API_BASE =
  import.meta.env.VITE_API_BASE ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

  console.log("API_BASE (Vite) =", API_BASE);


if (!import.meta.env.VITE_API_BASE && !import.meta.env.VITE_API_URL) {
  console.warn("⚠️ No hay VITE_API_BASE/VITE_API_URL en tus .env; usando localhost:3000");
}

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  withCredentials: false, 
});

// Token 
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 401 clean sesion
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      console.warn("Token inválido/expirado → logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/"; // redirect to /login
    }
    return Promise.reject(err);
  }
);

export default api;
