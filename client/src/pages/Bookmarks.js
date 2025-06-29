import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const Bookmarks = () => {
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/bookmarks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookmarkedEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch bookmarks:', err);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">🔖 Bookmarked Events</h1>
      {bookmarkedEvents.length === 0 ? (
        <p className="text-gray-500">No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedEvents.map(event => (
            <div key={event._id} className="bg-white p-5 rounded-lg shadow border">
              <h2 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{new Date(event.date).toLocaleString()}</p>
              <p className="text-sm text-gray-500">{event.location}</p>
              <button
                onClick={() => navigate(`/events/${event._id}`)}
                className="mt-4 text-pink-600 hover:underline text-sm"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
