const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  stylist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stylist',
    required: false,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: false,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
