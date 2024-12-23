// Configuration constants
export const API_URL = import.meta.env.VITE_API_BASE_URL;

// Axios default config
export const axiosConfig = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};
