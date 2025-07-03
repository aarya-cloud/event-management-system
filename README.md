# 🎟️ Event Management System

A full-stack web application for browsing, booking, and managing events. Built using the MERN stack (MongoDB, Express, React, Node.js), this project allows users to explore upcoming events, book tickets, receive email confirmations, and manage their bookings via a dashboard.

---

## 🔧 Features

- 🗓️ **Event Listings** – Browse events with filters (category, date, price).
- 🔍 **Search & Sort** – Real-time search and sorting functionality.
- ✅ **User Authentication** – Secure login/signup using JWT.
- 🛒 **Booking System** – Book events and receive confirmation emails with QR codes.
- 🧾 **User Dashboard** – View and cancel bookings.
- 📨 **Email Notifications** – Booking confirmation with event details.
- 📱 **Responsive UI** – Clean and responsive interface using Tailwind CSS.
- 🛠️ **Admin Panel** – Add/edit/delete events.

---

## 🖥️ Tech Stack

**Frontend**:  
- React.js  
- Tailwind CSS  
- Axios  
- React Router

**Backend**:  
- Node.js  
- Express.js  
- MongoDB with Mongoose  
- JWT Authentication  
- Nodemailer for emails  
- QR Code generation

---

## 📦 Setup Instructions

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/event-management-system.git
   cd event-management-system/server
   
2. Install dependencies:
npm install

3. Create a .env file and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

4. Start the server:
npm run dev

<b>Frontend</b>
1. Go to the client folder:
cd ../client

2. Install dependencies:
npm install

3. Add .env file with:
REACT_APP_API_BASE_URL=https://your-backend-url/api

4. Run the React app:
npm start


🌐 <b>Deployment</b>

Frontend: [Netlify/Vercel](https://68614b08511d55be245141b0--eventmanagement2025.netlify.app/)
Backend: [Render/Railway](https://event-management-system-q7r9.onrender.com/api)


Check out the live demo of the project here:
https://drive.google.com/file/d/1QguA6P9NZyG80ytPIeUIFrXqcUMSS8au/view?usp=share_link

✍️ Author
Aarya Patankar

📃 License
This project is licensed under the MIT License.
