import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from '../utils/axios';

const BookEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error('Error fetching event:', err);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      await axios.post(
        '/bookings',
        {
          eventId: id,
          ...formData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('✅ Booking successful! A confirmation email has been sent.');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed');
    }
  };

  if (!event) return <p className="text-center mt-10">Loading event...</p>;

  if (!isLoggedIn) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl text-pink-600 mb-4">🔐 Please log in to book this event.</h2>
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 p-6 text-center">
        <h1 className="text-2xl font-bold text-white">Book: {event.title}</h1>
        <p className="text-pink-100 mt-1">Complete your booking details</p>
      </div>

      {/* Form section */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="98039XXXXX"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition"
              required
            />
            
          </div>

          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700 flex items-start">
            <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>In order to receive a confirmation email, please use a valid email address.</span>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-pink-700 hover:to-pink-600 transition-all shadow-md flex items-center justify-center"
          >
            Confirm Booking
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link 
            to={`/events/${event._id}`} 
            className="text-pink-600 hover:text-pink-700 font-medium inline-flex items-center"
          >
            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Event
          </Link>
        </div>
      </div>
    </div>
  </div>
);
};

export default BookEvent;
