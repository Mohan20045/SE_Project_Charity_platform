import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';

export default function OrganizationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [donationType, setDonationType] = useState('monetary');
  const [donationDescription, setDonationDescription] = useState('');
  const [donationError, setDonationError] = useState('');
  const [donationSuccess, setDonationSuccess] = useState(false);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await api.get(`/organizations/${id}`);
        setOrganization(response.data.data.organization);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch organization details. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [id]);

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    setDonationError('');
    setDonationSuccess(false);

    if (!user) {
      navigate('/login', { state: { from: `/organizations/${id}` } });
      return;
    }

    try {
      const donationData = {
        organizationId: id,
        type: donationType === 'monetary' ? 'money' : 'item',
        amount: donationType === 'monetary' ? parseFloat(donationAmount) : undefined,
        itemDescription: donationDescription
      };

      await api.post('/donations', donationData);

      setDonationSuccess(true);
      setDonationAmount('');
      setDonationDescription('');
    } catch (err) {
      setDonationError(err.response?.data?.message || 'Failed to submit donation. Please try again.');
    }
  };

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
          <Link
            to="/organizations"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Organizations
          </Link>
        </div>
      </div>
    );
  }

  if (!organization) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          to="/organizations"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Organizations
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{organization.name}</h1>
          
          <div className="prose max-w-none mb-8">
            <p className="text-gray-600 text-lg">{organization.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-gray-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">{organization.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-gray-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">{organization.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-gray-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">{organization.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Make a Donation</h2>
              <form onSubmit={handleDonationSubmit} className="space-y-4">
                <div>
                  <label htmlFor="donationType" className="block text-sm font-medium text-gray-700">
                    Donation Type
                  </label>
                  <select
                    id="donationType"
                    value={donationType}
                    onChange={(e) => setDonationType(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="monetary">Monetary</option>
                    <option value="in-kind">In-Kind</option>
                  </select>
                </div>

                {donationType === 'monetary' && (
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      id="amount"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      min="1"
                      step="0.01"
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={donationDescription}
                    onChange={(e) => setDonationDescription(e.target.value)}
                    rows={3}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Please describe your donation..."
                  />
                </div>

                {donationError && (
                  <div className="text-red-600 text-sm">{donationError}</div>
                )}

                {donationSuccess && (
                  <div className="text-green-600 text-sm">
                    Thank you for your donation! Your contribution has been recorded.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {user ? 'Submit Donation' : 'Login to Donate'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
