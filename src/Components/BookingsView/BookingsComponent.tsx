/* eslint-disable no-unused-vars, max-len, react/destructuring-assignment */
import React, { ReactElement, useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
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

  const next = () => {
    if (index === Object.keys(dates).length - 1) {
      return;
    }
    setState({
      index: index + 1,
      direction: 'left',
    });
  };

  const back = () => {
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
          {/* {index > 0 ? <button type="button" onClick={back}>click 1</button> : null} */}
          {index > 0 ? <FontAwesomeIcon className="button" icon={faArrowLeft} onClick={back} size="2x" /> : null}
        </div>
        <div className="right_button">
          {/* {index < Object.keys(dates).length - 1 ? <button type="button" onClick={next}>click 2</button> : null} */}
          {
            index < Object.keys(dates).length - 1
              ? <FontAwesomeIcon className="button" icon={faArrowRight} onClick={next} size="2x" />
              : null
          }
        </div>
        {transitions.map(({ item, key, props }, i) => (
          <animated.div
            className="animated_section"
            key={item}
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
