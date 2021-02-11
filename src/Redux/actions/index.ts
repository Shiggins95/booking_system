import { Action } from '../reducers/NavbarReducer';
import {
  AvailabilityPayload,
  PayloadObject,
} from '../reducers/AvailabilityReducer';
import { ConfirmationPayloadAction, ConfirmationPayloadObject } from '../reducers/ConfirmationPopupReducer';

export const _setNavbarOpen = (): Action => ({
  type: 'NAVBAR_SET_OPEN',
});

export const _setNavbarClosed = (): Action => ({
  type: 'NAVBAR_SET_CLOSED',
});

export const _setAvailabilityDates = (payload: PayloadObject): AvailabilityPayload => ({
  type: 'SET_AVAILABILITY_DATES',
  payload,
});

export const _setAvailabilityBookings = (payload: PayloadObject): AvailabilityPayload => ({
  type: 'SET_AVAILABILITY_BOOKINGS',
  payload,
});
export const _setAvailabilitySelectedDate = (payload: PayloadObject): AvailabilityPayload => ({
  type: 'SET_AVAILABILITY_SELECTED_DATE',
  payload,
});

// eslint-disable-next-line arrow-body-style
export const _setAvailabilityDisplay = (payload: ConfirmationPayloadObject):ConfirmationPayloadAction => {
  return (payload.display ? {
    type: 'SET_AVAILABILITY_POPUP_DISPLAY_TRUE',
    payload,
  } : {
    type: 'SET_AVAILABILITY_POPUP_DISPLAY_FALSE',
    payload,
  });
};
