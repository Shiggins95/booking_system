const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bookingsRouter = require('./routes/bookings');
const tokensRouter = require('./routes/token');
const usersRouter = require('./routes/Stylists');
const { verifyToken } = require('./auth/token');
const clientsRouter = require('./routes/clients');
const servicesRouter = require('./routes/services');
const paymentsRouter = require('./routes/payments');
require('dotenv').config();

const app = express();
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (err) {
      console.log(`unable to connect: ${err}`);
    } else {
      console.log('connected to db');
    }
  },
);
app.use(cors());
app.use(verifyToken);
app.use(express.json());
app.use('/api/bookings', bookingsRouter);
app.use('/api/token', tokensRouter);
app.use('/api/stylists', usersRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/payments', paymentsRouter);
app.get('/*', (req, res) => {
  res.status(404).send({ error: true, message: 'NOT_FOUND' });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
