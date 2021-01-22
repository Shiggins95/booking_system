import { combineReducers } from 'redux';
import { NavbarReducer, NavbarState } from './NavbarReducer';
import AvailabilityReducer, { AvailabilityReducerState } from './AvailabilityReducer';

export interface ReducerState {
  navbar: NavbarState;
  availability: AvailabilityReducerState;
}

export default combineReducers({
  navbar: NavbarReducer,
  availability: AvailabilityReducer,
});
