import React from 'react';
import './Home.css';
import Showcase from './Showcase';
import Services from './Services';
import Gallery from './Gallery';

const HomeContainer = () => {
  console.log('home test');
  return (
    <div id="home_container">
      <Showcase />
      <Services />
      <Gallery />
    </div>
  );
};

HomeContainer.propTypes = {};

export default HomeContainer;
