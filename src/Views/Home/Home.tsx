import React, { useEffect, useRef } from 'react';
import './Home.css';
import { useDispatch } from 'react-redux';
import Showcase from './Showcase';
import Services from './Services';
import Gallery from './Gallery';
import { _setNavbarClosed } from '../../Redux/actions';

const HomeContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(_setNavbarClosed());
    window.scrollTo(0, 0);
  }, []);
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
