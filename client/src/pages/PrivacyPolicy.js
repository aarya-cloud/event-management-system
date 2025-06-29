import { Link } from 'react-router-dom';
const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-pink-600">Privacy Policy</h1>
      
      <p className="mb-4">
        At <strong>Eventify</strong>, we value your privacy. This policy explains how we collect, use, and protect your personal information when you use our platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. What We Collect</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Your name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Event booking preferences</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Data</h2>
      <p className="mb-4">
        We use your data to process bookings, send confirmations, notify you of event updates, and improve our services. We never sell your information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Your Rights</h2>
      <p className="mb-2">You have the right to:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>Access the data we store about you</li>
        <li>Request deletion of your data</li>
        <li>Opt out of marketing communications</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Protection</h2>
      <p className="mb-4">
        We implement standard security measures to protect your personal data and ensure secure transmission using HTTPS.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Contact Us</h2>
      <p>
        If you have any questions or wish to exercise your rights, please contact us at <strong><Link 
          to="/support">Eventify Support </Link></strong>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
