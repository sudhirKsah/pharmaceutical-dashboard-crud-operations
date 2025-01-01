import React from 'react';

export const Button = ({ children, onClick, variant = 'default', ...props }) => {
  const baseStyles = "px-4 py-2 rounded focus:outline-none";
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  return (
    <button
      className={`${baseStyles} ${variants[variant]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
