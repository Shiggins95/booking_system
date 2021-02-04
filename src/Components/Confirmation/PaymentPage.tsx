import React from 'react';
import { PageProps } from './ConfirmationPopup';

const PaymentPage = ({ next, back }: PageProps) => {
  console.log('payment page');
  return (
    <div id="payment_page">
      <button type="button" onClick={next}>Next</button>
      <button type="button" onClick={back}>Back</button>
      payment
    </div>
  );
};

export default PaymentPage;
