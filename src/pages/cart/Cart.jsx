import React from 'react';
import { motion } from 'framer-motion';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/navbar/BottomNav';

const Cart = () => {
  const navigate = useNavigate();

  const cartData = {
    package: {
      name: 'VVIP Package',
      price: 180.00,
      type: 'Sedan',
      image: 'https://placehold.co/400'
    },
    taxes: 9.15,
    serviceCharges: 3.00
  };

  const total = cartData.package.price + cartData.taxes + cartData.serviceCharges;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24 sm:pb-8">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-700"
          >
            <IoArrowBack size={24} />
          </button>
          <h1 className="text-xl font-semibold">Cart</h1>
        </div>
        <button 
          className="text-blue-500 text-sm font-medium"
          onClick={() => {/* Clear cart logic */}}
        >
          Clear cart
        </button>
      </div>

      {/* Cart Content */}
      <div className="p-4 space-y-4">
        {/* Package Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-4 shadow-sm"
        >
          <div className="flex gap-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden">
              <img 
                src={cartData.package.image} 
                alt={cartData.package.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{cartData.package.name}</h3>
                  <p className="text-sm text-gray-500">{cartData.package.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-500">
                    AED {cartData.package.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">/Sedan</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Task Description */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-4 shadow-sm"
        >
          <button className="w-full text-center text-blue-500 font-medium">
            Add Task Description
          </button>
        </motion.div>

        {/* Schedule Date and Time */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-sm"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Schedule Date and Time</h3>
              <p className="text-sm text-gray-500">No date time added</p>
            </div>
            <button className="text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Bill Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 shadow-sm"
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Sub total</span>
              <span className="font-medium">AED {cartData.package.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Taxes and Fee</span>
              <span className="font-medium">AED {cartData.taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Service charges</span>
              <span className="font-medium">AED {cartData.serviceCharges.toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">Amount Payable</span>
                <span className="font-semibold text-blue-500">AED {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t md:bottom-0">
        <button 
          className="w-full bg-blue-500 text-white py-3 rounded-full font-medium
                     hover:bg-blue-600 transition-colors duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Cart;
