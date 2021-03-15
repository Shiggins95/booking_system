import React from 'react';
import { animated, useSpring } from 'react-spring';
import './ErrorModalStyles.css';

interface ErrorModalProps {
    message: string;
    display: boolean;
}

const ErrorModal = ({
  message, display,
}:ErrorModalProps) => {
  const props = useSpring({
    opacity: display ? 1 : 0,
    top: display ? 0 : -50,
  });
  return (
    <animated.div
      className="error_container"
      style={{
        ...props, width: '100%', height: 50, position: 'absolute',
      }}
    >
      <div className="content">
        <p>
          {message}
        </p>
      </div>
    </animated.div>
  );
};

export default ErrorModal;
