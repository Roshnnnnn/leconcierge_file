import safeAPI from './apiService';
import { toast } from 'react-toastify';

const promotionService = {
  fetchPromotions: async () => {
    try {
      const response = await safeAPI.home.getPromotions();
      if (response?.data?.data?.oData?.list) {
        return {
          success: true,
          data: response.data.data.oData.list,
          showModal: true
        };
      }
      return {
        success: true,
        data: [],
        showModal: false
      };
    } catch (error) {
      console.error('Error fetching promotions:', error);
      toast.error('Failed to fetch promotions', {
        position: "top-right",
        autoClose: 3000
      });
      return {
        success: false,
        error: error.message,
        showModal: false
      };
    }
  },

  processBanners: {
    processCustomBanners: (custom_banner_list) => {
      if (!custom_banner_list || custom_banner_list.length === 0) return [];
      
      const banners = [];
      custom_banner_list.forEach((innerArray) => {
        if (Array.isArray(innerArray)) {
          innerArray.forEach((item) => {
            if (item.hasOwnProperty("id")) {
              banners.push(item);
            }
          });
        }
      });
      return banners;
    },

    processNewOfferBanners: (new_offer) => {
      if (!new_offer || new_offer.length === 0) return [];
      
      const banners = [];
      new_offer.forEach((offer) => {
        if (Array.isArray(offer.content)) {
          offer.content.forEach((item) => {
            if (item.hasOwnProperty("id")) {
              banners.push(item);
            }
          });
        }
      });
      return banners;
    },

    processMixedBanners: (mixed) => {
      if (!mixed || mixed.length === 0) return [];
      
      const banners = [];
      mixed.forEach((offer) => {
        if (Array.isArray(offer.content)) {
          offer.content.forEach((item) => {
            if (item.hasOwnProperty("id")) {
              banners.push(item);
            }
          });
        }
      });
      return banners;
    }
  },

  startBannerRotation: (bannerLength, callback, interval = 3000) => {
    if (bannerLength === 0) return null;
    
    const rotationInterval = setInterval(() => {
      callback((prevIndex) => (prevIndex + 1) % bannerLength);
    }, interval);

    return rotationInterval;
  }
};

export default promotionService;
