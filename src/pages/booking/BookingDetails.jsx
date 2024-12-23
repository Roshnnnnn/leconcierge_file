import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { safeAPI } from "../../services/apiService";

const BookingDetails = () => {
  const { orderId, type } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId || !type) {
        navigate(-1);
        return;
      }

      setLoading(true);
      const access_token = localStorage.getItem("accessToken");
      
      try {
        let response;
        if (type === 'service') {
          response = await safeAPI.booking.getServiceOrderDetails(access_token, orderId);
        } else {
          response = await safeAPI.booking.getProductOrderDetails(access_token, orderId);
        }

        if (response.success) {
          setOrderDetails(response.data.oData);
        } else {
          setError(response.error);
        }
      } catch (error) {
        setError("Failed to fetch order details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, type, navigate]);

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    setLoading(true);
    const access_token = localStorage.getItem("accessToken");
    
    try {
      const response = await safeAPI.booking.cancelOrder(access_token, orderId);
      if (response.success) {
        // Refresh order details
        const updatedResponse = type === 'service' 
          ? await safeAPI.booking.getServiceOrderDetails(access_token, orderId)
          : await safeAPI.booking.getProductOrderDetails(access_token, orderId);
        
        if (updatedResponse.success) {
          setOrderDetails(updatedResponse.data.oData);
        }
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError("Failed to cancel order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'accepted':
        return 'bg-blue-500 text-white';
      case 'completed':
        return 'bg-green-500 text-white';
      case 'cancelled':
      case 'canceled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      className="bg-[#F8F9FA] min-h-screen pb-20 md:pb-4 mt-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 max-w-7xl pb-24 sm:pb-8">
        <motion.div 
          className="flex items-center mb-6 sticky top-0 bg-[#F8F9FA] py-4 z-10"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button 
            onClick={() => navigate(-1)} 
            className="mr-4 hover:bg-gray-100 p-2 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          <h2 className="text-2xl font-bold text-black">
            {type === 'service' ? 'Service Details' : 'Order Details'}
          </h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : orderDetails ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Left Column - Order Info */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* Order ID and Status */}
              <div className="bg-white rounded-2xl p-4 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-medium">
                      #{orderDetails.order_number}
                    </h3>
                    <p className="text-blue-500 mt-1 md:mt-2 text-lg md:text-xl">
                      AED {orderDetails.grand_total}
                    </p>
                    <p className="text-sm md:text-base text-gray-500 mt-1">
                      {orderDetails.order_date}
                    </p>
                  </div>
                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-0 w-full sm:w-auto">
                    <span className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-sm md:text-base ${getStatusColor(orderDetails.status_text)}`}>
                      {orderDetails.status_text}
                    </span>
                    <span className="text-sm md:text-base text-gray-500 mt-2">
                      {orderDetails.order_type_text}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-2xl p-4 md:p-6">
                <h4 className="text-lg md:text-xl font-medium mb-4 md:mb-6">Order Items</h4>
                <div className="space-y-4 md:space-y-6">
                  {orderDetails.products?.map((product, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                      <img 
                        src={product.image} 
                        alt={product.product_name}
                        className="w-full sm:w-32 h-48 sm:h-32 rounded-xl object-cover"
                      />
                      <div className="flex-1 w-full">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg md:text-xl font-medium">{product.product_name}</h4>
                            <p className="text-gray-500 mt-1">{product.attribute_name}: {product.attribute_values}</p>
                          </div>
                          <span className={`px-4 py-1.5 rounded-full ${getStatusColor(product.order_status_text)}`}>
                            {product.order_status_text}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            <span className="text-gray-900 font-medium mr-1">AED</span>
                            <span className="text-blue-500 text-lg">{product.price}</span>
                          </div>
                          <p className="text-gray-500">Qty: {product.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Store Info */}
              {orderDetails.store && (
                <div className="bg-white rounded-2xl p-4 md:p-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={orderDetails.store.logo} 
                      alt={orderDetails.store.company_name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-lg md:text-xl font-medium">{orderDetails.store.company_name}</h4>
                      <p className="text-gray-500 mt-2">{orderDetails.store.available_from}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="space-y-4 md:space-y-6">
              {/* Address */}
              <div className="bg-white rounded-2xl p-4 md:p-6">
                <h4 className="text-lg md:text-xl font-medium mb-4 md:mb-6">Delivery Address</h4>
                {orderDetails.address && typeof orderDetails.address === 'object' ? (
                  <div className="space-y-3">
                    <p className="font-medium text-gray-900">{orderDetails.address.full_name}</p>
                    <div className="space-y-2 text-gray-600">
                      <p>{orderDetails.address.building_name}</p>
                      <p>{orderDetails.address.street}</p>
                      <p>{orderDetails.address.location}</p>
                    </div>
                    <p className="text-gray-900 pt-2 font-medium">
                      +{orderDetails.address.dial_code} {orderDetails.address.phone}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600">{orderDetails.address}</p>
                )}
              </div>

              {/* Bill Details */}
              <div className="bg-white rounded-2xl p-4 md:p-6">
                <h4 className="text-lg md:text-xl font-medium mb-6">Bill Details</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sub total</span>
                    <span className="font-medium">AED {orderDetails.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">VAT</span>
                    <span className="font-medium">AED {orderDetails.vat}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Service Charge</span>
                    <span className="font-medium">AED {orderDetails.service_charge}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Shipping Fee</span>
                    <span className="font-medium">AED {orderDetails.shipping_charge}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-xl font-medium">Total Amount</span>
                    <span className="text-xl font-medium text-blue-500">AED {orderDetails.grand_total}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-4 md:p-6">
                <h4 className="text-lg md:text-xl font-medium mb-6">Payment Method</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="font-medium">{orderDetails.payment_mode}</span>
                  </div>
                  {orderDetails.invoice_url && (
                    <a 
                      href={orderDetails.invoice_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 font-medium"
                    >
                      View Invoice
                    </a>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {orderDetails.invoice_url && (
                    <a 
                      href={orderDetails.invoice_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full border-2 border-blue-500 text-blue-500 py-4 rounded-xl font-medium hover:bg-blue-50 text-center"
                    >
                      View Invoice
                    </a>
                  )}
                  <button 
                    className="w-full bg-blue-500 text-white py-4 rounded-xl font-medium hover:bg-blue-600"
                    onClick={() => {
                      if (orderDetails.invoice_url) {
                        navigator.share({
                          title: `Order ${orderDetails.order_number}`,
                          text: 'Check out my order details',
                          url: orderDetails.invoice_url
                        }).catch(() => {
                          // Fallback if Web Share API is not supported
                          window.open(orderDetails.invoice_url, '_blank');
                        });
                      }
                    }}
                  >
                    Share Invoice
                  </button>
                </div>

                {orderDetails.status === '0' && (
                  <button 
                    className="w-full bg-red-500 text-white py-4 rounded-xl font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleCancelOrder}
                    disabled={loading}
                  >
                    {loading ? 'Canceling...' : 'Cancel Order'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500">No details found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BookingDetails;