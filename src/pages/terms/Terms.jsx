import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { safeAPI } from "../../services/apiService";

const TermsSection = ({ title, children }) => (
  <div className="mb-8 border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
    {title && (
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
        {title}
      </h2>
    )}
    <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

const Terms = () => {
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await safeAPI.content.getTerms();
        if (response.success) {
          setTerms(response.data.oData);
        } else {
          setError(response.error || "Failed to load terms and conditions");
        }
      } catch (error) {
        setError("An error occurred while loading terms and conditions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading terms and conditions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-4">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-red-500 text-lg font-semibold mb-2">{error}</p>
            <p className="text-gray-600 mb-6">Please try again or contact support if the problem persists.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Please read these terms and conditions carefully before using our services.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="space-y-8">
            {/* Introduction */}
            <TermsSection>
              <p>
                This Terms of Services (hereinafter referred to as "Agreement" or "Terms") 
                is a legal agreement between you and LE CONCIERGE SERVICES BROKERAGE, Dubai, 
                established under license number 1278104, at 1014, Concord Tower, Media City, 
                Dubai UAE.
              </p>
            </TermsSection>

            {/* License and Usage */}
            <TermsSection title="License and Usage">
              <div className="space-y-4">
                <p>
                  Le concierge grants you a personal, limited, worldwide, non-assignable, 
                  non-exclusive, revocable license to access and use the Software.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>For personal, non-commercial use only</li>
                  <li>Subject to these terms and conditions</li>
                  <li>Revocable at any time</li>
                </ul>
              </div>
            </TermsSection>

            {/* Terms Content */}
            <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ 
                __html: terms?.content || "No terms content available" 
              }} />
            </div>

            {/* Contact Information */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Need Help?
              </h3>
              <p className="text-gray-600 mb-4">
                If you have any questions about these terms, please contact our support team.
              </p>
              <a 
                href="mailto:info@khafroyal.ae" 
                className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@khafroyal.ae
              </a>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center text-gray-500 text-sm mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </motion.div>
  );
};

export default Terms;
