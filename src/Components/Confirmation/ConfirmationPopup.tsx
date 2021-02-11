/* eslint-disable no-unused-vars, max-len, react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useTransition } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ReducerState } from '../../Redux/reducers';
import './ConfirmationPopupStyles.css';
import ConfirmationPage from './ConfirmationPage';
import PaymentPage from './PaymentPage';
import { _setAvailabilityDisplay, _setAvailabilitySelectedDate } from '../../Redux/actions';

interface StateProps {
    index: number,
    direction: string
}

export interface PageProps {
  next: () => void;
  back: () => void;
}

const ConfirmationPopup = () => {
  const { display, index, direction } = useSelector((state: ReducerState) => state.confirmation);
  // const [state, setState] = useState<StateProps>({
  //   index: 0,
  //   direction: 'left',
  // });
  const dispatch = useDispatch();

  // const { index, direction } = state;
  const transitions = useTransition(index, null, {
    from: { transform: direction === 'left' ? 'translate3d(100vw, 0 ,0)' : 'translate3d(-100vw, 0 ,0)' },
    enter: { transform: 'translate3d(0, 0, 0)' },
    leave: { transform: direction === 'left' ? 'translate3d(-100vw, 0, 0)' : 'translate3d(100vw, 0, 0)' },
  });

  // @ts-ignore
  useEffect(() => () => dispatch(_setAvailabilityDisplay({ display: false })), []);

  const dates = [ConfirmationPage, PaymentPage];

  const next = () => {
    if (index === Object.keys(dates).length - 1) {
      return;
    }
    try {
      dispatch(_setAvailabilityDisplay({ display: true, index: index + 1, direction: 'left' }));
    } catch (e) {
      console.log('error: ', e);
    }
  };

  const back = () => {
    if (index === 0) {
      return;
    }
    try {
      dispatch(_setAvailabilityDisplay({ display: true, index: index - 1, direction: 'right' }));
    } catch (e) {
      console.log('error: ', e);
    }
  };

  const close = () => {
    dispatch(_setAvailabilityDisplay({ display: false }));
  };

  return !display ? null : (
    <div id="confirmation_popup_container">
      <div className="confirmation_box">
        <div className="close_button">
          <FontAwesomeIcon icon={faTimes} onClick={() => close()} />
        </div>
        {transitions.map(({ item, props }) => (
          <animated.div
            className="animated_section"
            key={item}
            style={{ ...props }}
          >
            {React.createElement(dates[index], { next, back })}
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default ConfirmationPopup;
