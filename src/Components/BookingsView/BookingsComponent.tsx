/* eslint-disable no-unused-vars, max-len, react/destructuring-assignment */
import React, { useState } from 'react';
import { animated, useTransition } from 'react-spring';

function TestScreen1() {
  return <div>Im Number 1</div>;
}

function TestScreen2() {
  return <div>Im number 2</div>;
}

function TestScreen3() {
  return <div>Im number 3</div>;
}

interface State {
  index: number;
  direction: string;
}

const BookingsComponent = () => {
  const testScreens = [TestScreen1, TestScreen2, TestScreen3];
  const [state, setState] = useState<State>({
    index: 0,
    direction: 'left',
  });

  const transitions = useTransition(state.index, null, {
    from: { transform: state.direction === 'left' ? 'translate3d(100vw, 0 ,0)' : 'translate3d(-100vw, 0 ,0)' },
    enter: { transform: 'translate3d(0, 0, 0)' },
    leave: { transform: state.direction === 'left' ? 'translate3d(-100vw, 0, 0)' : 'translate3d(100vw, 0, 0)' },
  });

  const click1 = () => setState({
    index: state.index === 2 ? 0 : state.index + 1,
    direction: 'left',
  });

  const click2 = () => setState({
    index: state.index === 0 ? 2 : state.index - 1,
    direction: 'right',
  });

  const { index } = state;

  return (
    <div id="bookings_component_container">
      <button type="button" onClick={click1}>click 1</button>
      <button type="button" onClick={click2}>click 2</button>
      <div style={{
        height: '100px', width: '100%', margin: 0, padding: 0, background: 'black',
      }}
      >
        {transitions.map(({ item, key, props }, i) => (
          <animated.div style={{
            ...props,
            position: 'absolute',
            width: '100%',
            height: '100px',
            background: 'black',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
            padding: 0,
          }}
          >
            {React.createElement(testScreens[index])}
          </animated.div>
        ))}
      </div>
    </div>
  );
};
export default BookingsComponent;
