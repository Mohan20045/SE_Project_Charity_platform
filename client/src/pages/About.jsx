import React from 'react';
import { FaHandHoldingHeart, FaUsers, FaCheckCircle, FaGlobe } from 'react-icons/fa';

const About = () => {
  const stats = [
    {
      icon: <FaHandHoldingHeart className="text-4xl text-blue-500" />,
      title: 'Total Donations',
      value: '$1M+',
      description: 'Raised for charitable causes'
    },
    {
      icon: <FaUsers className="text-4xl text-blue-500" />,
      title: 'Active Donors',
      value: '10K+',
      description: 'Supporting various causes'
    },
    {
      icon: <FaCheckCircle className="text-4xl text-blue-500" />,
      title: 'Verified Organizations',
      value: '100+',
      description: 'Trusted partners'
    },
    {
      icon: <FaGlobe className="text-4xl text-blue-500" />,
      title: 'Global Impact',
      value: '50+',
      description: 'Countries reached'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Our Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to make charitable giving more transparent, efficient, and impactful.
            Our platform connects donors with verified organizations to create positive change in the world.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-lg font-medium text-gray-700 mb-2">{stat.title}</p>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Our mission is to revolutionize charitable giving by creating a transparent,
                efficient, and secure platform that connects donors with verified organizations.
                We believe in the power of technology to amplify social impact and make the
                world a better place.
              </p>
              <p className="text-gray-600">
                Through our platform, we ensure that every donation reaches its intended
                beneficiaries, while providing donors with real-time updates and impact reports.
                We carefully verify each organization to maintain trust and accountability in
                the donation process.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span className="text-gray-600">Transparency in all operations</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span className="text-gray-600">Security and trust in transactions</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span className="text-gray-600">Efficiency in fund distribution</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span className="text-gray-600">Impact measurement and reporting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're a dedicated team of professionals passionate about making a difference.
            Our diverse backgrounds in technology, nonprofit management, and social impact
            drive us to create innovative solutions for charitable giving.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 