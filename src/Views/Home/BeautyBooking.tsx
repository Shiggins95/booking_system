import React, { RefObject } from 'react';
import './BeautyBookingStyles.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { _setAvailabilityType } from '../../Redux/actions';

interface BeautyBookingProps {
    refProp: RefObject<HTMLDivElement>;
}

const BeautyBooking = ({ refProp }:BeautyBookingProps) => {
  const dispatch = useDispatch();
  const handleClick = () => (dispatch(_setAvailabilityType({ type: 'beauty' })));
  return (
    <div id="gallery_container" ref={refProp}>
      <div className="left">
        <h1>
          BEAUTY THERAPY
        </h1>
        <h2>SELECT FROM AVAILABILITY CALENDAR</h2>
        <Link onClick={handleClick} to="/bookingsapp/availability">BOOK NOW</Link>
      </div>
      <div className="right" />
    </div>
  );
};

export default BeautyBooking;
