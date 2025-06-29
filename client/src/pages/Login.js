import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/');
      toast.success("Successfully logged in!");
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

return (
  <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 p-6 text-center">
        <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
        <p className="text-pink-100 mt-1">Sign in to your account</p>
      </div>

      {/* Form section */}
      <div className="p-6 space-y-5">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-pink-800 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-pink-800 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-pink-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-pink-700">
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-pink-400 text-white py-3 rounded-lg font-medium hover:from-pink-600 hover:to-pink-600 transition-all shadow-md"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-sm text-pink-600 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-pink-700 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  </div>
);
};

export default Login;
