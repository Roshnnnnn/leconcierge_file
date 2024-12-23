import { useQuery, useQueryClient } from '@tanstack/react-query';
import { safeAPI } from '../services/apiService';
import { toast } from 'react-toastify';

// Query keys
export const categoryKeys = {
  all: ['categories'],
  details: (id) => [...categoryKeys.all, 'details', id],
};

export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: async () => {
      try {
        const response = await safeAPI.home.getServiceCategories();
        if (response.success) {
          return response.data;
        }
        throw new Error(response.error || 'Failed to fetch categories');
      } catch (error) {
        toast.error(error.message || 'Error fetching categories', {
          position: "top-right",
          autoClose: 3000
        });
        throw error;
      }
    }
  });
};

export const useCategoryDetails = (id) => {
  return useQuery({
    queryKey: categoryKeys.details(id),
    queryFn: async () => {
      try {
        const response = await safeAPI.home.getServiceCategoryDetails(id);
        if (response.success) {
          return response.data;
        }
        throw new Error(response.error || 'Failed to fetch category details');
      } catch (error) {
        toast.error(error.message || 'Error fetching category details', {
          position: "top-right",
          autoClose: 3000
        });
        throw error;
      }
    },
    enabled: !!id // Only fetch when id is available
  });
};

// Hook for clearing category details
export const useClearCategoryDetails = () => {
  const queryClient = useQueryClient();
  
  return () => {
    // Remove all category details queries from the cache
    queryClient.removeQueries({ 
      queryKey: ['categories', 'details'],
      exact: false 
    });
  };
};
