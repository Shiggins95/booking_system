const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  bookings: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Booking',
    required: false,
  },
  stripeId: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Client', clientSchema);
