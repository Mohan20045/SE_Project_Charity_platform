import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AdminSettings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [settings, setSettings] = useState({
    donationLimits: {
      minAmount: 0,
      maxAmount: 0,
      dailyLimit: 0,
    },
    organizationVerification: {
      requiredDocuments: [],
      verificationFee: 0,
      processingTime: 0,
    },
    platformSettings: {
      maintenanceMode: false,
      allowNewRegistrations: true,
      allowFeedback: true,
      allowInKindDonations: true,
    },
    notificationSettings: {
      emailNotifications: true,
      donationAlerts: true,
      feedbackAlerts: true,
      systemUpdates: true,
    },
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/admin/settings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSettings(response.data.data.settings);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch settings. Please try again later.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [section, field] = name.split('.');

    if (type === 'checkbox') {
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: checked
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === 'number' ? Number(value) : value
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.put(
        'http://localhost:5001/api/admin/settings',
        settings,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setSuccess('Settings updated successfully.');
    } catch (err) {
      setError('Failed to update settings. Please try again.');
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">You don't have permission to access this page.</p>
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Return to Home
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
            <p className="mt-2 text-lg text-gray-600">
              Configure platform-wide settings and parameters.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Donation Limits */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Donation Limits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="donationLimits.minAmount" className="block text-sm font-medium text-gray-700">
                Minimum Amount ($)
              </label>
              <input
                type="number"
                id="donationLimits.minAmount"
                name="donationLimits.minAmount"
                value={settings.donationLimits.minAmount}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="donationLimits.maxAmount" className="block text-sm font-medium text-gray-700">
                Maximum Amount ($)
              </label>
              <input
                type="number"
                id="donationLimits.maxAmount"
                name="donationLimits.maxAmount"
                value={settings.donationLimits.maxAmount}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="donationLimits.dailyLimit" className="block text-sm font-medium text-gray-700">
                Daily Limit ($)
              </label>
              <input
                type="number"
                id="donationLimits.dailyLimit"
                name="donationLimits.dailyLimit"
                value={settings.donationLimits.dailyLimit}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Organization Verification */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Organization Verification</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="organizationVerification.verificationFee" className="block text-sm font-medium text-gray-700">
                Verification Fee ($)
              </label>
              <input
                type="number"
                id="organizationVerification.verificationFee"
                name="organizationVerification.verificationFee"
                value={settings.organizationVerification.verificationFee}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="organizationVerification.processingTime" className="block text-sm font-medium text-gray-700">
                Processing Time (days)
              </label>
              <input
                type="number"
                id="organizationVerification.processingTime"
                name="organizationVerification.processingTime"
                value={settings.organizationVerification.processingTime}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="organizationVerification.requiredDocuments" className="block text-sm font-medium text-gray-700">
                Required Documents
              </label>
              <textarea
                id="organizationVerification.requiredDocuments"
                name="organizationVerification.requiredDocuments"
                value={settings.organizationVerification.requiredDocuments.join('\n')}
                onChange={(e) => {
                  const documents = e.target.value.split('\n').filter(doc => doc.trim());
                  setSettings(prev => ({
                    ...prev,
                    organizationVerification: {
                      ...prev.organizationVerification,
                      requiredDocuments: documents
                    }
                  }));
                }}
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter each document on a new line"
              />
            </div>
          </div>
        </div>

        {/* Platform Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="platformSettings.maintenanceMode"
                name="platformSettings.maintenanceMode"
                checked={settings.platformSettings.maintenanceMode}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="platformSettings.maintenanceMode" className="ml-2 block text-sm text-gray-900">
                Maintenance Mode
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="platformSettings.allowNewRegistrations"
                name="platformSettings.allowNewRegistrations"
                checked={settings.platformSettings.allowNewRegistrations}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="platformSettings.allowNewRegistrations" className="ml-2 block text-sm text-gray-900">
                Allow New Registrations
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="platformSettings.allowFeedback"
                name="platformSettings.allowFeedback"
                checked={settings.platformSettings.allowFeedback}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="platformSettings.allowFeedback" className="ml-2 block text-sm text-gray-900">
                Allow Feedback
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="platformSettings.allowInKindDonations"
                name="platformSettings.allowInKindDonations"
                checked={settings.platformSettings.allowInKindDonations}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="platformSettings.allowInKindDonations" className="ml-2 block text-sm text-gray-900">
                Allow In-Kind Donations
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notificationSettings.emailNotifications"
                name="notificationSettings.emailNotifications"
                checked={settings.notificationSettings.emailNotifications}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="notificationSettings.emailNotifications" className="ml-2 block text-sm text-gray-900">
                Email Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notificationSettings.donationAlerts"
                name="notificationSettings.donationAlerts"
                checked={settings.notificationSettings.donationAlerts}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="notificationSettings.donationAlerts" className="ml-2 block text-sm text-gray-900">
                Donation Alerts
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notificationSettings.feedbackAlerts"
                name="notificationSettings.feedbackAlerts"
                checked={settings.notificationSettings.feedbackAlerts}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="notificationSettings.feedbackAlerts" className="ml-2 block text-sm text-gray-900">
                Feedback Alerts
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notificationSettings.systemUpdates"
                name="notificationSettings.systemUpdates"
                checked={settings.notificationSettings.systemUpdates}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="notificationSettings.systemUpdates" className="ml-2 block text-sm text-gray-900">
                System Updates
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
} 