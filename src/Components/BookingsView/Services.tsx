import React from 'react';
import { useSelector } from 'react-redux';
import { ReducerState } from '../../Redux/reducers';
import { AvailabilityReducerState } from '../../Redux/reducers/AvailabilityReducer';

const Services = () => {
  const { stylist } = useSelector((state: ReducerState):AvailabilityReducerState => state.availability);
  return stylist ? (
    <div id="services_and_prices_container">
      <h1>Services & Prices</h1>
    </div>
  ) : null;
};

export default Services;
