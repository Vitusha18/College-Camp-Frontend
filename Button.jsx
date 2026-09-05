
import React from 'react';

export default function Button({ children, className = '', onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}