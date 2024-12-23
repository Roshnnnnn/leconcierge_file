import React from 'react';
import { useHomeActivityTypes, useHomeServiceData } from '../../hooks/useHomeQueries';
import { usePromotionsQuery } from '../../hooks/usePromotionsQuery';
import { toast } from 'react-toastify';
import Header from "./Header";
import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const {
    data: activityData,
    isLoading: isLoadingActivity,
    error: activityError
  } = useHomeActivityTypes();

  const {
    data: serviceData,
    isLoading: isLoadingService,
    error: serviceError
  } = useHomeServiceData();

  const {
    data: promotionsData,
    isLoading: isLoadingPromotions,
    error: promotionsError
  } = usePromotionsQuery();

  const [modalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [customer_banners, setCustomer_banners] = useState([]);
  const [newOffer_banners, setNewOffer_banners] = useState([]);
  const [mixed_banners, setMixed_banners] = useState([]);

  // Handle promotions modal
  useEffect(() => {
    if (promotionsData?.success && promotionsData?.data?.length > 0) {
      setModalVisible(true);
    }
  }, [promotionsData]);

  // Handle banners
  useEffect(() => {
    if (activityData?.banners?.length > 0) {
      setCustomer_banners(activityData.banners);
    }
  }, [activityData]);

  useEffect(() => {
    if (serviceData?.newOffers?.length > 0) {
      setNewOffer_banners(serviceData.newOffers);
    }
  }, [serviceData]);

  useEffect(() => {
    if (activityData?.mixedItems?.length > 0) {
      setMixed_banners(activityData.mixedItems);
    }
  }, [activityData]);

  // Banner rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % customer_banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [customer_banners]);

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  if (isLoadingActivity || isLoadingService || isLoadingPromotions) {
    return <div>Loading...</div>;
  }

  if (activityError) {
    return <div>Error loading activities: {activityError.message}</div>;
  }

  if (serviceError) {
    return <div>Error loading services: {serviceError.message}</div>;
  }

  if (promotionsError) {
    return <div>Error loading promotions: {promotionsError.message}</div>;
  }

  return (
    <motion.div
      className={`mx-2 sm:mx-4 md:mx-6 lg:mx-8 pb-6 sm:pb-8 lg:pb-10 ${
        modalVisible ? "blurred" : ""
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />

      {modalVisible && promotionsData?.data && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
          onClick={handleBackgroundClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="rounded-lg shadow-lg w-full max-w-lg relative"
            initial={{ scale: 0.5, y: -100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.span
              className="absolute top-2 right-2 sm:top-4 sm:right-4 cursor-pointer text-black text-3xl sm:text-4xl z-10"
              onClick={closeModal}
              whileTap={{ scale: 0.9 }}
            >
              <IoIosCloseCircleOutline />
            </motion.span>
            <motion.div
              className="relative w-full overflow-hidden rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentImageIndex * 100}%)`,
                }}
              >
                {promotionsData.data.map((item, index) => (
                  <motion.img
                    key={index}
                    src={item.image_url}
                    alt={`Promotion ${index + 1}`}
                    className="w-full h-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Customer Banners */}
        {customer_banners.length > 0 && (
          <Swiper
            spaceBetween={16}
            slidesPerView={1.0}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="mt-4 px-2"
            breakpoints={{
              0: {
                slidesPerView: 1.2,
                spaceBetween: 12,
              },
              480: {
                slidesPerView: 1.4,
                spaceBetween: 16,
              }
            }}
          >
            {customer_banners.map((banner, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="relative rounded-2xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-[16/9]">
                    <img
                      src={banner.banner_image}
                      alt="Customer Banner"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* New Offers */}
        {newOffer_banners.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                New Offers
              </h2>
            </div>
            <Swiper
              spaceBetween={16}
              slidesPerView="auto"
              className="mt-4"
              breakpoints={{
                0: {
                  slidesPerView: 1.2,
                },
                640: {
                  slidesPerView: 2.2,
                },
                1024: {
                  slidesPerView: 2.5,
                },
              }}
            >
              {newOffer_banners.map((banner, index) => (
                <SwiperSlide key={index} className="h-full">
                  <motion.div
                    className="relative bg-white rounded-3xl overflow-hidden shadow-sm cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="aspect-[16/9]">
                      <img
                        src={banner.banner_image}
                        alt="New Offer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Mixed Banners */}
        {mixed_banners.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Home Our Care
              </h2>
            </div>
            <Swiper
              spaceBetween={16}
              slidesPerView="auto"
              className="mt-4"
              breakpoints={{
                0: {
                  slidesPerView: 2.2,
                },
                640: {
                  slidesPerView: 3.2,
                },
                1024: {
                  slidesPerView: 4.2,
                },
              }}
            >
              {mixed_banners.map((banner, index) => (
                <SwiperSlide key={index} className="h-full">
                  <motion.div
                    className="relative bg-white rounded-3xl overflow-hidden shadow-sm cursor-pointer group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative aspect-square w-full">
                      <img
                        src={banner.image}
                        alt={banner.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-800 truncate">
                        {banner.name}
                      </h3>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Home;
