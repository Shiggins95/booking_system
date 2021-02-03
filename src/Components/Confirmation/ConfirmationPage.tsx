import React from 'react';
import { PageProps } from './ConfirmationPopup';

const ConfirmationPage = ({ next }: PageProps) => {
  console.log('confirmation');
  return (
    <div id="confirmation_page">
      <button type="button" onClick={() => next()}>Next</button>
      confirm
    </div>
  );
};

export default ConfirmationPage;
