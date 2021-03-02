import { combineReducers } from 'redux';
import { NavbarReducer, NavbarState } from './NavbarReducer';
import AvailabilityReducer, { AvailabilityReducerState } from './AvailabilityReducer';
import ConfirmationReducer, { ConfirmationState } from './ConfirmationPopupReducer';
import ConfirmationFormReducer from './ConfirmationFormReducer';

export interface ReducerState {
  navbar: NavbarState;
  availability: AvailabilityReducerState;
  confirmation: ConfirmationState;
}

export default combineReducers({
  navbar: NavbarReducer,
  availability: AvailabilityReducer,
  confirmation: ConfirmationReducer,
  confirmForm: ConfirmationFormReducer,
});
