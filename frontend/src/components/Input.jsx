import React from 'react';

export const Input = ({ type = 'text', ...props }) => (
  <input
    type={type}
    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
    {...props}
  />
);
