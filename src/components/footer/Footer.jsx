import { FaAppStoreIos, FaGooglePlay, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          {/* Logo and Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-2 sm:col-span-2 md:col-span-1"
          >
            <div className="mb-4">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Le concierge
              </h1>
              <p className="text-gray-400 text-sm mt-1">by Khaf Royal</p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                info@leconciergeapp.ae
              </p>
              <p className="text-gray-300 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +971542473929
              </p>
            </div>
            <div className="flex space-x-3 mt-4">
              {[
                { Icon: FaFacebookF, href: "#" },
                { Icon: FaTwitter, href: "#" },
                { Icon: FaInstagram, href: "#" },
                { Icon: FaLinkedinIn, href: "#" }
              ].map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={href}
                  className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors"
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Useful Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1"
          >
            <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              {['Home', 'About us', 'Blog', 'Contact us'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  transition={{ type: "tween" }}
                >
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      className="w-3 h-3 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Help & Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1"
          >
            <h2 className="text-lg font-semibold text-white mb-3">Support</h2>
            <ul className="space-y-2 text-sm">
              {[
                'FAQs',
                'Terms & conditions',
                'Privacy policy',
                'Delete Account'
              ].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  transition={{ type: "tween" }}
                >
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      className="w-3 h-3 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* App Store Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1"
          >
            <h2 className="text-lg font-semibold text-white mb-3">Get App</h2>
            <div className="space-y-3">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#"
                className="flex items-center bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg p-2 sm:p-3"
              >
                <FaAppStoreIos className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#"
                className="flex items-center bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg p-2 sm:p-3"
              >
                <FaGooglePlay className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                <div>
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-400 text-xs sm:text-sm">
            &copy; {currentYear} Le concierge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
