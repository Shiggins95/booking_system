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

// app.use(express.static(path.join(__dirname, '..', 'build')));
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// });
// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// });
app.use(cors());
app.use(verifyToken);
app.use(express.json());
app.use('/bookings', bookingsRouter);
app.use('/token', tokensRouter);
app.use('/stylists', usersRouter);
app.use('/clients', clientsRouter);
app.use('/services', servicesRouter);
app.get('/*', (req, res) => {
  res.status(404).send({ error: true, message: 'NOT_FOUND' });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
