import axios from "axios";

//Detect if development or production
const baseURL = 
 import.meta.env.VITE_API_URL || "http://localhost:3000";

const publicApi = axios.create({ baseURL });

 const api = axios.create({ 
    baseURL,
    withCredentials: true, 
 });

 //Request interceptor: attaches the token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: detects token expiration or error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Token expirado o inválido, cerrando sesión...");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/"; // 🔁 redirect to login
    }
    return Promise.reject(error);
  }
);

 export default api;