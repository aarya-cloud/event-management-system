import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from '../utils/axios';

const getCategoryBackground = (category) => {
  switch (category) {
    case 'Music':
      return '/assets/backgrounds/music.jpg';
    case 'Technology':
      return '/assets/backgrounds/technology.jpg';
    case 'Art':
      return '/assets/backgrounds/art.jpg';
    case 'Business':
      return '/assets/backgrounds/business.jpg';
    default:
      return '';
  }
};

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      await axios.post('/bookings', { eventId: event._id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('✅ Booking successful!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed');
    }
  };

  if (!event) return <p className="text-center mt-10">Loading event...</p>;

  return (
  <div
    className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url(${getCategoryBackground(event.category)})`,
    }}
  >
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

    {/* Event details card */}
    <div className="relative z-10 max-w-2xl w-full bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
      {/* Header section */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 p-6">
        <h1 className="text-3xl font-bold text-white">{event.title}</h1>
        <p className="text-pink-100 mt-2">{event.category} Event</p>
      </div>

      {/* Content section */}
      <div className="p-6">
        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-700 text-lg italic font-light leading-relaxed border-l-4 border-pink-400 pl-4">
            "{event.description}"
          </p>
        </div>

        {/* Event details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <div className="bg-pink-100 p-2 rounded-full mr-3">
              <svg className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date & Time</p>
              <p className="font-medium">{new Date(event.date).toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-pink-100 p-2 rounded-full mr-3">
              <svg className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{event.location}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-pink-100 p-2 rounded-full mr-3">
              <svg className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-medium">₹{event.price}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-pink-100 p-2 rounded-full mr-3">
              <svg className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Seats Available</p>
              <p className="font-medium">{event.seats}</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={() => navigate(`/book/${event._id}`)}
            className="flex-1 bg-gradient-to-r from-pink-600 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-pink-700 hover:to-pink-600 transition-all shadow-md flex items-center justify-center"
          >
            Book Now
            <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>

          <Link
            to="/"
            className="flex-1 border border-pink-600 text-pink-600 py-3 rounded-lg font-medium hover:bg-pink-50 transition-all flex items-center justify-center"
          >
            Go Back
            
          </Link>
        </div>
      </div>
    </div>
  </div>
);
};

export default EventDetails;
