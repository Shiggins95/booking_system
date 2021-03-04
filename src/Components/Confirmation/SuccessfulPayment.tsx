import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

interface SuccessfulPaymentProps {
    display: boolean;
}

const SuccessfulPayment = ({ display }: SuccessfulPaymentProps) => {
  const props = useSpring({
    opacity: display ? 1 : 0,
    top: display ? 0 : -50,
  });
  useEffect(() => {
    setTimeout(() => {
      // window.location.reload();
    }, 5000);
  }, []);
  return (
    <animated.div
      className="success_container"
      style={{
        ...props, width: '100%', height: 50, position: 'absolute',
      }}
    >
      <p>
        Payment succeeded, see the result in your
        {' '}
        <a
          href="https://dashboard.stripe.com/test/payments"
          target="_blank"
          rel="noreferrer"
        >
          Stripe dashboard.
        </a>
        {' '}
        Please wait for the page to refresh...
      </p>
    </animated.div>
  );
};

export default SuccessfulPayment;
