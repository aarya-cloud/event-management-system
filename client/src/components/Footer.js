import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-600 mb-2">
            © {new Date().getFullYear()} Eventify. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center space-x-4">
            <Link 
              to="/support" 
              className="text-sm text-pink-600 hover:underline hover:text-pink-700 transition-colors"
            >
              Contact Support
            </Link>
            <Link 
              to="/privacy" 
              className="text-sm text-pink-600 hover:underline hover:text-pink-700 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-sm text-pink-600 hover:underline hover:text-pink-700 transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;