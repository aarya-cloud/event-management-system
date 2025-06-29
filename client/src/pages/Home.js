import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('Date');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/events');
        setEvents(res.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);
  
  useEffect(() => {
  const fetchEvents = async () => {
    try {
      const res = await axios.get('/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false); // Important!
    }
  };

  fetchEvents();
}, []);

  const filteredEvents = events
  .filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || 
                          event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  })
  .sort((a, b) => {
    if (sortOption === 'Date') {
      return new Date(a.date) - new Date(b.date); // upcoming first
    }
    if (sortOption === 'PriceLow') {
      return a.price - b.price; // low to high
    }
    if (sortOption === 'PriceHigh') {
      return b.price - a.price; // high to low
    }
    return 0;
  });


  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Upcoming Events</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover amazing events happening near you
        </p>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <select 
            className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-gray-700"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Art">Art</option>
            <option value="Business">Business</option>
            <option value="Music">Music</option>
          </select>
          {/* Sort Option */}
 	  <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} 	className="border p-2 rounded">
    	  <option value="Date">Date (Upcoming First)</option>
    	  <option value="PriceLow">Price (Low to High)</option>
    	  <option value="PriceHigh">Price (High to Low)</option>
  	  </select>
        </div>
      </div>

      {/* Event Cards Grid */}
      {loading ? (
  <div className="flex justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-pink-500 border-solid"></div>
  </div>
) : filteredEvents.length === 0 ? (
  <div className="text-center py-12">
    <p className="text-gray-600">No events match your search criteria.</p>
  </div>
) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div 
              key={event._id} 
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300 border border-gray-100"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full
                    ${event.category === 'Music' && 'bg-purple-100 text-purple-800'} 
                    ${event.category === 'Art' && 'bg-indigo-100 text-indigo-800'}
                    ${event.category === 'Technology' && 'bg-blue-100 text-blue-800'}
                    ${event.category === 'Business' && 'bg-green-100 text-green-800'}
                  `}>
                    {event.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
                
                <h2 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h2>
                
                <div className="space-y-2 text-gray-600 mb-4 text-sm">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {new Date(event.date).toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">₹{event.price}</span>
                    <span className="text-gray-500 mx-2">•</span>
                    <span className="text-gray-500">{event.seats} seats</span>
                  </div>
                  <button
                    className="px-3 py-1.5 text-sm bg-pink-50 text-pink-600 rounded-md hover:bg-pink-100 transition flex items-center"
                    onClick={() => navigate(`/events/${event._id}`)}
                  >
                    Details
                    <svg className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;