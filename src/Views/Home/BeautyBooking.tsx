import React, { RefObject } from 'react';
import './Gallery.css';
import { Link } from 'react-router-dom';
// import BeautyImage from '../../Assets/Images/Beauty.jpeg';
interface BeautyBookingProps {
    refProp: RefObject<HTMLDivElement>;
}
const BeautyBooking = ({ refProp }:BeautyBookingProps) => (
  <div id="gallery_container" ref={refProp}>
    <div className="left">
      <h1>
        BEAUTY THERAPY
      </h1>
      <h2>SELECT FROM AVAILABILITY CALENDAR</h2>
      <Link to="/availability">BOOK NOW</Link>
    </div>
    <div className="right" />
  </div>
);

export default BeautyBooking;
