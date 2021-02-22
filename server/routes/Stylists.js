const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Stylist = require('../models/stylist');
const { createToken } = require('../auth/token');
const { validateCreate } = require('../auth/validation');

router.post('/newStylist', async (req, res) => {
  const { email, password, name } = req.body;
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
  // generate salt
  const salt = await bcrypt.genSalt();
  // hash password
  const hashPw = await bcrypt.hash(password, salt);
  // create user
  const user = new Stylist({
    email,
    password: hashPw,
    name,
  });
  try {
    // save user
    const savedStylist = await user.save();
    // generate token for user id
    const token = createToken({ _id: savedStylist._id });
    // update response
    return res.status(200).send({ token });
  } catch (e) {
    // return error if thrown
    return res.status(400).send(e);
  }
});

router.get('/getStylist/:stylistId', async (req, res) => {
  // find user
  const foundStylist = await Stylist.findOne({ _id: req.params.stylistId });
  // return error if not found
  if (!foundStylist) {
    return res.status(400).send({ error: true, message: 'Stylist not found' });
  }
  // return new token with user id
  return res.status(200).send({ token: createToken({ _id: foundStylist._id }), user: foundStylist });
});

router.get('/', async (req, res) => {
  const users = await Stylist.find();
  res.send(users);
});

module.exports = router;
