import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';
import { IoCloseCircle } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Mock suggestions - replace with actual API call
  const mockSuggestions = [
    { id: 1, title: 'Home Cleaning', category: 'Cleaning', price: '150', image: 'https://images.pexels.com/photos/4107112/pexels-photo-4107112.jpeg' },
    { id: 2, title: 'Car Wash', category: 'Automotive', price: '80', image: 'https://images.pexels.com/photos/6873089/pexels-photo-6873089.jpeg' },
    { id: 3, title: 'AC Repair', category: 'Maintenance', price: '200', image: 'https://images.pexels.com/photos/4108840/pexels-photo-4108840.jpeg' },
    { id: 4, title: 'Pest Control', category: 'Home Services', price: '250', image: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg' },
  ];

  useEffect(() => {
    if (searchQuery) {
      const filtered = mockSuggestions.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleServiceClick = (service) => {
    navigate('/search', {
      state: {
        query: searchQuery,
        results: suggestions,
        selectedService: service
      }
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white">
        <div className="flex items-center p-4 border-b">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FiArrowLeft className="text-xl" />
          </button>
          <div className="flex-1 flex items-center ml-2 relative">
            <FiSearch className="absolute left-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for services..."
              className="w-full pl-10 pr-10 py-2 border rounded-full focus:outline-none focus:border-blue-500"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-gray-400 hover:text-gray-600"
              >
                <IoCloseCircle className="text-xl" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-[calc(100vh-80px)] overflow-y-auto">
          {suggestions.length > 0 ? (
            <div className="py-2">
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleServiceClick(item)}
                >
                  <div className="flex items-center">
                    <FiSearch className="text-gray-400 mr-3" />
                    <div>
                      <h3 className="text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="p-4 text-center text-gray-500">
              No results found for "{searchQuery}"
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Start typing to search...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
