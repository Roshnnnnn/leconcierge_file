import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { safeAPI } from "../../services/apiService";

const FaqItem = ({ faq, isOpen, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-4 overflow-hidden"
  >
    <div className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
      <button
        onClick={onClick}
        className="w-full p-4 sm:p-5 text-left flex justify-between items-center gap-4 bg-white hover:bg-gray-50 transition-colors duration-200"
      >
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 flex-1 pr-4">
          {faq.title}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-primary flex-shrink-0"
        >
          <IoIosArrowDown size={24} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {faq.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);

const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="animate-pulse">
        <div className="h-16 bg-gray-200 rounded-lg"></div>
      </div>
    ))}
  </div>
);

const Faq = () => {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const loadFaqs = async () => {
      setLoading(true);
      const { success, data, error: apiError } = await safeAPI.content.getFaqs();
      
      if (success) {
        setFaqData(data.oData || []);
      } else {
        setError(apiError);
      }
      setLoading(false);
    };

    loadFaqs();
  }, []);

  const toggleDescription = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto"
          >
            Find answers to common questions about Le concierge services and how we can help you.
          </motion.p>
        </div>

        {/* FAQ Content */}
        <div className="space-y-2 sm:space-y-4">
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            faqData?.map((faq, index) => (
              <FaqItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => toggleDescription(index)}
              />
            ))
          )}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Still have questions?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              We're here to help. Contact our support team for assistance.
            </p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200">
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Faq;
