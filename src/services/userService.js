import { toast } from 'react-toastify';

export const userService = {
  getUserProfile: () => {
    try {
      return {
        email: localStorage.getItem("userEmail") || "",
        firstName: localStorage.getItem("userFirstName") || "",
        lastName: localStorage.getItem("userLastName") || "",
        userName: localStorage.getItem("userName") || "",
        phone: localStorage.getItem("userPhone") || "",
        image: localStorage.getItem("userImage") || "",
      };
    } catch (error) {
      toast.error('Error accessing user data', {
        position: "top-right",
        autoClose: 3000
      });
      return {
        email: "",
        firstName: "",
        lastName: "",
        userName: "",
        phone: "",
        image: "",
      };
    }
  }
};

export default userService;
