import React from 'react';
import { useLocation } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import BookNowButton from '../../components/buttons/BookNowButton';

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = location.state?.query || '';
  const searchResults = location.state?.results || [];

  const handleBookService = (service) => {
    // Add your cart logic here
    console.log('Adding to cart:', service);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Search Results for "{searchQuery}"
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {searchResults.length} services found
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button className="flex items-center text-blue-500 hover:text-blue-600">
              <FiFilter className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <img
                src={service.image || 'https://via.placeholder.com/300x200'}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{service.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-500 font-medium">
                    {service.price} AED
                  </span>
                  <BookNowButton 
                    onBook={() => handleBookService(service)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {searchResults.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <img
              src="https://illustrations.popsy.co/gray/success.svg"
              alt="No results"
              className="w-48 h-48 mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No services found
            </h2>
            <p className="text-gray-500">
              Try adjusting your search or filters to find what you're looking for
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
