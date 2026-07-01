import React from 'react';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = 'px-6 py-2.5 font-medium rounded-md text-sm transition-all duration-200 cursor-pointer';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50 bg-white',
    white: 'bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-sm'
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}