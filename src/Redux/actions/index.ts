import { Action } from '../reducers/NavbarReducer';
import {
  AvailabilityPayload,
  PayloadObject,
} from '../reducers/AvailabilityReducer';

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
