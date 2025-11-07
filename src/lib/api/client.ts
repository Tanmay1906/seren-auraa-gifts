import axios from 'axios';

const normalizeUrl = (url?: string) => url?.replace(/\/+$/, '');

const envBaseUrl = normalizeUrl(import.meta.env.VITE_API_URL);
const fallbackBaseUrl = typeof window !== 'undefined'
  ? `${normalizeUrl(window.location.origin) ?? ''}/api`
  : '/api';

export const API_BASE_URL = envBaseUrl || fallbackBaseUrl;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
