import api from "./api";
import { useAuthStore } from "../stores/auth";


api.interceptors.request.use(
  (config) => {
    const store = useAuthStore()
    const auth = store.token ? `Bearer ${store.token}` : null;
   //console.log("Adding Token: ",store.token);
   config.headers['Authorization'] = auth;
   return config;
});

export const csrfCookie = () => api.get("/sanctum/csrf-cookie");

export const login = (credentials) => api.post("/api/auth/admin/login", credentials);

export const logout = () => api.post("/api/auth/admin/logout");

export const getUser = () => api.get("/api/logged_admin");