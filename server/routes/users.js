const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { createToken } = require('../auth/token');
const { validateCreate } = require('../auth/validation');

router.post('/newUser', async (req, res) => {
  const { email, password, name } = req.body;
  // validate body using validation schema in validateCreate
  const { error } = validateCreate(req.body);
  // return if error
  if (error) {
    return res.status(400).send({ error: true, message: error.details });
  }
  // check if user already exists
  const foundUser = await User.findOne({ email });
  // return error if found
  if (foundUser) {
    return res.status(400).send({ error: true, message: 'User exists' });
  }
  // generate salt
  const salt = await bcrypt.genSalt();
  // hash password
  const hashPw = await bcrypt.hash(password, salt);
  // create user
  const user = new User({
    email,
    password: hashPw,
    name,
  });
  try {
    // save user
    const savedUser = await user.save();
    // generate token for user id
    const token = createToken({ _id: savedUser._id });
    // update response
    return res.status(200).send({ token });
  } catch (e) {
    // return error if thrown
    return res.status(400).send(e);
  }
});

router.get('/getUser/:userId', async (req, res) => {
  // find user
  const foundUser = await User.findOne({ _id: req.params.userId });
  // return error if not found
  if (!foundUser) {
    return res.status(400).send({ error: true, message: 'User not found' });
  }
  // return new token with user id
  return res.status(200).send({ token: createToken({ _id: foundUser._id }), user: foundUser });
});

router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

module.exports = router;
