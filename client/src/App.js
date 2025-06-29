import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import EventDetails from './pages/EventDetails';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import EditEvent from './pages/EditEvent';
import BookEvent from './pages/BookEvent';
import Support from './pages/Support';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

function App() {
  return (
    <BrowserRouter>
      <div className="flex-col min-h-screen bg-gray-100 text-gray-900">
        <Navbar />
        <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
 	    <Route path="/events/:id" element={<EventDetails />} />
	    <Route path="/dashboard" element={<Dashboard />} />
 	    <Route path="/admin" element={<AdminPanel />} />
	    <Route path="/admin/edit/:id" element={<EditEvent />} />
     	    <Route path="/book/:id" element={<BookEvent />} />
 	    <Route path="/support" element={<Support />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
	    <Route path="/terms" element={<TermsAndConditions />} />
          </Routes>
        </main>
        <ToastContainer position="bottom-right" autoClose={3000} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
