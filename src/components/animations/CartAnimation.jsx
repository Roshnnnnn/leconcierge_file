import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CartAnimation = ({ isAnimating, startPosition, endPosition, onComplete }) => {
  if (!startPosition || !endPosition) return null;

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ 
            x: startPosition.x,
            y: startPosition.y,
            scale: 1,
            opacity: 1
          }}
          animate={{ 
            x: endPosition.x,
            y: endPosition.y,
            scale: 0.1,
            opacity: 0
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
          onAnimationComplete={onComplete}
          className="fixed w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center pointer-events-none z-[9999]"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            transform: `translate(${startPosition.x}px, ${startPosition.y}px)`
          }}
        >
          <span className="text-white text-2xl">+</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartAnimation;
