import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { BiCategory } from 'react-icons/bi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { BsCalendar3 } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';

const BottomNav = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItemClass = (isActivePath) => `
    flex flex-col items-center justify-center space-y-1 
    w-16 sm:w-20 py-1 px-2 
    transition-colors duration-200 ease-in-out
    ${isActivePath ? 'text-blue-500' : 'text-gray-500 hover:text-blue-400'}
  `;

  const iconClass = (isActivePath) => `
    ${isActivePath ? 'text-blue-500' : 'text-gray-500'} 
    transition-colors duration-200 ease-in-out
  `;

  const textClass = (isActivePath) => `
    text-[10px] sm:text-xs font-medium
    ${isActivePath ? 'text-blue-500' : 'text-gray-500'}
    transition-colors duration-200 ease-in-out
  `;

  return (
    <div className="bg-white border-t py-1 sm:py-2 px-2 sm:px-6 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center max-w-lg mx-auto">
        <Link to="/service/category" className={navItemClass(isActive('/service/category'))}>
          <BiCategory size={22} className={iconClass(isActive('/service/category'))} />
          <span className={textClass(isActive('/service/category'))}>
            Categories
          </span>
        </Link>

        <Link to="/notifications" className={navItemClass(isActive('/notifications'))}>
          <IoNotificationsOutline size={22} className={iconClass(isActive('/notifications'))} />
          <span className={textClass(isActive('/notifications'))}>
            Alerts
          </span>
        </Link>

        <Link to="/" className="flex flex-col items-center -mt-5 sm:-mt-6 px-2">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-500 flex items-center justify-center shadow-lg transform transition-transform duration-200 hover:scale-105 active:scale-95">
            <HiHome size={24} className="text-white" />
          </div>
          <span className={textClass(isActive('/'))}>
            Home
          </span>
        </Link>

        <Link to="/bookings" className={navItemClass(isActive('/bookings'))}>
          <BsCalendar3 size={20} className={iconClass(isActive('/bookings'))} />
          <span className={textClass(isActive('/bookings'))}>
            Bookings
          </span>
        </Link>

        <Link to="/account" className={navItemClass(isActive('/account'))}>
          <CgProfile size={22} className={iconClass(isActive('/account'))} />
          <span className={textClass(isActive('/account'))}>
            Account
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
