import React from 'react';
import { Link } from 'react-router-dom';
import { FaHandHoldingHeart, FaCalendarAlt } from 'react-icons/fa';

const DonationCard = ({ donation }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FaHandHoldingHeart className="text-blue-500 text-2xl mr-2" />
          <h3 className="text-xl font-semibold text-gray-800">
            ${donation.amount.toFixed(2)}
          </h3>
        </div>
        <span className="text-sm text-gray-500 flex items-center">
          <FaCalendarAlt className="mr-1" />
          {formatDate(donation.date)}
        </span>
      </div>
      
      <Link to={`/organizations/${donation.organizationId}`} className="block mb-3">
        <h4 className="text-lg font-medium text-blue-600 hover:text-blue-800">
          {donation.organizationName}
        </h4>
      </Link>
      
      <p className="text-gray-600 mb-4 line-clamp-2">
        {donation.message || 'No message provided'}
      </p>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span className={`px-3 py-1 rounded-full ${
          donation.status === 'completed' ? 'bg-green-100 text-green-800' :
          donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
        </span>
        {donation.anonymous && (
          <span className="text-gray-500">Anonymous Donation</span>
        )}
      </div>
    </div>
  );
};

export default DonationCard; 