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
  return (
    <div id="payment_page">
      <button type="button" onClick={next}>Next</button>
      <button type="button" onClick={back}>Back</button>
      <Elements stripe={stripePromise}>
        <form action="">
          <CardNumberElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          <CardExpiryElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          <CardCvcElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </form>
        {/* {!loaded ? ( */}
        {/*  <div className="spinner_container"> */}
        {/*    <div className="lds-spinner"> */}
        {/*      <div /> */}
        {/*      <div /> */}
        {/*      <div /> */}
        {/*      <div /> */}
        {/*      <div /> */}
        {/*      <div /> */}
        {/*      <div /> */}
        {/*      <div /> */}
        {/*      <div /> */}
        {/*      <div /> */}
        {/*      <div /> */}
        {/*      <div /> */}
        {/*    </div> */}
        {/*  </div> */}
        {/* ) : null} */}
      </Elements>
    </div>
  );
};

export default PaymentPage;
