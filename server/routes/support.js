import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Support request route
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,     // your sender email
        pass: process.env.EMAIL_PASS,     // your app password
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.SUPPORT_RECEIVER_EMAIL || process.env.EMAIL_USER, // default to your own if not set
      subject: `🛠 Support Request from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Support request sent successfully.' });
  } catch (error) {
    console.error('❌ Error sending support email:', error);
    res.status(500).json({ message: 'Failed to send support request', error: error.message });
  }
});

export default router;
