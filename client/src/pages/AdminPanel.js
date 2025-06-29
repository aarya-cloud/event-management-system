import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import EventForm from '../components/EventForm';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to load events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(events.filter(event => event._id !== id));
    } catch (err) {
      alert('Error deleting event');
    }
  };

 return (
  <div className="max-w-4xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
    <EventForm onEventAdded={fetchEvents} />
    <hr className="my-8" />
    <h3 className="text-xl font-semibold mb-4">All Events</h3>
    {loading ? (
      <p>Loading events...</p>
    ) : (
      <ul className="space-y-4">
        {events.map((event) => (
          <li
            key={event._id}
            className="bg-white p-4 shadow rounded flex justify-between items-center"
          >
            {/* Left side: Event info */}
            <div>
              <h4 className="font-semibold">{event.title}</h4>
              <p className="text-sm text-gray-600">
                {new Date(event.date).toLocaleString()}
              </p>
            </div>

            {/* Right side: Buttons */}
            <div className="flex gap-4">
              <Link
                to={`/admin/edit/${event._id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(event._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

};

export default AdminPanel;
