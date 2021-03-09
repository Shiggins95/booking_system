import { combineReducers } from 'redux';
import { NavbarReducer, NavbarState } from './NavbarReducer';
import AvailabilityReducer, { AvailabilityReducerState } from './AvailabilityReducer';
import ConfirmationReducer, { ConfirmationState } from './ConfirmationPopupReducer';
import ConfirmationFormReducer, { ConfirmationFormState } from './ConfirmationFormReducer';
import ModalsReducer, { ModalsReducerState } from './ModalsReducer';

export interface ReducerState {
  navbar: NavbarState;
  availability: AvailabilityReducerState;
  confirmation: ConfirmationState;
  confirmForm: ConfirmationFormState;
  modals: ModalsReducerState
}

export default combineReducers({
  navbar: NavbarReducer,
  availability: AvailabilityReducer,
  confirmation: ConfirmationReducer,
  confirmForm: ConfirmationFormReducer,
  modals: ModalsReducer,
});
