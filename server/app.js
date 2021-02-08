const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bookingsRouter = require('./routes/bookings');
const tokensRouter = require('./routes/token');
const usersRouter = require('./routes/users');
const { verifyToken } = require('./auth/token');
require('dotenv').config();

const app = express();
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to db');
  },
);

app.use(verifyToken);
app.use(express.json());
app.use(cors());
app.use('/bookings', bookingsRouter);
app.use('/token', tokensRouter);
app.use('/users', usersRouter);
app.get('/*', (req, res) => {
  res.status(404).send({ error: true, message: 'NOT_FOUND' });
});

const PORT = 8080;

app.get('/', (req, res) => {
  res.send({ PORT });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
