import React, { RefObject } from 'react';
import './HairBookingStyles.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { _setAvailabilityType } from '../../Redux/actions';

interface HairBookingProps {
    refProp: RefObject<HTMLDivElement>;
}
const HairBooking = ({ refProp }:HairBookingProps) => {
  const dispatch = useDispatch();
  const handleClick = () => (dispatch(_setAvailabilityType({ type: 'hair' })));
  return (
    <div id="services_container" ref={refProp}>
      <div className="left" />
      <div className="right">
        <h1>
          HAIR STYLING
        </h1>
        <h2>SELECT FROM AVAILABILITY CALENDAR</h2>
        <Link to="/availability" onClick={handleClick}>BOOK NOW</Link>
      </div>
    </div>
  );
};

export default HairBooking;
