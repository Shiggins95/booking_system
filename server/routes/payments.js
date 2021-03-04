const router = require('express').Router();
const stripe = require('stripe')('sk_test_ptrilgY8VaHZpbahZgEYAolX00zx0tpUn2');
const fetch = require('node-fetch');

const Service = require('../models/service');
// eslint-disable-next-line arrow-body-style
const calculateOrderAmount = async (items) => {
// TODO replace with actual calculation
  let total = 0;
  for (const { id } of items) {
    console.log('SERVICE ID: ', id);
    const { price } = await Service.findOne({ _id: id });
    console.log('PRICE: ', price);
    total += price;
  }
  return total * 100;
};

router.post('/create_payment_intent', async (req, res) => {
  const { items, email } = req.body;
  console.log(items);
  const amount = await calculateOrderAmount(items);
  console.log('AMOUNT: ', amount);
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    receipt_email: email,
    currency: 'gbp',
    customer: email,
  });
  return res.status(200).send({ clientSecret: paymentIntent.client_secret });
});

router.post('/new_customer', async (req, res) => {
  const customer = await stripe.customers.create({
    name: 'Stephen Higgins',
    email: 'stephen.higgins1995@gmail.com',
    description: 'Test Customer Stephen Higgins',
  });
  return res.status(200).send(customer);
});

module.exports = router;
