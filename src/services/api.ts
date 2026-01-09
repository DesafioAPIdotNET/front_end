import axios, { type InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
    // Usa a variável de ambiente da Vercel ou localhost
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// Interceptor para adicionar o token JWT automaticamente
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
});

export default api;