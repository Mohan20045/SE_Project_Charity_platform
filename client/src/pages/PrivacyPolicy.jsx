import React from 'react';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content: `We collect information that you provide directly to us, including:
        • Personal information (name, email address, phone number)
        • Payment information (processed securely through our payment providers)
        • Profile information (when you create an account)
        • Donation history and preferences
        • Communications with us
        We also automatically collect certain information about your device when you use our platform.`
    },
    {
      title: 'How We Use Your Information',
      content: `We use the information we collect to:
        • Process your donations and provide receipts
        • Maintain and improve our platform
        • Communicate with you about donations and platform updates
        • Verify your identity and prevent fraud
        • Comply with legal obligations
        • Analyze platform usage and optimize user experience`
    },
    {
      title: 'Information Sharing',
      content: `We may share your information with:
        • Organizations you choose to donate to (unless anonymous)
        • Service providers who assist our operations
        • Legal authorities when required by law
        • Other parties with your explicit consent
        We never sell your personal information to third parties.`
    },
    {
      title: 'Data Security',
      content: `We implement appropriate technical and organizational measures to protect your personal information, including:
        • Encryption of sensitive data
        • Regular security assessments
        • Secure data storage
        • Access controls and authentication
        • Regular security training for our team`
    },
    {
      title: 'Your Rights',
      content: `You have the right to:
        • Access your personal information
        • Correct inaccurate information
        • Request deletion of your information
        • Opt-out of marketing communications
        • Export your data
        • Withdraw consent for processing`
    },
    {
      title: 'Cookies and Tracking',
      content: `We use cookies and similar technologies to:
        • Keep you logged in
        • Remember your preferences
        • Analyze platform usage
        • Improve user experience
        You can control cookie settings through your browser.`
    },
    {
      title: 'Children\'s Privacy',
      content: 'Our platform is not intended for children under 13. We do not knowingly collect information from children under 13. If you believe we have collected information from a child under 13, please contact us.'
    },
    {
      title: 'Changes to Privacy Policy',
      content: 'We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the effective date.'
    },
    {
      title: 'Contact Us',
      content: 'If you have any questions about this privacy policy or our practices, please contact us through our contact page or email us at privacy@charityplatform.com.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
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
            Your privacy is important to us. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our platform.
            Please read this privacy policy carefully. If you do not agree with the terms
            of this privacy policy, please do not access the platform.
          </p>
        </div>

        {/* Policy Sections */}
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
      </div>
    </div>
  );
};

export default PrivacyPolicy; 