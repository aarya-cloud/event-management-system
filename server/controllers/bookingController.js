import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import nodemailer from 'nodemailer';
import QRCode from 'qrcode';

export const createBooking = async (req, res) => {
  const { eventId, name, email, phone } = req.body;

  try {
    console.log('➡️ Booking Request:', { eventId, name, email, phone, userId: req.userId });

    if (!eventId || !name || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingBooking = await Booking.findOne({ user: req.userId, event: eventId });
    if (existingBooking) {
      return res.status(400).json({ message: 'You have already booked this event' });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.seats <= 0) return res.status(400).json({ message: 'No seats available' });

    const booking = new Booking({ user: req.userId, event: eventId, name, email, phone });
    await booking.save();

    event.seats -= 1;
    await event.save();

    // ✅ Generate QR Code
    const qrContent = `
      Event: ${event.title}
      Booking ID: ${booking._id}
      Name: ${name}
      Date: ${new Date(event.date).toLocaleString()}
      Location: ${event.location}
    `;
    
    const qrImageBuffer = await QRCode.toBuffer(qrContent);

    // 📧 Email Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `🎟️ Booking Confirmed - ${event.title}`,
      html: `
        <h2>Hi ${name},</h2>
        <p>Your booking for <strong>${event.title}</strong> is confirmed!</p>
        <ul>
          <li><strong>Date & Time:</strong> ${new Date(event.date).toLocaleString()}</li>
          <li><strong>Location:</strong> ${event.location}</li>
          <li><strong>Price:</strong> ₹${event.price}</li>
        </ul>
        <p>🎟️ Please present this QR code at the entrance:</p>
        <img src="cid:qrimage" alt="QR Code" width="200" />
        <p>Thanks,<br/>Eventify Team</p>
      `,
      attachments: [
        {
          filename: 'qrcode.png',
          content: qrImageBuffer,
          cid: 'qrimage', // same as referenced in the img tag
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Booking successful. Confirmation email with QR sent.' });

  } catch (err) {
    console.error('❌ Booking failed:', err.message);
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
};
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.id }).populate('event');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId).populate('event');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Optional: Check if the logged-in user owns the booking
    if (booking.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Increase seats back
    const event = await Event.findById(booking.event._id);
    if (event) {
      event.seats += 1;
      await event.save();
    }

    await booking.deleteOne();

    res.status(200).json({ message: 'Booking cancelled. You will be refunded soon.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete booking', error: err.message });
  }
}; 
