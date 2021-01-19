import React, { useRef } from 'react';
import './Home.css';
import Showcase from './Showcase';
import Services from './Services';
import Gallery from './Gallery';

const HomeContainer = () => {
  console.log('home test');
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToServices = () => {
    if (!scrollRef.current) {
      return;
    }
    scrollRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };
  return (
    <div id="home_container">
      <Showcase scrollTo={scrollToServices} />
      <Services refProp={scrollRef} />
      <Gallery />
    </div>
  );
};

HomeContainer.propTypes = {};

export default HomeContainer;
