/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Elements, CardNumberElement, CardExpiryElement, CardCvcElement, CardElement,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PageProps } from './ConfirmationPopup';
import './PaymentPageStyles.css';

const getStripe = () => {
  const key = process.env.REACT_APP_STRIPE_KEY;
  return key || '';
};

const stripePromise = loadStripe(getStripe());
const PaymentPage = ({ next, back }: PageProps) => {
  console.log('payment page');
  const handleSubmit = () => {
    console.log('submitting');
  };
  const elementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: 'rgb(255, 166, 202)',
        '::placeholder': {
          color: 'rgba(255, 166, 202, 0.5)',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
  return (
    <div id="payment_page">
      <div className="title">
        <h1>Client Information</h1>
      </div>
      <Elements stripe={stripePromise}>
        <form onSubmit={handleSubmit}>
          <div className="element el0">
            <p>Card Number</p>
            <CardNumberElement
              className="card_element"
              options={elementOptions}
            />
          </div>
          <div className="element el1">
            <p>Expiry Date</p>
            <CardExpiryElement
              className="card_expiry"
              options={elementOptions}
            />
          </div>
          <div className="element el2">
            <p>Security Code</p>
            <CardCvcElement
              className="card_security"
              options={elementOptions}
            />
          </div>
        </form>
      </Elements>
      <div className="footer">
        <button type="button" onClick={back}>Back</button>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default PaymentPage;
