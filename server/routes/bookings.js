const router = require('express').Router();
// const bookings = require('../data/bookings.json');
const User = require('../models/user');
const Booking = require('../models/booking');

router.get('/', (req, res) => {
  res.send([]);
});

router.post('/newBooking', async (req, res) => {
  const { userId, body: { date } } = req;
  // find user using id from request (passed via verify middleware)
  const foundUser = await User.findOne({ _id: userId });
  // error handling if no user found
  if (!foundUser) {
    return res.status(400).send({ error: true, message: 'User not found' });
  }
  // convert date string to date object
  const formattedDate = new Date(date);
  // get bookings from user to add new booking to
  const { bookings } = foundUser;
  // create new booking using date passed in, and assigning user
  const booking = new Booking({ date: formattedDate, user: foundUser._id });
  // save booking
  const savedBooking = await booking.save();
  // add new booking to users bookings list
  bookings.push(savedBooking._id);
  // update user with new bookings
  await User.updateOne({ _id: userId }, { $set: { bookings } });
  // update response
  res.send({ bookingId: savedBooking._id });
});

router.post('/cancelBooking', async (req, res) => {
  const { userId, body: { bookingId } } = req;
  // find user using id from request (passed via verify middleware)
  const foundUser = await User.findOne({ _id: userId });
  // find the booking using bookingId in body
  const foundBooking = await Booking.findOne({ _id: bookingId });
  // error handling if booking / user not found
  if (!foundUser) {
    return res.status(400).send({ error: true, message: 'User not found' });
  }
  if (!foundBooking) {
    return res.status(400).send({ error: true, message: 'Booking not found' });
  }
  // error handle if no bookings for user
  const { bookings } = foundUser;
  if (bookings.length === 0) {
    return res.status(400).send({ error: true, message: 'No bookings for user' });
  }
  // filter out booking to be deleted from users list of bookings
  const newBookings = bookings.filter((booking) => booking.toString() !== bookingId.toString());
  // update user with list of new bookings
  await User.updateOne({ _id: userId }, { $set: { bookings: newBookings } });
  // delete booking
  await Booking.deleteOne({ _id: bookingId });
  // update response
  return res.status(200).send({ message: 'Booking removed' });
});
module.exports = router;
