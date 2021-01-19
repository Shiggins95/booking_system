import React, { RefObject } from 'react';
import './Services.css';
import { Link } from 'react-router-dom';
// import HairdressingImage from '../../Assets/Images/Hairdressing.jpeg';

interface ServicesProps {
    refProp: RefObject<HTMLDivElement>;
}
const Services = ({ refProp }:ServicesProps) => (
  <div id="services_container" ref={refProp}>
    <div className="left" />
    <div className="right">
      <h1>
        HAIR STYLING
      </h1>
      <h2>FROM THE BEST IN GLASGOW</h2>
      <Link to="/book">ENQUIRE NOW</Link>
    </div>
  </div>
);

export default Services;
