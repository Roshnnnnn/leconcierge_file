import { safeAPI } from './apiService';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

class AuthService {
  async login(email, password) {
    try {
      const response = await safeAPI.auth.login({ email, password });
      if (response.success) {
        const { data } = response.data;
        // Store user details in localStorage
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userFirstName", data.first_name);
        localStorage.setItem("userLastName", data.last_name);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userPhone", data.phone);
        localStorage.setItem("userImage", data.image);
        localStorage.setItem("userId", data.id);

        return {
          success: true,
          data
        };
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async signup(userData) {
    try {
      const response = await safeAPI.auth.signup(userData);
      if (response.success) {
        const { data } = response.data;
        // Store user details in localStorage
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userFirstName", data.first_name);
        localStorage.setItem("userLastName", data.last_name);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userPhone", data.phone);
        localStorage.setItem("userImage", data.image);
        localStorage.setItem("userId", data.id);

        return {
          success: true,
          data
        };
      } else {
        throw new Error(response.error || 'Signup failed');
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async verifyOtp(data) {
    try {
      const response = await safeAPI.auth.confirmPhoneCode(data);
      if (response.success) {
        return {
          success: true,
          data: response.data
        };
      } else {
        throw new Error(response.error || 'Failed to verify phone code');
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async handleForgotPassword(email) {
    try {
      const response = await safeAPI.auth.forgotPassword(email);
      
      if (response.success) {
        toast.success(response.data.message);
        return {
          success: true,
          passwordResetCode: response.data.oData.password_reset_code,
          message: response.data.message
        };
      } else {
        toast.error(response.error || "Failed to send email");
        return {
          success: false,
          error: response.error
        };
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      return {
        success: false,
        error: "An error occurred. Please try again."
      };
    }
  }

  async verifyResetOtp(otp, passwordResetCode) {
    try {
      const response = await safeAPI.auth.verifyResetOtp(otp, passwordResetCode);
      
      if (response.success) {
        toast.success(response.data.message);
        return {
          success: true,
          message: response.data.message
        };
      } else {
        toast.error(response.error || "Invalid OTP");
        return {
          success: false,
          error: response.error
        };
      }
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again.");
      return {
        success: false,
        error: "Failed to verify OTP. Please try again."
      };
    }
  }

  async resetPassword(data) {
    try {
      const response = await safeAPI.auth.resetPassword({
        password_reset_code: data.passwordResetCode,
        otp: data.otp,
        password: data.password,
        password_confirmation: data.passwordConfirmation,
      });
      
      if (response.success) {
        toast.success(response.data.message);
        return {
          success: true,
          message: response.data.message
        };
      } else {
        toast.error(response.error || "Failed to reset password");
        return {
          success: false,
          error: response.error
        };
      }
    } catch (error) {
      toast.error("An error occurred while resetting password.");
      return {
        success: false,
        error: "An error occurred while resetting password."
      };
    }
  }

  getUserData() {
    return {
      email: localStorage.getItem("userEmail"),
      image: localStorage.getItem("userImage"),
      firstName: localStorage.getItem("userFirstName"),
      lastName: localStorage.getItem("userLastName"),
      name: localStorage.getItem("userName"),
      phone: localStorage.getItem("userPhone"),
      dialCode: localStorage.getItem("userDialCode"),
      firebaseUserKey: localStorage.getItem("firebaseUserKey"),
      id: localStorage.getItem("userId"),
      organizationId: localStorage.getItem("userOrganizationId"),
      refCode: localStorage.getItem("userRefCode"),
    };
  }

  clearUserData() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userImage");
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userDialCode");
    localStorage.removeItem("firebaseUserKey");
    localStorage.removeItem("userId");
    localStorage.removeItem("userOrganizationId");
    localStorage.removeItem("userRefCode");
  }
}

export const authService = new AuthService();
