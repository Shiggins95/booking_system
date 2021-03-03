/* eslint-disable no-unused-vars */
import React, {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import {
  Elements, CardNumberElement, CardExpiryElement, CardCvcElement, CardElement, useElements,
} from '@stripe/react-stripe-js';
import { loadStripe, StripeCardCvcElementChangeEvent, StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { PageProps } from './ConfirmationPopup';
import './PaymentPageStyles.css';
import CheckoutForm from './CheckoutForm';

const getStripe = () => {
  const key = process.env.REACT_APP_STRIPE_KEY;
  return key || '';
};

const stripePromise = loadStripe(getStripe());
const PaymentPage = ({ next, back }: PageProps) => {
  console.log('payment page');
  const handleSubmit = () => {
    const x = document.querySelector('[name="cardnumber"]');
    console.log(x);
  };

  return (
    <div id="payment_page_container">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default PaymentPage;
