import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center" role="alert">
      <FaExclamationCircle className="mr-2" />
      <span>{message || 'An error occurred. Please try again.'}</span>
    </div>
  );
};

export default ErrorMessage; 