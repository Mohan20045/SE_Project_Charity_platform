import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessMessage = ({ message }) => {
  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-center" role="alert">
      <FaCheckCircle className="mr-2" />
      <span>{message || 'Operation completed successfully!'}</span>
    </div>
  );
};

export default SuccessMessage; 