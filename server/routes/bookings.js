const router = require('express').Router();
const bookings = require('../data/bookings.json');

router.get('/', (req, res) => {
  res.send(bookings);
});

module.exports = router;
