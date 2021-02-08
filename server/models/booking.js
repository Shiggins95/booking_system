const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
