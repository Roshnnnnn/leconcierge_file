import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { safeAPI } from "../../services/apiService";

const Booking = () => {
  const location = useLocation();
  const [activityId, setActivityId] = useState(null);
  const [activityType, setActivityType] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setActivityId(location.state?.activityId);
    setActivityType(location.state?.activityType);
  }, [location.state]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const access_token = localStorage.getItem("accessToken");
      
      try {
        let response;
        if (activityType === 'service') {
          response = await safeAPI.booking.getServiceOrders(access_token);
          if (response.success) {
            setOrderList(response.data.oData || []);
          } else {
            setError(response.error);
          }
        } else if (activityType === 'product') {
          response = await safeAPI.booking.getProductOrders(access_token);
          if (response.success) {
            const deliveryOrders = response.data.oData.filter(
              (order) => order.order_type_text === "Delivery"
            );
            setOrderList(deliveryOrders);
          } else {
            setError(response.error);
          }
        }
      } catch (error) {
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (activityType) {
      fetchData();
    }
  }, [activityType]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'bg-[#40A0FF] text-white';
      case 'pending':
        return 'bg-[#FFB800] text-white';
      case 'canceled':
      case 'cancelled':
        return 'bg-[#FF4040] text-white';
      case 'ready for delivery':
      case 'completed':
        return 'bg-[#4CAF50] text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-[#F8F9FA] pt-20 pb-24 sm:pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <motion.div 
          className="flex items-center mb-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button 
            onClick={() => window.history.back()} 
            className="mr-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          <h2 className="text-xl font-bold text-black">
            {activityType === 'service' ? 'Service Bookings' : 'Product Orders'}
          </h2>
        </motion.div>

        <AnimatePresence>
          <motion.div 
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {loading ? (
              <motion.div 
                className="text-center py-8 sm:py-12 bg-white rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-500">Loading...</p>
              </motion.div>
            ) : error ? (
              <motion.div 
                className="text-center py-8 sm:py-12 bg-white rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-500">{error}</p>
              </motion.div>
            ) : orderList.length > 0 ? (
              orderList.map((order, index) => (
                <motion.div
                  key={order.order_id}
                  className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm cursor-pointer"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  custom={index}
                  layout
                  onClick={()=>{
                    const currentPath = location.pathname;
                    navigate(`${currentPath}/details/${order.order_id}/${activityType}`);
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        {activityType === 'product' && (
                          <motion.img
                            src={order.products?.[0]?.image || order.image || 'https://leconciergeapp.ae/app/public/images/default.png'}
                            alt="Product"
                            className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                          />
                        )}
                        <div>
                          <motion.h3 
                            className="text-[#1A1A1A] font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {activityType === 'service' ? `#LC-SER${order.order_id}` : `#LC-${order.order_id}`}
                          </motion.h3>
                          <motion.div 
                            className="flex items-center mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <span className="text-[#1A1A1A] font-medium mr-1">AED</span>
                            <span className="text-[#40A0FF]">{order.total}</span>
                          </motion.div>
                        </div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <span className={`px-4 py-1 rounded-full text-sm ${getStatusColor(order.status_text)}`}>
                          {order.status_text}
                        </span>
                      </motion.div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <motion.p 
                        className="text-[#808080] text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {order.order_date}
                      </motion.p>
                      <motion.button 
                        className="text-[#40A0FF] text-sm font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          const currentPath = location.pathname;
                          navigate(`${currentPath}/details/${order.order_id}/${activityType}`);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="text-center py-8 sm:py-12 bg-white rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-500">No bookings found</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Booking;
