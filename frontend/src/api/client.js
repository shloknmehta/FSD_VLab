import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Attach JWT or auth token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('vlab_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Unified response error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log or handle network / auth error
    return Promise.reject(error);
  }
);

export default api;
