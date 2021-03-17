import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageProps } from './ConfirmationPopup';
import './ServiceSelectStyles.css';
import { ReducerState } from '../../Redux/reducers';
import { AvailabilityReducerState } from '../../Redux/reducers/AvailabilityReducer';
import SelectInput from '../Inputs/SelectInput';
import { _setConfirmationFormValue } from '../../Redux/actions';
import { ConfirmationFormState } from '../../Redux/reducers/ConfirmationFormReducer';

const ServiceSelect = ({ next }:PageProps) => {
  const { stylist } = useSelector((state: ReducerState):AvailabilityReducerState => state.availability);
  const { service } = useSelector((state: ReducerState):ConfirmationFormState => state.confirmForm);
  if (!stylist) {
    return null;
  }
  const dispatch = useDispatch();
  const { services } = stylist;
  const inputValues = services.map((_service) => ({ value: _service._id, text: _service.name }));
  const handleChange = (value: string|number) => {
    dispatch(_setConfirmationFormValue({ value: value.toString(), key: 'service' }));
  };
  return (
    <div className="select_service_container">
      <div className="title">
        <h1>Select Service</h1>
      </div>
      <div className="content">
        <SelectInput values={inputValues} onChange={handleChange} currentValue={service} />
      </div>
      <div className="footer">
        <button type="button" onClick={() => next()}>Next</button>
      </div>
    </div>
  );
};

export default ServiceSelect;
