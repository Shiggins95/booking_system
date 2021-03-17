const mongoose = require('mongoose');

const stylistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  bookings: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Booking',
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  services: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Service',
    required: true,
  },
});

module.exports = mongoose.model('Stylist', stylistSchema);
