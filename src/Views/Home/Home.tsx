import React, { useEffect, useRef } from 'react';
import './Home.css';
import { useDispatch } from 'react-redux';
import TopSection from './TopSection';
import HairBooking from './HairBooking';
import BeautyBooking from './BeautyBooking';
import { _setNavbarClosed } from '../../Redux/actions';

const HomeContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(_setNavbarClosed());
    window.scrollTo(0, 0);
  }, []);
  const scrollRefHair = useRef<HTMLDivElement>(null);
  const scrollRefBeauty = useRef<HTMLDivElement>(null);
  const scrollToHair = () => {
    if (!scrollRefHair.current) {
      return;
    }
    scrollRefHair.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };
  const scrollToBeauty = () => {
    if (!scrollRefBeauty.current) {
      return;
    }
    scrollRefBeauty.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };
  return (
    <div id="home_container">
      <TopSection scrollToHair={scrollToHair} scrollToBeauty={scrollToBeauty} />
      <HairBooking refProp={scrollRefHair} />
      <BeautyBooking refProp={scrollRefBeauty} />
    </div>
  );
};

HomeContainer.propTypes = {};

export default HomeContainer;
