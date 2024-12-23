import { useQuery } from '@tanstack/react-query';
import safeAPI from '../services/apiService';
import { toast } from 'react-toastify';

export const useHomeActivityTypes = () => {
  return useQuery({
    queryKey: ['homeActivityTypes'],
    queryFn: async () => {
      try {
        const response = await safeAPI.home.getHomeActivityTypes();
        if (response.data.success) {
          return {
            banners: response.data.oData.banner,
            activities: response.data.oData.activities,
            serviceCategories: response.data.oData.serviceCategories
          };
        }
        throw new Error(response.data.error || 'Failed to fetch activity types');
      } catch (error) {
        toast.error(error.message || 'Error fetching activity types');
        throw error;
      }
    }
  });
};

export const useHomeServiceData = () => {
  return useQuery({
    queryKey: ['homeServiceData'],
    queryFn: async () => {
      try {
        const response = await safeAPI.home.getHomeServiceData();
        if (response.data.success) {
          const dynamicList = response.data.oData.dynamic_list;

          const customBannerList = dynamicList
            .filter(item => item.type === 'custom_banner_list')
            .map(item => item.content);

          const newOffers = dynamicList
            .filter(item => item.type === 'new_offer');

          const mixedItems = dynamicList
            .filter(item => item.type === 'mixed');

          return {
            customBannerList,
            newOffers,
            mixedItems
          };
        }
        throw new Error(response.data.error || 'Failed to fetch service data');
      } catch (error) {
        toast.error(error.message || 'Error fetching service data');
        throw error;
      }
    }
  });
};
