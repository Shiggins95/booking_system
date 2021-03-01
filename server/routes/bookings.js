const router = require('express').Router();
// const bookings = require('../data/bookings.json');
const Stylist = require('../models/stylist');
const Booking = require('../models/booking');
const Client = require('../models/client');
const Service = require('../models/service');

router.get('/', (req, res) => {
  res.send([]);
});

router.post('/newBooking', async (req, res) => {
  const {
    body: {
      date, clientId, stylistId, serviceId,
    },
  } = req;
  // return error if missing param
  if (!clientId || !stylistId || !date) {
    return res.status(400).send({ error: true, message: 'Missing required parameter. Please check request body' });
  }
  // find stylist and return error if not found
  const foundStylist = await Stylist.findOne({ _id: stylistId });
  // error handling if no user found
  if (!foundStylist) {
    return res.status(400).send({ error: true, message: 'Stylist not found' });
  }
  // find client and return error if not found
  const foundClient = await Client.findOne({ _id: clientId });
  if (!foundClient) {
    return res.status(400).send({ error: true, message: 'Client not found' });
  }

  const foundService = await Service.findOne({ _id: serviceId });
  if (!foundService) {
    return res.status(400).send({ error: true, message: 'Service not found' });
  }
  // convert date string to date object
  const formattedDate = new Date(date);
  const hours = formattedDate.getHours();
  const mins = formattedDate.getMinutes();
  const time = `${hours}:${mins}`;
  // get bookings from client & stylist to add new booking to
  const { bookings, type } = foundStylist;
  const clientBookings = foundClient.bookings;
  const serviceBookings = foundService.bookings;
  const { category } = foundService;
  if (category !== type) {
    return res.status(400).send({ error: true, message: 'Type/Category mismatch for services' });
  }
  // create new booking using date passed in, and assigning stylist & client
  const booking = new Booking({
    date: formattedDate, stylist: foundStylist._id, client: foundClient._id, time, service: foundService._id,
  });
  // save booking
  const savedBooking = await booking.save();
  // add new booking to clients & stylists & service bookings list
  bookings.push(savedBooking._id);
  clientBookings.push(savedBooking._id);
  serviceBookings.push(savedBooking._id);
  // update user with new bookings
  await Stylist.updateOne({ _id: stylistId }, { $set: { bookings } });
  await Client.updateOne({ _id: foundClient._id }, { $set: { bookings: clientBookings } });
  await Service.updateOne({ _id: foundService._id }, { $set: { bookings: serviceBookings } });
  // update response
  return res.send({ bookingId: savedBooking._id });
});

router.get('/stylists/:stylistId', async (req, res) => {
  const { params: { stylistId } } = req;
  const foundStylist = await Stylist.findOne({ _id: stylistId });
  if (!foundStylist) {
    return res.status(400).send({ error: true, message: 'No stylist found for that id' });
  }
  const { bookings } = foundStylist;
  const bookingObjects = await Booking.find({ _id: { $in: bookings } });
  console.log('BO', bookingObjects);
  return res.status(200).send({ bookings: bookingObjects });
});

router.post('/cancelBooking', async (req, res) => {
  const { body: { bookingId } } = req;
  // find booking, and get stylist and client from it
  const foundBooking = await Booking.findOne({ _id: bookingId });
  const stylistId = foundBooking.stylist;
  const clientId = foundBooking.client;
  // find user using id from request (passed via verify middleware)
  const foundStylist = await Stylist.findOne({ _id: stylistId });
  const foundClient = await Client.findOne({ _id: clientId });
  // error handling if booking / client / stylist not found
  if (!foundStylist) {
    return res.status(400).send({ error: true, message: 'Stylist not found' });
  }
  if (!foundBooking) {
    return res.status(400).send({ error: true, message: 'Booking not found' });
  }
  if (!foundClient) {
    return res.status(400).send({ error: true, message: 'Client not found' });
  }
  // error handle if no bookings for user
  const { bookings } = foundStylist;
  const clientBookings = foundClient.bookings;
  // if (bookings.length === 0) {
  //   return res.status(400).send({ error: true, message: 'No bookings found for client / stylist to remove' });
  // }
  // filter out booking to be deleted from users list of bookings
  const newBookings = bookings.filter((booking) => booking.toString() !== bookingId.toString());
  const newClientBookings = clientBookings.filter((booking) => booking.toString() !== bookingId.toString());
  // update stylist & user with list of new bookings
  await Stylist.updateOne({ _id: stylistId }, { $set: { bookings: newBookings } });
  await Client.updateOne({ _id: clientId }, { $set: { bookings: newClientBookings } });
  // delete booking
  await Booking.deleteOne({ _id: bookingId });
  // update response
  return res.status(200).send({ message: 'Booking removed' });
});

module.exports = router;
