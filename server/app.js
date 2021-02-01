const express = require('express');
const cors = require('cors');
const bookingsRouter = require('./routes/bookings');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/bookings', bookingsRouter);

const PORT = 8080;

app.get('/', (req, res) => {
  res.send({ PORT });
});

app.listen(PORT, (params) => {
  console.log(`listening on port ${params}`);
}, 'Hello World');
