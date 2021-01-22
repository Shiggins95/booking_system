/* eslint-disable no-unused-vars, max-len, react/destructuring-assignment */
import React, { ReactElement, useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { useSelector } from 'react-redux';
import { AvailabilityReducerState } from '../../Redux/reducers/AvailabilityReducer';
import { ReducerState } from '../../Redux/reducers';
import SingleWeek from './SingleWeek';
import './BookingsComponentStyles.css';

interface BookingsComponentState {
  index: number;
  direction: string;
}

const BookingsComponent = () => {
  const [state, setState] = useState<BookingsComponentState>({
    index: 0,
    direction: 'left',
  });

  const { index, direction } = state;

  const { bookings, dates } = useSelector((s: ReducerState):AvailabilityReducerState => s.availability);

  const transitions = useTransition(index, null, {
    from: { transform: direction === 'left' ? 'translate3d(100vw, 0 ,0)' : 'translate3d(-100vw, 0 ,0)' },
    enter: { transform: 'translate3d(0, 0, 0)' },
    leave: { transform: direction === 'left' ? 'translate3d(-100vw, 0, 0)' : 'translate3d(100vw, 0, 0)' },
  });

  const click1 = () => {
    if (index === Object.keys(dates).length - 1) {
      return;
    }
    setState({
      index: index + 1,
      direction: 'left',
    });
  };

  const click2 = () => {
    if (index === 0) {
      return;
    }
    setState({
      index: index - 1,
      direction: 'right',
    });
  };

  return (
    <div id="bookings_component_container">
      <div id="carousel_container">
        <div className="left_button">
          {index < Object.keys(dates).length - 1 ? <button type="button" onClick={click1}>click 1</button> : null}
        </div>
        <div className="right_button">
          {index > 0 ? <button type="button" onClick={click2}>click 2</button> : null}
        </div>
        {transitions.map(({ item, key, props }, i) => (
          <animated.div
            className="animated_section"
            key={i}
            style={{ ...props }}
          >
            <SingleWeek dates={dates[index]} />
          </animated.div>
        ))}
      </div>
    </div>
  );
};
export default BookingsComponent;
