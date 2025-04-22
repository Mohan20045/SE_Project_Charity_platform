import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I make a donation?',
      answer: 'Making a donation is easy! Simply browse our list of verified organizations, select one you\'d like to support, and click the "Donate" button. You can make a secure payment using your credit card or other supported payment methods.'
    },
    {
      question: 'How do I know if an organization is legitimate?',
      answer: 'All organizations on our platform go through a thorough verification process. We check their legal status, financial records, and impact reports. Organizations with a "Verified" badge have met our strict verification criteria.'
    },
    {
      question: 'Can I get a tax receipt for my donation?',
      answer: 'Yes! After making a donation, you\'ll receive a tax receipt via email. You can also access all your donation receipts from your account dashboard under the "Donations" section.'
    },
    {
      question: 'What percentage of my donation goes to the organization?',
      answer: 'We strive to maximize the impact of your donation. 97% of your donation goes directly to the organization, while 3% covers platform maintenance and secure payment processing fees.'
    },
    {
      question: 'Can I make recurring donations?',
      answer: 'Yes! When making a donation, you can choose to make it a monthly, quarterly, or annual recurring donation. You can manage your recurring donations from your account settings.'
    },
    {
      question: 'How can organizations join the platform?',
      answer: 'Organizations can apply to join our platform by clicking the "Register Organization" button and completing the verification process. We review applications thoroughly to ensure they meet our standards.'
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use industry-standard encryption and secure payment processors to protect your financial information. We never store your full credit card details on our servers.'
    },
    {
      question: 'Can I donate anonymously?',
      answer: 'Yes! When making a donation, you can choose to remain anonymous. Your personal information will not be shared with the organization or displayed publicly.'
    },
    {
      question: 'How can I track the impact of my donation?',
      answer: 'Organizations provide regular updates and impact reports. You can view these from your dashboard under "My Impact". Many organizations also send direct updates about projects you\'ve supported.'
    },
    {
      question: 'What if I need to cancel a recurring donation?',
      answer: 'You can cancel a recurring donation at any time from your account settings under "Recurring Donations". The cancellation will take effect immediately, and no future payments will be processed.'
    }
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our platform, donations, and organizations.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleQuestion(index)}
              >
                <span className="font-semibold text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <FaChevronUp className="text-blue-500" />
                ) : (
                  <FaChevronDown className="text-gray-400" />
                )}
              </button>
              
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 py-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16">
          <p className="text-gray-600">
            Can\'t find what you\'re looking for?{' '}
            <a
              href="/contact"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 