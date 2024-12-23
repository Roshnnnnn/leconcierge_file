import React, { useState } from 'react';
import CartAnimation from '../animations/CartAnimation';

const BookNowButton = ({ onBook, className = '', children }) => {
  const [animationProps, setAnimationProps] = useState(null);

  const handleClick = (event) => {
    const button = event.currentTarget;
    const buttonRect = button.getBoundingClientRect();
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartIcon) {
      const cartRect = cartIcon.getBoundingClientRect();
      
      setAnimationProps({
        startPosition: {
          x: buttonRect.left,
          y: buttonRect.top
        },
        endPosition: {
          x: cartRect.left,
          y: cartRect.top
        }
      });

      // Call the onBook callback
      onBook?.();

      // Reset animation after completion
      setTimeout(() => {
        setAnimationProps(null);
      }, 500);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 ${className}`}
      >
        {children || 'Book Now'}
      </button>

      <CartAnimation
        isAnimating={!!animationProps}
        startPosition={animationProps?.startPosition}
        endPosition={animationProps?.endPosition}
        onComplete={() => setAnimationProps(null)}
      />
    </>
  );
};

export default BookNowButton;
