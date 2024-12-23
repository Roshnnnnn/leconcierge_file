import axios from 'axios';
import { API_URL, axiosConfig } from '../utils/config';

// Create an axios instance with default config
const api = axios.create(axiosConfig);

// FAQ APIs
export const getFaqs = async () => {
  try {
    const response = await api.post(`${API_URL}/get_faq`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add other API endpoints here
export const getServices = async () => {
  try {
    const response = await api.get(`${API_URL}/services`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ... add more API endpoints as needed

export default api;
