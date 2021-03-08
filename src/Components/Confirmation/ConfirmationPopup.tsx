/* eslint-disable no-unused-vars, max-len, react/destructuring-assignment */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useTransition } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ReducerState } from '../../Redux/reducers';
import './ConfirmationPopupStyles.css';
import ConfirmationPage from './ConfirmationPage';
import PaymentPage from './PaymentPage';
import { _resetConfirmationFormValue, _setAvailabilityDisplay, _setAvailabilitySelectedDate } from '../../Redux/actions';
import ServiceSelect from './ServiceSelect';
import { ConfirmationFormState } from '../../Redux/reducers/ConfirmationFormReducer';

interface StateProps {
    index: number,
    direction: string
}

export interface PageProps {
  next: () => void;
  back: () => void;
}

const ConfirmationPopup = () => {
  const { display } = useSelector((state: ReducerState) => state.confirmation);
  const confirmationForm = useSelector((state: ReducerState):ConfirmationFormState => state.confirmForm);
  const index = useRef(0);
  const direction = useRef('left');
  const dispatch = useDispatch();
  const transitions = useTransition(index.current, null, {
    from: { transform: direction.current === 'left' ? 'translate3d(100vw, 0 ,0)' : 'translate3d(-100vw, 0 ,0)' },
    enter: { transform: 'translate3d(0, 0, 0)' },
    leave: { transform: direction.current === 'left' ? 'translate3d(-100vw, 0, 0)' : 'translate3d(100vw, 0, 0)' },
  });

  useEffect(() => () => {
    index.current = 0;
  }, []);

  const dates = [ServiceSelect, ConfirmationPage, PaymentPage];

  const next = () => {
    if (index.current === Object.keys(dates).length - 1) {
      return;
    }
    const indexMapping = [
      ['service'],
      ['name', 'email'],
    ];
    try {
      const missingFields: string[] = [];
      let canProceed = true;
      indexMapping[index.current].forEach((field) => {
        if (!confirmationForm[field]) {
          canProceed = false;
          missingFields.push(`"${field}"`);
        }
      });
      if (!canProceed) {
        // TODO: custom error popup message box - create custom error popup
        alert(`Missing required fields:\n ${missingFields.join('\n')}`);
        return;
      }
      index.current += 1;
      direction.current = 'left';
      dispatch(_setAvailabilityDisplay({ display: true }));
    } catch (e) {
      console.error('error: ', e);
    }
  };

  const back = () => {
    if (index.current === 0) {
      return;
    }
    index.current -= 1;
    direction.current = 'right';
    try {
      dispatch(_setAvailabilityDisplay({ display: true }));
    } catch (e) {
      console.error('error: ', e);
    }
  };

  const close = () => {
    index.current = 0;
    dispatch(_resetConfirmationFormValue());
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
            {React.createElement(dates[index.current], { next, back })}
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default ConfirmationPopup;
