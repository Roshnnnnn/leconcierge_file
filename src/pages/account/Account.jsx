import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiWallet } from "react-icons/bi";
import { FiUser, FiPhone, FiMapPin, FiGlobe, FiLogOut } from "react-icons/fi";
import Booking from "../booking/Booking";
import { SlCalender } from "react-icons/sl";
import { motion, AnimatePresence } from "framer-motion";
import { safeAPI } from "../../services/apiService";
import { bookingService } from "../../services/bookingService";
import { userService } from "../../services/userService";

const Account = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const [userData, setUserData] = useState(userService.getUserProfile());
  const [showProfile, setShowProfile] = useState(true);
  const [showChangeNumber, setShowChangeNumber] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [showWallet, setShowWallet] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [booking, setBooking] = useState([]);
  const [activityId, setActivityId] = useState(null);
  const [activeSection, setActiveSection] = useState('profile');

  useEffect(() => {
    setUserData(userService.getUserProfile());
  }, []);

  const handleLogout = async () => {
    try {
      const access_token = localStorage.getItem("accessToken");
      if (!access_token) {
        console.error(
          "Access Token is required but not found in localStorage."
        );
        return;
      }
      console.log("Token used for logout:", access_token);
      const response = await safeAPI.auth.logout(access_token);
      console.log("Logout successful:", response.data);
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleShowProfile = () => {
    setShowProfile(true);
    setShowChangeNumber(false);
    setShowWallet(false);
    setShowBooking(false);
    setActiveSection('profile');
  };

  const handleChangeNumber = () => {
    const phone = userService.getUserProfile().phone;
    setNewPhoneNumber(phone);
    setShowProfile(false);
    setShowChangeNumber(true);
    setShowWallet(false);
    setShowBooking(false);
    setActiveSection('phone');
  };

  const handleUpdateNumber = () => {
    const updatedUserData = {
      ...userData,
      phone: newPhoneNumber
    };
    userService.updateUserProfile(updatedUserData);
    setUserData(updatedUserData);
    setShowChangeNumber(false);
  };

  const handleShowWallet = () => {
    setShowProfile(false);
    setShowChangeNumber(false);
    setShowWallet(true);
    setShowBooking(false);
    setActiveSection('wallet');
  };

  const handleShowBooking = async () => {
    setShowProfile(false);
    setShowChangeNumber(false);
    setShowWallet(false);
    setShowBooking(true);
    setActiveSection('booking');

    const result = await bookingService.fetchBookingActivities();
    if (result.success) {
      setBooking(result.data);
      result.data.forEach((activity) => {
        setActivityId(activity.id);
      });
    } else {
      console.error("Error fetching booking data:", result.error);
      if (result.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const handleBookingClick = (item) => {
    setActivityId(item.id);
    bookingService.navigateToBookingDetails(navigate, item);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24 sm:pb-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <motion.div
              className="w-full lg:w-1/4 bg-gray-50 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
                <img
                  src={
                    userData.image ||
                    "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png"
                  }
                  alt="User"
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                    {userData.userName}
                  </h2>
                  <p className="text-sm text-gray-500 truncate">{userData.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={handleShowProfile}
                  className={`w-full px-4 py-2 text-left rounded-lg transition-colors duration-200 flex items-center ${
                    activeSection === 'profile'
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <FiUser className="mr-2" /> My Profile
                </button>
                <button
                  onClick={handleChangeNumber}
                  className={`w-full px-4 py-2 text-left rounded-lg transition-colors duration-200 flex items-center ${
                    activeSection === 'phone'
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <FiPhone className="mr-2" /> Change Number
                </button>
                <button
                  onClick={handleShowWallet}
                  className={`w-full px-4 py-2 text-left rounded-lg transition-colors duration-200 flex items-center ${
                    activeSection === 'wallet'
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <BiWallet className="mr-2" /> My Wallet
                </button>
                <button
                  onClick={handleShowBooking}
                  className={`w-full px-4 py-2 text-left rounded-lg transition-colors duration-200 flex items-center ${
                    activeSection === 'booking'
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <SlCalender className="mr-2" /> My Bookings
                </button>
                <button 
                  onClick={() => setActiveSection('address')}
                  className={`w-full px-4 py-2 text-left rounded-lg transition-colors duration-200 flex items-center ${
                    activeSection === 'address'
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <FiMapPin className="mr-2" /> Saved Addresses
                </button>
                <button 
                  onClick={() => setActiveSection('language')}
                  className={`w-full px-4 py-2 text-left rounded-lg transition-colors duration-200 flex items-center ${
                    activeSection === 'language'
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <FiGlobe className="mr-2" /> Language
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200 mt-4 flex items-center"
                >
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </nav>
            </motion.div>

            {/* Main Content */}
            <motion.div
              className="flex-1 p-4 sm:p-6 lg:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
                Welcome back, {userData.firstName}!
              </h1>

              {showProfile && (
                <AnimatePresence>
                  <motion.div
                    className="space-y-4 sm:space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                        Personal Information
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            First Name
                          </label>
                          <p className="mt-1 text-lg font-medium text-gray-900">
                            {userData.firstName}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Last Name
                          </label>
                          <p className="mt-1 text-lg font-medium text-gray-900">
                            {userData.lastName}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Phone
                          </label>
                          <p className="mt-1 text-lg font-medium text-gray-900">
                            {userData.phone}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Email
                          </label>
                          <p className="mt-1 text-lg font-medium text-gray-900 truncate max-w-[200px]">
                            {userData.email}
                          </p>
                        </div>
                      </div>
                      <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                        Update Profile
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              {showChangeNumber && (
                <AnimatePresence>
                  <motion.div
                    className="max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                        Change Phone Number
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Current Number
                          </label>
                          <p className="text-lg font-medium text-gray-900">
                            {userData.phone}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            New Number
                          </label>
                          <input
                            type="text"
                            value={newPhoneNumber}
                            onChange={(e) => setNewPhoneNumber(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter new phone number"
                          />
                        </div>
                        <button
                          onClick={handleUpdateNumber}
                          className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                        >
                          Update Number
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              {showWallet && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-6 sm:mb-8">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                          <BiWallet className="mr-2 text-blue-500" size={24} />{" "}
                          My Wallet
                        </h2>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            Available Balance
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            0.00 AED
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center py-8">
                        <img
                          src="https://img.freepik.com/free-photo/3d-hand-using-online-banking-app-smartphone_107791-16639.jpg?t=st=1734521047~exp=1734524647~hmac=93621eceff3e4e800d22f43905a1f92800ef97aac0f60a60dc16e5ddbfb146e3&w=740"
                          alt="Empty Wallet"
                          className="w-32 h-32 object-cover rounded-lg mb-4"
                        />
                        <p className="text-gray-500 mb-6">
                          Your wallet is currently empty
                        </p>
                        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                          Recharge Wallet
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              {showBooking && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                        My Bookings
                      </h2>
                      {booking.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                          {booking.map((item, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ scale: 1.02 }}
                              className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                              onClick={() => handleBookingClick(item)}
                            >
                              <div className="flex items-start justify-between mb-3 sm:mb-4">
                                <img
                                  src={item.logo}
                                  alt=""
                                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                                />
                                <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 text-white rounded-full text-sm sm:text-base font-semibold">
                                  {item.count}
                                </span>
                              </div>
                              <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">
                                {item.capitalized_name}
                              </h3>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-gray-500">No bookings found</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
