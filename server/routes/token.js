const router = require('express').Router();
const { createToken } = require('../auth/token');

router.get('/getToken', (req, res) => {
  res.send({ token: createToken({ email: 'testemail@gmail.com' }) });
});

module.exports = router;
