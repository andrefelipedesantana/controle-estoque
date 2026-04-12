import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333", // URL do backend
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    // Pegando o token do localStorage (só funciona no client-side)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
