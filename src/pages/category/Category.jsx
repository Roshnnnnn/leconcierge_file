import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCategories, useCategoryDetails, useClearCategoryDetails } from "../../hooks/useCategoryQueries";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Category = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError
  } = useCategories();

  const {
    data: categoryDetails,
    isLoading: detailsLoading,
    error: detailsError
  } = useCategoryDetails(selectedSubCategory?.id);

  const clearCategoryDetails = useClearCategoryDetails();

  useEffect(() => {
    if (id && categories) {
      const category = categories.find((cat) => cat.id === parseInt(id));
      if (category) {
        setSelectedCategory(category);
      }
    }
  }, [id, categories]);

  useEffect(() => {
    return () => {
      clearCategoryDetails();
    };
  }, []);

  if (categoriesLoading) {
    return <div>Loading categories...</div>;
  }

  if (categoriesError) {
    return <div>Error loading categories: {categoriesError.message}</div>;
  }

  const handleCategoryClick = (category) => {
    console.log("Selected Category ID:", category.id);
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      clearCategoryDetails();
    } else {
      setSelectedCategory(category);
      setSelectedSubCategory(null);
      clearCategoryDetails();
    }
  };

  const handleSubCategoryClick = (subCategory) => {
    console.log("Selected SubCategory ID:", subCategory.id);
    if (selectedSubCategory?.id === subCategory.id) {
      setSelectedSubCategory(null);
      clearCategoryDetails();
    } else {
      setSelectedSubCategory(subCategory);
    }
  };

  const handleServiceClick = (service) => {
    if (selectedService?.id === service.id) {
      setSelectedService(null);
    } else {
      setSelectedService(service);
      navigate(`/booking/${service.id}`);
    }
  };

  return (
    <motion.div
      className="mx-2 sm:mx-4 md:mx-6 lg:mx-8 pb-6 sm:pb-8 lg:pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
        Categories
      </h1>

      <Swiper
        spaceBetween={12}
        slidesPerView="auto"
        className="mb-6 sm:mb-8"
        breakpoints={{
          640: { spaceBetween: 16 },
          768: { spaceBetween: 20 },
        }}
      >
        {categories?.map((category) => (
          <SwiperSlide key={category.id} className="max-w-[100px] sm:max-w-[120px] md:max-w-[140px]">
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-sm cursor-pointer group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="relative aspect-square w-full">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center p-2">
                <h3 className="text-xs sm:text-sm font-medium text-white text-center">
                  {category.name}
                </h3>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 sm:mb-8"
          >
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              {selectedCategory.name} Sub-Categories
            </h2>
            {selectedCategory.sub_categories?.length > 0 ? (
              <Swiper
                spaceBetween={12}
                slidesPerView="auto"
                breakpoints={{
                  640: { spaceBetween: 16 },
                  768: { spaceBetween: 20 },
                }}
              >
                {selectedCategory.sub_categories.map((subCategory) => (
                  <SwiperSlide
                    key={subCategory.id}
                    className="max-w-[100px] sm:max-w-[120px] md:max-w-[140px]"
                  >
                    <motion.div
                      className="relative rounded-2xl overflow-hidden shadow-sm cursor-pointer group"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleSubCategoryClick(subCategory)}
                    >
                      <div className="relative aspect-square w-full">
                        <img
                          src={subCategory.image}
                          alt={subCategory.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center p-2">
                        <h3 className="text-xs sm:text-sm font-medium text-white text-center">
                          {subCategory.name}
                        </h3>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <p className="text-gray-500">No sub-categories available</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedSubCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              {selectedSubCategory.name} Services
            </h2>
            {detailsLoading ? (
              <div>Loading services...</div>
            ) : detailsError ? (
              <div>Error: {detailsError.message}</div>
            ) : categoryDetails?.service_list ? (
              <Swiper
                spaceBetween={12}
                slidesPerView="auto"
                breakpoints={{
                  640: { spaceBetween: 16 },
                  768: { spaceBetween: 20 },
                }}
              >
                {categoryDetails.service_list.map((service) => (
                  <SwiperSlide
                    key={service.id}
                    className="max-w-[100px] sm:max-w-[120px] md:max-w-[140px]"
                  >
                    <motion.div
                      className="relative rounded-2xl overflow-hidden shadow-sm cursor-pointer group"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleServiceClick(service)}
                    >
                      <div className="relative aspect-square w-full">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center p-2">
                        <h3 className="text-xs sm:text-sm font-medium text-white text-center">
                          {service.name}
                        </h3>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <p className="text-gray-500">No services available</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Category;
