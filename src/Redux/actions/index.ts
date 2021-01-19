import { Action } from '../reducers/NavbarReducer';

export const _setNavbarOpen = (): Action => ({
  type: 'NAVBAR_SET_OPEN',
});

export const _setNavbarClosed = ():Action => ({
  type: 'NAVBAR_SET_CLOSED',
});
