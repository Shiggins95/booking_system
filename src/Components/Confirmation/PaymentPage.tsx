import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PageProps } from './ConfirmationPopup';
import './PaymentPageStyles.css';
import CheckoutForm from './CheckoutForm';

const getStripe = () => {
  const key = process.env.REACT_APP_STRIPE_KEY;
  return key || '';
};

const stripePromise = loadStripe(getStripe());
const PaymentPage = ({ back }: PageProps) => (
  <div id="payment_page_container">
    <Elements stripe={stripePromise}>
      <CheckoutForm back={back} />
    </Elements>
  </div>
);

export default PaymentPage;
