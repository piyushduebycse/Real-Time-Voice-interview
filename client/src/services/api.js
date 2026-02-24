import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use(async (config) => {
    if (typeof window !== 'undefined' && window.__clerk_token_getter) {
        const token = await window.__clerk_token_getter();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default api;
