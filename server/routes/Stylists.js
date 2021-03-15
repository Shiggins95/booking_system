const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Stylist = require('../models/stylist');
const Service = require('../models/service');
const Booking = require('../models/booking');
const { createToken } = require('../auth/token');
const { validateCreate } = require('../auth/validation');

router.post('/newStylist', async (req, res) => {
  const {
    email, password, name, type, services,
  } = req.body;
  // validate body using validation schema in validateCreate
  const { error } = validateCreate(req.body);
  // return if error
  if (error) {
    return res.status(400).send({ error: true, message: error.details });
  }
  // check if user already exists
  const foundStylist = await Stylist.findOne({ email });
  // return error if found
  if (foundStylist) {
    return res.status(400).send({ error: true, message: 'Stylist exists' });
  }
  const foundServices = await Service.find({ _id: { $in: services } });
  if (!foundServices || (foundServices && foundServices.length === 0)) {
    return res.status(400).send({ error: true, message: 'Services not found' });
  }
  let appropriateStylist = true;
  foundServices.forEach((service) => {
    const { category } = service;
    if (category !== type) {
      appropriateStylist = false;
    }
  });
  if (!appropriateStylist) {
    return res.status(400).send({ error: true, message: 'Type/Category mismatch for services' });
  }
  // generate salt
  const salt = await bcrypt.genSalt();
  // hash password
  const hashPw = await bcrypt.hash(password, salt);
  // create user
  const user = new Stylist({
    email,
    password: hashPw,
    name,
    type,
    services,
  });
  try {
    // save user
    const savedStylist = await user.save();
    for (const service of foundServices) {
      const { stylists } = service;
      stylists.push(savedStylist._id);
      await Service.updateOne({ _id: service._id }, { $set: { stylists } });
    }
    // generate token for user id
    const token = createToken({ _id: savedStylist._id });
    // update response
    return res.status(200).send({ token });
  } catch (e) {
    // return error if thrown
    return res.status(400).send({ error: true, message: e });
  }
});

router.get('/getStylist/:stylistId', async (req, res) => {
  // find user
  const foundStylist = await Stylist
    .findOne({ _id: req.params.stylistId })
    .populate({ path: 'services', model: 'Service' })
    .populate({ path: 'bookings', model: 'Booking' });
  // return error if not found
  if (!foundStylist) {
    return res.status(400).send({ error: true, message: 'Stylist not found' });
  }

  // return new token with user id
  return res.status(200).send({ user: foundStylist });
});

router.get('/hair', async (req, res) => {
  const hairStylists = await Stylist.find({ type: 'hair' })
    .populate({ path: 'services', model: 'Service' })
    .populate({ path: 'bookings', model: 'Booking' });
  return res.status(200).send({ stylists: hairStylists });
});

router.get('/beauty', async (req, res) => {
  const beautyStylists = await Stylist.find({ type: 'beauty' })
    .populate({ path: 'services', model: 'Service' })
    .populate({ path: 'bookings', model: 'Booking' });
  return res.status(200).send({ stylists: beautyStylists });
});

router.get('/', async (req, res) => {
  const users = await Stylist.find();
  res.send(users);
});

module.exports = router;
