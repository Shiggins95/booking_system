const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
    required: true,
  },
  bookings: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Booking',
    required: false,
  },
});

module.exports = mongoose.model('User', userSchema);
