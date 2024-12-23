import { safeAPI } from './apiService';

export const bookingService = {
  fetchBookingActivities: async () => {
    try {
      const access_token = localStorage.getItem("accessToken");
      if (!access_token) {
        throw new Error("Access Token is required");
      }
      
      const response = await safeAPI.booking.getBookingActivities(access_token);
      if (response.success) {
        return {
          success: true,
          data: response.data.oData.activities
        };
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: error.response?.status
      };
    }
  },

  navigateToBookingDetails: (navigate, item) => {
    navigate(`/account/booking/${item.id}`, { 
      state: { 
        activityId: item.id,
        activityType: item.type 
      } 
    });
  }
};

export default bookingService;
