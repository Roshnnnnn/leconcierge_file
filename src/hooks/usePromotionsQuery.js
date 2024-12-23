import { useQuery } from '@tanstack/react-query';
import safeAPI from '../services/apiService';
import { toast } from 'react-toastify';

export const usePromotionsQuery = () => {
  return useQuery({
    queryKey: ['promotions'],
    queryFn: async () => {
      try {
        const response = await safeAPI.home.getPromotions();
        if (response.data.success) {
          return {
            success: true,
            data: response.data.oData.list,
            showModal: true
          };
        }
        return {
          success: true,
          data: [],
          showModal: false
        };
      } catch (error) {
        toast.error(error.message || 'Error fetching promotions');
        throw error;
      }
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
