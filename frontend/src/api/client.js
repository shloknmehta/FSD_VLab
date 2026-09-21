import axios from 'axios';

const defaultBaseURL = import.meta.env.PROD
  ? 'https://fsd-vlab.onrender.com/api/'
  : 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
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
