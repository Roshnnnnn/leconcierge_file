import { motion } from "framer-motion";

const Section = ({ title, children }) => (
  <div className="mb-4 sm:mb-6 lg:mb-8">
    {title && (
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
        {title}
      </h2>
    )}
    <div className="space-y-3 sm:space-y-4">{children}</div>
  </div>
);

const ListItem = ({ children }) => (
  <li className="flex items-start space-x-2 mb-2 text-sm sm:text-base">
    <span className="text-primary mt-1">•</span>
    <span className="text-gray-700 flex-1">{children}</span>
  </li>
);

const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white p-3 sm:p-4 lg:p-6 rounded-lg border border-gray-200 ${className}`}>
    {title && (
      <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-800">
        {title}
      </h3>
    )}
    {children}
  </div>
);

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-sm my-4 sm:my-6 lg:my-8"
    >
      {/* Header Section */}
      <Section>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
          Privacy Policy
        </h1>
        <div className="space-y-3 sm:space-y-4">
          <p className="text-base sm:text-lg text-gray-700">
            Thank you for using Le concierge!
          </p>
          <p className="text-sm sm:text-base text-gray-600">
            We are committed to providing you the best online shopping and delivery
            experience possible, while protecting your privacy and confidentiality
            according to the terms below.
          </p>
        </div>
      </Section>

      {/* Company Information */}
      <Section>
        <Card className="bg-gray-50">
          <p className="text-sm sm:text-base text-gray-700">
            Le concierge LLC. Dubai, a main office of company, established in Dubai,
            United Arab Emirates under license number 1278104 and having its
            registered address at 1001, Concord Tower, Media City, Dubai United Arab
            Emirates ("Le concierge"), regarding your use of the software 'Le
            concierge' ("Software"). Le concierge is a digital shopping application.
          </p>
        </Card>
      </Section>

      {/* Information Collection */}
      <Section title="Basic Categories of Information We Collect">
        <div className="space-y-4 sm:space-y-6">
          {/* Information You Share */}
          <Card title="1. Information You Share With Us">
            <ul className="list-none space-y-2 sm:space-y-3">
              <ListItem>
                When you use the Software, we collect the information that you choose
                to share with us, including account creation details and profile information.
              </ListItem>
              <ListItem>
                All credit/debit card details and personally identifiable information
                will NOT be stored, sold, shared, rented, or leased to any third parties.
              </ListItem>
            </ul>
          </Card>

          {/* Information from Software Use */}
          <Card title="2. Information from Software Use">
            <ul className="list-none space-y-2 sm:space-y-3">
              <ListItem>Usage Information: Activity through the Software</ListItem>
              <ListItem>Device Information and Phonebook</ListItem>
              <ListItem>Camera and Photos Access</ListItem>
              <ListItem>
                Location Information (GPS, wireless networks, cell towers, etc.)
              </ListItem>
              <ListItem>
                Cookies and Other Technologies for improved functionality
              </ListItem>
              <ListItem>
                Log Information (debugging, login/logout, usage duration)
              </ListItem>
            </ul>
          </Card>

          {/* Third Party Information */}
          <Card title="3. Information from Third Parties">
            <p className="text-sm sm:text-base text-gray-700">
              We may collect information that other users provide about you when using our Software.
            </p>
          </Card>
        </div>
      </Section>

      {/* Information Usage */}
      <Section title="How We Use Your Information">
        <Card>
          <ul className="list-none space-y-2 sm:space-y-3">
            <ListItem>Develop, operate, improve, and protect the Software</ListItem>
            <ListItem>Monitor and analyze trends and usage</ListItem>
            <ListItem>Provide personalized experiences</ListItem>
            <ListItem>Improve ad targeting and measurement</ListItem>
            <ListItem>Enhance safety and security</ListItem>
            <ListItem>Verify identity and prevent fraud</ListItem>
            <ListItem>Enforce our EULA and policies</ListItem>
          </ul>
        </Card>
      </Section>

      {/* Information Sharing */}
      <Section title="How We Share Information">
        <Card>
          <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">We may share:</h3>
          <ul className="list-none space-y-2 sm:space-y-3">
            <ListItem>Basic profile information (username, name, location)</ListItem>
            <ListItem>Software interaction information</ListItem>
            <ListItem>Information with our affiliates and service providers</ListItem>
            <ListItem>
              Information for legal reasons (compliance, investigations, safety)
            </ListItem>
            <ListItem>
              Information during business transactions (mergers, acquisitions)
            </ListItem>
          </ul>
        </Card>
      </Section>
    </motion.div>
  );
};

export default PrivacyPolicy;
