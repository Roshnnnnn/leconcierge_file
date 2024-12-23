import { useState, useEffect, useRef } from "react";
import {
  FaShoppingCart,
  FaRegUserCircle,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import logo from "../../assets/Logo.png";
import { IoMdNotifications } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import BottomNav from "./BottomNav";
import SearchOverlay from "../search/SearchOverlay";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const sidebarRef = useRef(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserEmail = localStorage.getItem("userEmail");
    if (storedUserName) setUserName(storedUserName);
    if (storedUserEmail) setUserEmail(storedUserEmail);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest('.menu-button')
      ) {
        setIsMenuOpen(false);
      }
      if (!event.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="relative flex flex-col md:flex-row justify-between items-center bg-blue-50 p-4 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center w-full md:w-auto">
          <div className="flex items-center ml-4 md:ml-10">
            <Link to={"/"}>
              <img src={logo} alt="Logo" className="h-8 w-8 md:h-10 md:w-10" />
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 cursor-pointer text-xl menu-button"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <div className="hidden md:flex flex-grow justify-center mx-4">
          <div 
            onClick={() => setIsSearchOpen(true)}
            className="border rounded-xl p-2 flex-grow-0 w-64 flex items-center cursor-pointer bg-white"
          >
            <FiSearch className="text-gray-400 mr-2" />
            <span className="text-gray-400">Search for Services</span>
          </div>
        </div>

        {/* Mobile Search Button */}
        <div className="md:hidden absolute right-16">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-gray-600"
          >
            <FiSearch className="text-xl" />
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-12 mr-10 relative">
          <button className="text-gray-600 cursor-pointer text-2xl">
            <IoMdNotifications />
          </button>
          <button className="text-gray-600 cursor-pointer text-2xl">
            <Link to={"/cart"}>
              <FaShoppingCart className="cart-icon" />
            </Link>
          </button>
          <div className="relative dropdown-container">
            <button
              className="text-gray-600 cursor-pointer text-2xl"
              onClick={toggleDropdown}
            >
              <FaRegUserCircle />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-0 right-0 mt-12 w-48 bg-white border border-gray-200 rounded shadow-md z-10 overflow-hidden">
                <div className="px-4 py-2">
                  <p className="font-semibold truncate">{userName || "Demo "}</p>
                  <p className="text-sm text-gray-600 truncate">
                    {userEmail || "demo@demo.com"}
                  </p>
                </div>
                <hr className="border-gray-200" />
                <ul className="py-2">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Link to={"/account"}>My Account</Link>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Link to={"/about-us"}>About Us</Link>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Link to={"/faqs"}>FAQ's</Link>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Link to={"/terms-and-conditions"}>Terms & Conditions</Link>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Link to={"/privacy-policy"}>Privacy Policy</Link>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Link to={"/language"}>Language</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Sidebar Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-20">
            <div
              ref={sidebarRef}
              className="fixed top-0 left-0 w-3/4 max-w-sm h-full bg-white shadow-md z-30 overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-bold">Menu</h2>
                <button
                  onClick={toggleMenu}
                  className="text-gray-600 cursor-pointer text-xl"
                >
                  <FaTimes />
                </button>
              </div>

              {/* User Info Section */}
              <div className="p-4 border-b bg-blue-50">
                <div className="flex items-center space-x-3">
                  <FaRegUserCircle className="text-3xl text-gray-600" />
                  <div>
                    <p className="font-semibold">{userName || "Demo User"}</p>
                    <p className="text-sm text-gray-600">{userEmail || "demo@demo.com"}</p>
                  </div>
                </div>
              </div>

              {/* Main Navigation */}
              <div className="py-2">
                <Link
                  to="/"
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100"
                  onClick={handleItemClick}
                >
                  <FaHome className="text-xl text-gray-600" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/notifications"
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100"
                  onClick={handleItemClick}
                >
                  <IoMdNotifications className="text-xl text-gray-600" />
                  <span>Notifications</span>
                </Link>
                <Link
                  to="/my-booking"
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100"
                  onClick={handleItemClick}
                >
                  <SlCalender className="text-xl text-gray-600" />
                  <span>My Bookings</span>
                </Link>
              </div>

              <div className="border-t">
                <ul className="py-2">
                  <li
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={handleItemClick}
                  >
                    <Link to="/categories">All Categories</Link>
                  </li>
                  <li
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={handleItemClick}
                  >
                    <Link to="/offers">Offer Zone</Link>
                  </li>
                  <li
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={handleItemClick}
                  >
                    <Link to="/orders">My Orders</Link>
                  </li>
                  <li
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={handleItemClick}
                  >
                    <Link to="/cart">My Cart</Link>
                  </li>
                  <li
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={handleItemClick}
                  >
                    <Link to="/wishlist">My Wishlist</Link>
                  </li>
                  <li
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={handleItemClick}
                  >
                    <Link to="/account">My Account</Link>
                  </li>
                  <li
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={handleItemClick}
                  >
                    <Link to="/language">Language</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <BottomNav />
      </div>
    </>
  );
};

export default Navbar;
