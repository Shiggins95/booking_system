const router = require('express').Router();
const stripe = require('stripe')('sk_test_ptrilgY8VaHZpbahZgEYAolX00zx0tpUn2');

// eslint-disable-next-line arrow-body-style
const calculateOrderAmount = (items) => {
// TODO replace with actual calculation
  return 1797;
};

router.post('/create_payment_intent', async (req, res) => {
  const { items } = req.body;
  console.log(items);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount([]),
    currency: 'gbp',
  });
  console.log(paymentIntent);
  return res.status(200).send({ clientSecret: paymentIntent.client_secret });
});

module.exports = router;
