import { motion } from "framer-motion";

const Section = ({ title, children, className = "" }) => (
  <div className={`mb-6 sm:mb-8 lg:mb-12 ${className}`}>
    {title && (
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 lg:mb-6 text-gray-900 leading-tight">
        {title}
      </h2>
    )}
    <div className="space-y-4 sm:space-y-6">{children}</div>
  </div>
);

const Feature = ({ children }) => (
  <li className="flex items-start space-x-3 mb-2 sm:mb-3">
    <span className="text-primary text-lg mt-0.5 sm:mt-1">•</span>
    <span className="text-gray-700 text-sm sm:text-base lg:text-lg flex-1 leading-relaxed">
      {children}
    </span>
  </li>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);

const AboutUs = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-16">
        {/* Hero Section */}
        <Section className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 text-gray-900 leading-tight">
              We Make Life Easier
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your one-stop click for a convenient and hassle-free life with Le concierge.
            </p>
          </motion.div>
        </Section>

        {/* Main Content */}
        <div className="grid gap-6 sm:gap-8 lg:gap-12">
          {/* Our Story */}
          <Section title="Born from the Desire for Simplicity">
            <Card>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                We understand the challenges of juggling a busy schedule. Between work,
                family, and personal commitments, finding time to tackle chores and
                errands can feel impossible. That's why we created Le concierge. We
                believe everyone deserves a helping hand, and our app is here to provide
                it.
              </p>
            </Card>
          </Section>

          {/* Mission */}
          <Section title="Our Mission: Streamlining Everyday Tasks">
            <Card>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                Our mission is to simplify your life by offering a variety of services
                at your fingertips. Whether you need a plumber to fix a leaky faucet, a
                cleaning crew for a deep spring clean, or a business consultant to solve
                your business problems, Le concierge has you covered.
              </p>
            </Card>
          </Section>

          {/* Community */}
          <Section title="Join the Le concierge Community">
            <Card>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                Download the Le concierge app today and experience the convenience of
                having a team of reliable professionals just a tap away. We're here to
                help you reclaim your time and focus on what matters most.
              </p>
            </Card>
          </Section>

          {/* Features */}
          <Section title="What We Offer">
            <Card>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-4 text-gray-800 leading-tight">
                With Le concierge, you can:
              </h3>
              <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                <Feature>
                  Browse through a wide range of services offered by local service
                  providers
                </Feature>
                <Feature>Schedule appointments quickly and easily within the app</Feature>
                <Feature>View transparent pricing and transaction details</Feature>
                <Feature>Pay securely through our integrated payment system</Feature>
                <Feature>
                  Rate and review your experience to help others make informed
                  decisions
                </Feature>
              </ul>
            </Card>
          </Section>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-6 sm:mt-8 lg:mt-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-primary bg-opacity-5 border-2 border-primary border-opacity-20">
              <p className="text-base sm:text-lg lg:text-xl font-bold text-primary leading-relaxed">
                Let Le concierge take care of your to-do list, so you can live life to
                the fullest.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
