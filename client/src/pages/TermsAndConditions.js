import { Link } from 'react-router-dom';
const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-pink-600">Terms & Conditions</h1>

      <p className="mb-4">
        Welcome to <strong>Eventify</strong>. By using this website, you agree to the following terms and conditions:
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Platform</h2>
      <p className="mb-4">
        You may browse, book, and cancel events through Eventify. You agree not to use the site for any illegal or abusive activities.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Booking Policy</h2>
      <p className="mb-4">
        All bookings are subject to seat availability. Eventify reserves the right to cancel or reschedule events and will notify users accordingly.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Refunds & Cancellations</h2>
      <p className="mb-4">
        If you cancel a booking, your seat will be released, and refunds (if applicable) will be processed as per event policy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Content & Accuracy</h2>
      <p className="mb-4">
        Event details are posted by organizers. While we aim to keep content accurate, Eventify is not liable for any errors or outdated info.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Contact Us</h2>
      <p>
        For questions regarding these terms, email us at <strong><Link 
              to="/support">Eventify Support</Link></strong>.
      </p>
    </div>
  );
};

export default TermsAndConditions;
