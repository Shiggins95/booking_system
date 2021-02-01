import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { NavbarState } from '../../Redux/reducers/NavbarReducer';
import { _setNavbarClosed, _setNavbarOpen } from '../../Redux/actions';
import './Navbar.css';
import { MatchProps } from '../../Types';
import { scrollEvent } from '../../Helpers/DOMEvents';
import { ReducerState } from '../../Redux/reducers';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state: NavbarState, ownProps: MatchProps) => ({
  open: state.open,
});

const mapDispatchToProps = { _setNavbarOpen, _setNavbarClosed };

const Navbar = ({ location: { pathname } }: MatchProps) => {
  const dispatch = useDispatch();
  const { open } = useSelector((state: ReducerState) => state.navbar);
  const setOpen = (value: boolean) => {
    if (value) {
      dispatch(_setNavbarOpen());
    } else {
      dispatch(_setNavbarClosed());
    }
  };
  useEffect(() => {
    const scroll = () => scrollEvent({ open, setOpen, pathname });
    window.addEventListener('scroll', scroll);
    return () => window.removeEventListener('scroll', scroll);
  });
  useEffect(() => {
    if (pathname !== '/') {
      setOpen(true);
    }
  }, []);
  return (
    <div id="navigation_bar" className={open ? 'visible' : 'hidden'}>
      <div className="left">
        <div className={pathname === '/' ? 'selected' : ''}>
          <Link to="/">Home</Link>
        </div>
        <div className={pathname === '/availability' ? 'selected' : ''}>
          <Link to="/availability">Availability</Link>
        </div>
        <div className={pathname === '/book' ? 'selected' : ''}>
          <Link to="/book">Make a Booking</Link>
        </div>
      </div>
      <div className="right">
        <div className={pathname === '/login' ? 'selected' : ''}>
          <Link to="/login">Login / Signup</Link>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line max-len
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
