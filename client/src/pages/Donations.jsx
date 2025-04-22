import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';

export default function Donations() {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalDonated, setTotalDonated] = useState(0);

  useEffect(() => {
    const fetchDonations = async () => {
      if (!user) {
        setError('Please log in to view your donations.');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/donations/donor');

        setDonations(response.data.data.donations);
        
        // Calculate total monetary donations
        const total = response.data.data.donations
          .filter(donation => donation.type === 'money')
          .reduce((sum, donation) => sum + donation.amount, 0);
        
        setTotalDonated(total);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching donations:', err);
        if (err.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('isAdmin');
          localStorage.removeItem('name');
          setError('Your session has expired. Please log in again.');
        } else {
          setError('Failed to fetch donations. Please try again later.');
        }
        setLoading(false);
      }
    };

    fetchDonations();
  }, [user]);
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Please log in to view your donations.</p>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="text-red-600 text-center">
          <p className="text-lg font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Donations</h1>
        <p className="mt-2 text-lg text-gray-600">
          Track your contributions and their impact on the community.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Donation Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600">Total Donations</p>
            <p className="text-2xl font-bold text-gray-900">{donations.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600">Total Amount Donated</p>
            <p className="text-2xl font-bold text-gray-900">₹{totalDonated.toFixed(2)}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600">Organizations Supported</p>
            <p className="text-2xl font-bold text-gray-900">
              {new Set(donations.map(d => d.organizationId._id)).size}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {donations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-4">You haven't made any donations yet.</p>
            <Link
              to="/organizations"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Find Organizations to Support
            </Link>
          </div>
        ) : (
          donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {donation.organizationId.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(donation.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      donation.type === 'money'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {donation.type === 'money' ? 'Monetary' : 'In-Kind'}
                  </span>
                </div>

                <div className="mt-4">
                  {donation.type === 'money' && (
                    <p className="text-xl font-bold text-gray-900 mb-2">
                      ₹{donation.amount.toFixed(2)}
                    </p>
                  )}
                  <p className="text-gray-600">{donation.itemDescription}</p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`/organizations/${donation.organizationId._id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Organization
                  </Link>
                  <span className="text-sm text-gray-500">
                    Status: {donation.status || 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

