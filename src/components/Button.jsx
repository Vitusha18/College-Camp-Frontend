import React from 'react';

export default function Button({ children, className = '', onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center transition-all duration-200 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}