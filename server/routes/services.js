const router = require('express').Router();
const Service = require('../models/service');

router.post('/newService', async (req, res) => {
  const { name, price, category } = req.body;
  const categories = ['hair', 'beauty'];

  if (!name || !price || !category) {
    return res.status(400).send({ error: true, message: 'Missing required value. Name, Price or Category' });
  }
  if (categories.indexOf(category) === -1) {
    return res.status(400).send({ error: true, message: `Invalid category '${category}'` });
  }

  const service = new Service({
    name,
    price,
    category,
  });

  try {
    const savedService = await service.save();
    return res.status(200).send({ error: false, service: savedService });
  } catch (e) {
    return res.status(400).send({ error: true, message: e });
  }
});

module.exports = router;
