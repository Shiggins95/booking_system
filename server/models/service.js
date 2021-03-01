const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stylists: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Stylist',
    required: false,
  },
  bookings: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Booking',
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Service', ServiceSchema);
