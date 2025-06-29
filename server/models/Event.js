import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  seats: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ['Technology', 'Art', 'Business', 'Music'],
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
