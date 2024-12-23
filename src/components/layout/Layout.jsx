import React from 'react';
import Navbar from '../navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content with padding for navbar and bottom nav */}
      <div className="pt-20 pb-24 md:pb-0">
        {children}
      </div>
    </div>
  );
};

export default Layout;
