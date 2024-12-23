import { motion } from "framer-motion";
import error from "../../assets/404.png";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div 
        className="text-center max-w-lg w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="relative mb-8"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-7xl sm:text-8xl md:text-9xl font-bold text-blue-500 opacity-10"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1] 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            404
          </motion.h1>
          <motion.h2 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       text-4xl sm:text-5xl md:text-6xl font-bold text-blue-600 whitespace-nowrap"
            animate={{ 
              y: [-5, 5, -5],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Oops!
          </motion.h2>
        </motion.div>

        <motion.div
          className="relative w-48 sm:w-64 md:w-80 mx-auto mb-8"
          variants={itemVariants}
        >
          <motion.img 
            src={error} 
            alt="Not Found" 
            className="w-full h-auto"
            animate={{ 
              rotate: [-5, 5, -5],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="space-y-4"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
            Page Not Found
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
          
          <motion.button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium
                     hover:bg-blue-600 transition-colors duration-300
                     shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go Back Home
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Error;
