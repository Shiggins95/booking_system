const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  console.log(req.originalUrl);
  if (req.originalUrl.split('/')[1] === 'token') {
    return next();
  }
  if (req.originalUrl.indexOf('/users/newUser') !== -1 || req.originalUrl.indexOf('/users/getUser') !== -1) {
    return next();
  }
  const { token } = req.headers;
  if (!token) return res.status(401).send({ error: true, message: 'Invalid Token' });
  try {
    const { expiry, _id } = jwt.verify(token, process.env.TOKEN_SECRET);
    if (expiry < new Date().getTime()) {
      return res.status(401).send({ error: true, message: 'Invalid Token' });
    }
    req.stylistId = _id;
    return next();
  } catch (e) {
    return res.status(401).send({ error: true, message: e });
  }
};

const createToken = (params) => {
  const date = new Date();
  date.setHours(date.getHours() + 1);
  return jwt.sign({ ...params, expiry: date.getTime() }, process.env.TOKEN_SECRET);
};

module.exports = { verifyToken, createToken };
