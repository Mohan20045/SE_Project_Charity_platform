import React from 'react';

const Terms = () => {
  const sections = [
    {
      title: 'Agreement to Terms',
      content: `By accessing our platform, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.`
    },
    {
      title: 'Use License',
      content: `We grant you a limited, non-exclusive, non-transferable, revocable license to use our platform for personal, non-commercial purposes subject to these Terms of Service. This license does not include:
        • Modifying or copying platform materials
        • Using materials for commercial purposes
        • Attempting to decompile or reverse engineer platform software
        • Removing any copyright or proprietary notations
        • Transferring materials to another person or "mirroring" materials`
    },
    {
      title: 'Account Responsibilities',
      content: `When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:
        • Maintaining the confidentiality of your account
        • Restricting access to your computer or device
        • All activities that occur under your account
        You must notify us immediately of any unauthorized use of your account.`
    },
    {
      title: 'Donations and Payments',
      content: `By making a donation through our platform:
        • You authorize us to charge your payment method
        • You confirm that you are authorized to use the payment method
        • You agree to our processing fees
        • You acknowledge that donations are typically non-refundable
        • You understand that tax receipts are provided where applicable`
    },
    {
      title: 'Organization Verification',
      content: `Organizations listed on our platform undergo verification, but:
        • We do not guarantee the accuracy of organization information
        • We are not responsible for organization activities
        • We reserve the right to remove organizations
        • Organizations must maintain compliance with our standards
        Users should conduct their own due diligence before donating.`
    },
    {
      title: 'Prohibited Activities',
      content: `You may not engage in any of the following activities:
        • Violating laws or regulations
        • Impersonating others
        • Submitting false information
        • Attempting to hack or disrupt the platform
        • Using the platform for fraudulent purposes
        • Harassing other users or organizations`
    },
    {
      title: 'Intellectual Property',
      content: `The platform and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.`
    },
    {
      title: 'Termination',
      content: `We may terminate or suspend your account and access to the platform immediately, without prior notice or liability, for any reason, including:
        • Violation of these Terms
        • Fraudulent activity
        • Harmful behavior
        • At our sole discretion`
    },
    {
      title: 'Limitation of Liability',
      content: `To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the platform or inability to use the platform.`
    },
    {
      title: 'Changes to Terms',
      content: 'We reserve the right to modify or replace these Terms at any time. We will provide notice of any material changes. Your continued use of the platform after changes constitutes acceptance of the new Terms.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Introduction */}
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-gray-600">
            Please read these Terms of Service carefully before using our platform.
            These Terms govern your access to and use of our platform. By using our
            platform, you agree to be bound by these Terms.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="max-w-3xl mx-auto">
          {sections.map((section, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {section.title}
              </h2>
              <div className="prose text-gray-600">
                {section.content.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-2">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-gray-600">
            If you have any questions about these Terms, please{' '}
            <a
              href="/contact"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              contact us
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms; 