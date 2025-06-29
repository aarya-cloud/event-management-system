import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X } from 'lucide-react'; // for hamburger icon
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user'));
    if (stored) setUser(stored);
  }, [setUser]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/');
    toast.success("Logged out!");
  };

  return (
  <nav className="bg-white shadow-sm sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link 
        to="/" 
        className="text-2xl font-bold flex items-center"
      >
        <span className="bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">
          Eventify
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <Link 
          to="/" 
          className="text-pink-700 hover:text-pink-600 font-medium transition-colors duration-200"
        >
          Home
        </Link>

        {user && (
          <Link 
            to="/dashboard" 
            className="text-pink-700 hover:text-pink-600 font-medium transition-colors duration-200"
          >
            Dashboard
          </Link>
        )}

        {user?.isAdmin && (
          <Link 
            to="/admin" 
            className="text-pink-700 hover:text-pink-600 font-medium transition-colors duration-200"
          >
            Admin Panel
          </Link>
        )}

        <div className="h-6 w-px bg-pink-200 mx-2"></div>

        {user ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200 font-medium"
          >
            Logout
          </button>
        ) : (
          <>
            <Link 
              to="/login" 
              className="text-pink-700 hover:text-pink-600 font-medium transition-colors duration-200"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors duration-200 font-medium"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 rounded-md text-pink-700 hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>

    {/* Mobile Menu */}
    {menuOpen && (
      <div className="md:hidden bg-white border-t border-pink-100">
        <div className="px-4 pt-2 pb-4 space-y-2">
          <Link 
            to="/" 
            className="block px-4 py-2 text-pink-700 hover:bg-pink-50 rounded-md font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {user && (
            <Link 
              to="/dashboard" 
              className="block px-4 py-2 text-pink-700 hover:bg-pink-50 rounded-md font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}

          {user?.isAdmin && (
            <Link 
              to="/admin" 
              className="block px-4 py-2 text-pink-700 hover:bg-pink-50 rounded-md font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Admin Panel
            </Link>
          )}

          <div className="border-t border-pink-100 my-2"></div>

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-pink-700 hover:bg-pink-50 rounded-md font-medium"
            >
              Logout
            </button>
          ) : (
            <>
              <Link 
                to="/login" 
                className="block px-4 py-2 text-pink-700 hover:bg-pink-50 rounded-md font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="block px-4 py-2 text-center bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    )}
  </nav>
);
};

export default Navbar;
