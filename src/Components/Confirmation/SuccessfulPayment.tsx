import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

interface SuccessfulPaymentProps {
    display: boolean;
    emailError: boolean;
}

const SuccessfulPayment = ({ display, emailError }: SuccessfulPaymentProps) => {
  const props = useSpring({
    opacity: display || emailError ? 1 : 0,
    top: display || emailError ? 0 : -50,
  });
  useEffect(() => {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }, []);
  return (
    <animated.div
      className="success_container"
      style={{
        ...props, width: '100%', height: 50, position: 'absolute',
      }}
    >
      {emailError && !display ? (
        <p>
          Payment succeeded and bookings created however, an email could not be sent this time due to usage limit
          <br />
          Please wait for the page to refresh to continue booking
        </p>
      ) : (
        <p>
          Payment succeeded. An email will be sent shortly to the client with confirmation of the booking details
          <br />
          Please wait for the page to refresh...
        </p>
      )}
    </animated.div>
  );
};

export default SuccessfulPayment;
