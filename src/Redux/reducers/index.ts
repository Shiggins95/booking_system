import { combineReducers } from 'redux';
import { NavbarReducer, NavbarState } from './NavbarReducer';

export interface ReducerState {
  navbar: NavbarState;
}

export default combineReducers({
  navbar: NavbarReducer,
});
