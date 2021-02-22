const router = require('express').Router();
const Client = require('../models/client');
const { validateClientCreate } = require('../auth/validation');

router.get('/getClient/:clientEmail', async (req, res) => {
  const { clientEmail } = req.params;
  const foundClient = await Client.findOne({ email: clientEmail });
  if (!foundClient) {
    return res.status(400).send({ error: true, message: 'client not found' });
  }
  return res.status(200).send({ error: false, client: foundClient });
});

router.post('/newClient', async (req, res) => {
  const { email, phoneNumber, name } = req.body;
  console.log(req.body);
  const foundClient = await Client.findOne({ email });
  if (foundClient) {
    return res.status(400).send({ error: true, message: 'client already exists' });
  }

  const { error } = validateClientCreate(req.body);
  if (error) {
    return res.status(400).send({ error: true, message: error.details });
  }

  const newClient = new Client({ email, phoneNumber, name });

  try {
    // save user
    const savedClient = await newClient.save();
    return res.status(200).send({ error: false, message: 'client created', id: savedClient._id });
  } catch (e) {
    // return error if thrown
    return res.status(400).send(e);
  }
});

module.exports = router;
