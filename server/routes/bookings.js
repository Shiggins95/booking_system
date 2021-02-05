const router = require('express').Router();
// const bookings = require('../data/bookings.json');
const User = require('../models/user');
const Booking = require('../models/booking');

router.get('/', (req, res) => {
  res.send([]);
});

router.post('/newBooking', async (req, res) => {
  const { userId, body: { date } } = req;
  const foundUser = await User.findOne({ _id: userId });
  const formattedDate = new Date(date);
  if (!foundUser) {
    return res.status(400).send({ error: true, message: 'User not found' });
  }
  const { bookings } = foundUser;
  const booking = new Booking({ date: formattedDate, user: foundUser._id });
  const savedBooking = await booking.save();
  bookings.push(savedBooking._id);
  await User.updateOne({ _id: userId }, { $set: { bookings } });
  res.send({ bookingId: savedBooking._id });
});

router.post('/cancelBooking', async (req, res) => {
  const { userId, body: { bookingId } } = req;
  console.log('booking id', bookingId);
  const foundUser = await User.findOne({ _id: userId });
  const foundBooking = await Booking.findOne({ _id: bookingId });
  if (!foundUser) {
    return res.status(400).send({ error: true, message: 'User not found' });
  }
  if (!foundBooking) {
    return res.status(400).send({ error: true, message: 'Booking not found' });
  }
  const { bookings } = foundUser;
  if (bookings.length === 0) {
    return res.status(400).send({ error: true, message: 'No bookings for user' });
  }
  console.log('bookings', bookings);
  const newBookings = bookings.filter((booking) => booking.toString() !== bookingId.toString());
  console.log('new bookings', newBookings);
  await User.updateOne({ _id: userId }, { $set: { bookings: newBookings } });
  await Booking.deleteOne({ _id: bookingId });
  return res.status(200).send({ message: 'Booking removed' });
});
module.exports = router;
