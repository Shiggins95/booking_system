import React from 'react';
import './Gallery.css';
import { Link } from 'react-router-dom';
// import BeautyImage from '../../Assets/Images/Beauty.jpeg';

const Gallery = () => (
  <div id="gallery_container">
    <div className="left">
      <h1>
        BEAUTY THERAPY
      </h1>
      <h2>FROM OUR HIGHLY TRAINED TECHNICIANS</h2>
      <Link to="/book">ENQUIRE NOW</Link>
    </div>
    <div className="right">
      right
    </div>
  </div>
);

export default Gallery;
