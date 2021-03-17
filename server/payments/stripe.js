/* eslint-disable arrow-body-style */
const stripe = require('stripe')('sk_test_ptrilgY8VaHZpbahZgEYAolX00zx0tpUn2');

const createPaymentIntent = async ({ amount, customer, email }) => {
  return stripe.paymentIntents.create({
    amount,
    receipt_email: email,
    currency: 'gbp',
    customer,
  });
};
const createStripeCustomer = async ({ name, email, description }) => {
  return stripe.customers.create({
    name,
    email,
    description: description || '',
  });
};

module.exports = { createPaymentIntent, createStripeCustomer };
