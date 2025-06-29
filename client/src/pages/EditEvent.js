import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    price: '',
    seats: '',
    category: '',
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios.get(`/events/${id}`);
      const { title, description, date, location, price, seats, category } = res.data;
      setForm({ title, description, date: date.slice(0, 10), location, price, seats, category });
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/events/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('✅ Event updated successfully');
      navigate('/admin');
    } catch (err) {
      alert('Failed to update event');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'description', 'location', 'category'].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full border px-4 py-2 rounded"
            required
          />
        ))}
        <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full border px-4 py-2 rounded" required />
        <input type="number" name="seats" value={form.seats} onChange={handleChange} placeholder="Seats" className="w-full border px-4 py-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
