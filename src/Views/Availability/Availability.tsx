import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookingsComponent from '../../Components/BookingsView/BookingsComponent';
import { AvailabilityReducerState, DateData, DateMapping } from '../../Redux/reducers/AvailabilityReducer';
import {
  _resetAvailabilityState,
  _setAvailabilityDates, _setAvailabilityType,
  _setNavbarOpen,
} from '../../Redux/actions';
import './AvailabilityStyles.css';
import ConfirmationPopup from '../../Components/Confirmation/ConfirmationPopup';
import StylistSelect from '../../Components/BookingsView/StylistSelect';
import { ReducerState } from '../../Redux/reducers';
import { getValue } from '../../Helpers/LocalStorage';

const AvailabilityContainer = () => {
  let { type } = useSelector((state: ReducerState):AvailabilityReducerState => state.availability);
  if (type === undefined) {
    type = '';
  }
  console.log('type: ', type);
  const dispatch = useDispatch();
  const getFullWeek = (date: Date, week: number, todaysDate: Date): DateData[] => {
    const originalDate = new Date(todaysDate);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    const dates: DateData[] = [];
    const monday = new Date(date.setDate(diff));
    for (let currentDateIndex = 0; currentDateIndex < 7; currentDateIndex++) {
      const currentDate = new Date(monday);
      currentDate.setDate(currentDate.getDate() + currentDateIndex);
      currentDate.setHours(0);
      const currentDateMillis = currentDate.getTime();
      const todaysDateMillis = originalDate.getTime();
      const isInPast = todaysDateMillis >= currentDateMillis;
      const newDateData: DateData = {
        date: currentDate,
        past: isInPast,
      };
      dates.push(newDateData);
    }
    return dates;
  };
  useEffect(() => {
    const allDates: DateMapping = {};
    const today = new Date();
    today.setHours(23);
    for (let thisWeek = 0; thisWeek < 5; thisWeek++) {
      const date = new Date();
      date.setDate(date.getDate() + (thisWeek * 7));
      allDates[thisWeek] = getFullWeek(date, thisWeek, today);
    }
    dispatch(_resetAvailabilityState());
    dispatch(_setNavbarOpen());
    dispatch(_setAvailabilityDates({ key: '', data: allDates }));
    if (!type) {
      type = getValue('LS_TYPE');
      dispatch(_setAvailabilityType({ type }));
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="availability_container">
      <StylistSelect />
      <BookingsComponent />
      <ConfirmationPopup />
    </div>
  );
};

export default AvailabilityContainer;
