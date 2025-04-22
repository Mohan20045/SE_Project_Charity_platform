import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaUsers, FaCheckCircle } from 'react-icons/fa';

const OrganizationCard = ({ organization }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={organization.imageUrl || 'https://via.placeholder.com/400x200?text=Organization'}
        alt={organization.name}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-800">
            {organization.name}
          </h3>
          {organization.verified && (
            <FaCheckCircle className="text-blue-500" title="Verified Organization" />
          )}
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <FaMapMarkerAlt className="mr-1" />
          <span>{organization.location}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {organization.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <FaUsers className="mr-1" />
            <span>{organization.donorsCount || 0} Donors</span>
          </div>
          <span>${organization.totalDonations?.toFixed(2) || '0.00'} Raised</span>
        </div>
        
        <div className="flex justify-between items-center">
          <Link
            to={`/organizations/${organization._id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View Details
          </Link>
          <span className={`px-3 py-1 rounded-full text-sm ${
            organization.status === 'active' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {organization.status.charAt(0).toUpperCase() + organization.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrganizationCard; 