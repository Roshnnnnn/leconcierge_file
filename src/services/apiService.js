import axios from 'axios';
import { API_URL, axiosConfig } from '../utils/config';
import { toast } from 'react-toastify';

// Create an axios instance with default config
const api = axios.create(axiosConfig);

// Auth APIs
export const authAPI = {
  login: async (data) => {
    const response = await api.post(`${API_URL}/auth/email_login`, data);
    toast.success('Successfully logged in!', {
      position: "top-right",
      autoClose: 3000
    });
    return response.data;
  },
  signup: async (data) => {
    const response = await api.post(`${API_URL}/register`, data);
    toast.success('Successfully registered!', {
      position: "top-right",
      autoClose: 3000
    });
    return response.data;
  },
  forgotPassword: async (email) => {
    const response = await api.post(`${API_URL}/auth/forgot_password`, { email });
    toast.success('Password reset instructions sent to your email', {
      position: "top-right",
      autoClose: 3000
    });
    return response.data;
  },
  verifyResetOtp: async (otp, password_reset_code) => {
    const response = await api.post(`${API_URL}/auth/reset_password_otp_verify`, {
      otp,
      password_reset_code
    });
    toast.success('OTP verified successfully', {
      position: "top-right",
      autoClose: 3000
    });
    return response.data;
  },
  resetPassword: async (data) => {
    const response = await api.post(`${API_URL}/auth/reset_password`, data);
    toast.success('Password reset successful', {
      position: "top-right",
      autoClose: 3000
    });
    return response.data;
  },
  confirmPhoneCode: async (data) => {
    const response = await api.post(`${API_URL}/auth/confirm_phone_code`, data);
    toast.success('Phone number verified successfully', {
      position: "top-right",
      autoClose: 3000
    });
    return response.data;
  },
  logout: async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await api.post(`${API_URL}/auth/logout`, {}, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    localStorage.clear();
    toast.success('Successfully logged out', {
      position: "top-right",
      autoClose: 3000
    });
    return response.data;
  }
};

// Home APIs
export const homeAPI = {
  getHomeData: () => {
    return api.get(`${API_URL}/home`);
  },
  getPromotions: () => {
    return api.post(`${API_URL}/get_promotions`, {});
  },
  getServiceCategories: () => {
    return api.get(`${API_URL}/service/categories`);
  },
  getServiceCategoryDetails: (id) => {
    return api.get(`${API_URL}/service/category/${id}`);
  },
  getHomeActivityTypes: () => {
    return api.post(`${API_URL}/home_new_activity_types`, {});
  },
  getHomeServiceData: () => {
    return api.post(`${API_URL}/service_home_load_test_test`, {});
  }
};

// Error Handler
const handleApiError = (error) => {
  if (error.response) {
    const errorMessage = error.response.data.message || 'Server error occurred';
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 3000
    });
    return {
      success: false,
      error: errorMessage,
      status: error.response.status
    };
  } else if (error.request) {
    const errorMessage = 'No response from server';
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 3000
    });
    return {
      success: false,
      error: errorMessage,
      status: 503
    };
  } else {
    const errorMessage = 'Request failed';
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 3000
    });
    return {
      success: false,
      error: errorMessage,
      status: 400
    };
  }
};

// Response wrapper
const apiWrapper = async (apiCall) => {
  try {
    const response = await apiCall();
    return {
      success: true,
      data: response,
      error: null
    };
  } catch (error) {
    console.error('API Error:', error);
    return handleApiError(error);
  }
};

// Wrapped APIs with error handling
export const safeAPI = {
  auth: {
    login: (data) => apiWrapper(() => authAPI.login(data)),
    signup: (data) => apiWrapper(() => authAPI.signup(data)),
    forgotPassword: (email) => apiWrapper(() => authAPI.forgotPassword(email)),
    verifyResetOtp: (otp, code) => apiWrapper(() => authAPI.verifyResetOtp(otp, code)),
    resetPassword: (data) => apiWrapper(() => authAPI.resetPassword(data)),
    confirmPhoneCode: (data) => apiWrapper(() => authAPI.confirmPhoneCode(data)),
    logout: () => apiWrapper(() => authAPI.logout())
  },
  home: {
    getHomeData: () => apiWrapper(homeAPI.getHomeData),
    getPromotions: () => apiWrapper(homeAPI.getPromotions),
    getServiceCategories: () => apiWrapper(homeAPI.getServiceCategories),
    getServiceCategoryDetails: (id) => apiWrapper(() => homeAPI.getServiceCategoryDetails(id)),
    getHomeActivityTypes: () => apiWrapper(homeAPI.getHomeActivityTypes),
    getHomeServiceData: () => apiWrapper(homeAPI.getHomeServiceData)
  }
};

export default safeAPI;
