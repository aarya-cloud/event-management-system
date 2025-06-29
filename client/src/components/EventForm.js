import { useState } from 'react';
import axios from '../utils/axios';

const EventForm = ({ onEventAdded }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    price: '',
    seats: '',
    category: 'Technology',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/events', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('✅ Event added!');
      setForm({
        title: '',
        description: '',
        date: '',
        location: '',
        price: '',
        seats: '',
        category: 'Technology',
      });
      onEventAdded(); // reload events
    } catch (err) {
      alert('❌ Failed to add event');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold">Add New Event</h3>
      {['title', 'description', 'location', 'price', 'seats'].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      ))}
      <input
        type="datetime-local"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option>Technology</option>
        <option>Business</option>
        <option>Art</option>
        <option>Music</option>
      </select>
      <button
        type="submit"
        className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
      >
        Add Event
      </button>
    </form>
  );
};

export default EventForm;
