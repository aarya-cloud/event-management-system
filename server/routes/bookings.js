import express from 'express';
import { createBooking, getUserBookings, deleteBooking } from '../controllers/bookingController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// POST /api/bookings - Book an event
router.post('/', verifyToken, createBooking);

router.get('/user/:id', verifyToken, getUserBookings);

router.delete('/:bookingId', verifyToken, deleteBooking);

export default router;
