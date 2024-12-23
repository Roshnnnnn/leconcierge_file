import { getFaqs } from './api';

export const fetchFaqData = async () => {
  try {
    const data = await getFaqs();
    return {
      success: true,
      data: data.oData || [],
      error: null
    };
  } catch (error) {
    console.error('Error in fetchFaqData:', error);
    return {
      success: false,
      data: [],
      error: 'Failed to load FAQs. Please try again later.'
    };
  }
};

// Add more FAQ-related functions here if needed
export const filterFaqs = (faqs, searchTerm) => {
  if (!searchTerm) return faqs;
  
  return faqs.filter(faq => 
    faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const sortFaqsByTitle = (faqs) => {
  return [...faqs].sort((a, b) => a.title.localeCompare(b.title));
};
