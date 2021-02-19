import React, { ChangeEvent } from 'react';
import { PageProps } from './ConfirmationPopup';
import TextInput from '../Inputs/TextInput';
import './ConfirmationPage.css';

const ConfirmationPage = ({ next }: PageProps) => {
  console.log('confirmation');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  return (
    <div id="confirmation_page">
      <div className="title">
        <h1>Client Information</h1>
      </div>
      <div className="inputs">
        <TextInput type="text" label="Client Name" id="customer_name" className="" onChange={handleChange} />
        <TextInput type="email" label="Client Email" id="customer_email" className="" onChange={handleChange} />
      </div>
      <div className="footer">
        <button type="button" onClick={() => next()}>Next</button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
