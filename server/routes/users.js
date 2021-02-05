const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { createToken } = require('../auth/token');

router.post('/newUser', async (req, res) => {
  const { email, password, name } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPw = await bcrypt.hash(password, salt);
  const user = new User({
    email,
    password: hashPw,
    name,
  });
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(400).send({ error: true, message: 'User exists' });
  }
  try {
    const savedUser = await user.save();
    const token = createToken({ _id: savedUser._id });
    return res.status(200).send({ token });
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;
