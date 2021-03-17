const router = require('express').Router();
const stripe = require('stripe')('sk_test_ptrilgY8VaHZpbahZgEYAolX00zx0tpUn2');
const Service = require('../models/service');
const { createPaymentIntent } = require('../payments/stripe');

const calculateOrderAmount = async (items) => {
  let total = 0;
  for (const { id } of items) {
    const { price } = await Service.findOne({ _id: id });
    total += price;
  }
  return total * 100;
};

router.post('/create_payment_intent', async (req, res) => {
  const { items, email } = req.body;
  const amount = await calculateOrderAmount(items);
  const paymentIntent = await createPaymentIntent({ email, amount });
  return res.status(200).send({ clientSecret: paymentIntent.client_secret, intentId: paymentIntent.id });
});

router.post('/update_payment_intent', async (req, res) => {
  const { customer, intentId } = req.body;
  if (!customer) {
    return res.status(400).send({ error: true, message: 'Missing required value, Customer' });
  }
  await stripe.paymentIntents.update(intentId, { customer });
  return res.status(200).send({ error: false });
});

module.exports = router;
