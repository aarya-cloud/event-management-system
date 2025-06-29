import express from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';

import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Anyone can view events
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Only authenticated users (admins) can create/delete
router.post('/', verifyToken, createEvent); // Optionally check for isAdmin
router.put('/:id', verifyToken, updateEvent);
router.delete('/:id', verifyToken, deleteEvent);

export default router;
