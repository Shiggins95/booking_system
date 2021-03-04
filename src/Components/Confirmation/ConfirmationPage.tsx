import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageProps } from './ConfirmationPopup';
import TextInput from '../Inputs/TextInput';
import './ConfirmationPage.css';
import { _setConfirmationFormValue } from '../../Redux/actions';
import { ReducerState } from '../../Redux/reducers';
import { ConfirmationFormState } from '../../Redux/reducers/ConfirmationFormReducer';

const ConfirmationPage = ({ next, back }: PageProps) => {
  const { name, email } = useSelector((state: ReducerState): ConfirmationFormState => state.confirmForm);
  const dispatch = useDispatch();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        <TextInput
          defaultValue={name || ''}
          type="text"
          label="Client Name"
          id="customer_name"
          className=""
          onChange={handleChange}
        />
        <TextInput
          defaultValue={email || ''}
          type="email"
          label="Client Email"
          id="customer_email"
          className=""
          onChange={handleChange}
        />
      </div>
      <div className="footer">
        <button type="button" onClick={back}>Back</button>
        <button type="button" onClick={() => next()}>Next</button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
