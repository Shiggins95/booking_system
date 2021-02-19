/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import './Showcase.css';
import ShowcaseImage4 from '../../Assets/Images/scissors.jpeg';

interface ShowcaseProps {
    scrollToHair: () => void;
    scrollToBeauty: () => void;
}

const HairSection = ({ scrollToHair, scrollToBeauty }: ShowcaseProps) => (
  <div id="showcase">
    <div className="left">
      <div className="title">
        <h1>
          Shigs Salon Services
        </h1>
        <h2>
          WHERE STYLE IS KEY
        </h2>
      </div>
      <div className="enquire">
        <button type="button" onClick={scrollToHair}>
          Book Hair Appointment
        </button>
        <button type="button" onClick={scrollToBeauty}>
          Book Beauty Appointment
        </button>
      </div>
    </div>
    <div className="right" />
  </div>
);

export default HairSection;
