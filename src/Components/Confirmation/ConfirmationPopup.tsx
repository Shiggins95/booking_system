/* eslint-disable no-unused-vars, max-len, react/destructuring-assignment */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { animated, useTransition } from 'react-spring';
import { ReducerState } from '../../Redux/reducers';
import './ConfirmationPopupStyles.css';
import ConfirmationPage from './ConfirmationPage';
import SingleWeek from '../BookingsView/SingleWeek';
import PaymentPage from './PaymentPage';

interface StateProps {
    index: number,
    direction: string
}

export interface PageProps {
  next: () => void;
  back: () => void;
}

const ConfirmationPopup = () => {
  const { selectedDate } = useSelector((state: ReducerState) => state.availability);
  // const [state, setState] = useState<StateProps>({
  //   index: 0,
  //   direction: 'left',
  // });
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('left');

  // const { index, direction } = state;
  const transitions = useTransition(index, null, {
    from: { transform: direction === 'left' ? 'translate3d(100vw, 0 ,0)' : 'translate3d(-100vw, 0 ,0)' },
    enter: { transform: 'translate3d(0, 0, 0)' },
    leave: { transform: direction === 'left' ? 'translate3d(-100vw, 0, 0)' : 'translate3d(100vw, 0, 0)' },
  });

  const dates = [ConfirmationPage, PaymentPage];

  const next = () => {
    if (index === Object.keys(dates).length - 1) {
      return;
    }
    try {
      debugger;
      // setState({
      //   index: index + 1,
      //   direction: 'left',
      // });
      setIndex(index + 1);
      setDirection('left');
    } catch (e) {
      console.log('error: ', e);
    }
  };

  const back = () => {
    if (index === 0) {
      return;
    }
    try {
      debugger;
      setIndex(index - 1);
      setDirection('right');
      // setState({
      //   index: index - 1,
      //   direction: 'right',
      // });
    } catch (e) {
      console.log('error: ', e);
    }
  };

  return selectedDate === null ? null : (
    <div id="confirmation_popup_container">
      <div className="confirmation_box">
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
