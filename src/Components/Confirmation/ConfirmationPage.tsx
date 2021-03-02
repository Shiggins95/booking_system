import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { PageProps } from './ConfirmationPopup';
import TextInput from '../Inputs/TextInput';
import './ConfirmationPage.css';
import { _setConfirmationFormValue } from '../../Redux/actions';

const ConfirmationPage = ({ next, back }: PageProps) => {
  console.log('confirmation');
  const dispatch = useDispatch();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    debugger;
    const key = event.target.id.split('customer_')[1];
    dispatch(
      _setConfirmationFormValue({
        value: event.target.value.toString(),
        key,
      }),
    );
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
        <button type="button" onClick={back}>Back</button>
        <button type="button" onClick={() => next()}>Next</button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
