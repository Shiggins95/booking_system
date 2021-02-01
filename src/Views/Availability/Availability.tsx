import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BookingsComponent from '../../Components/BookingsView/BookingsComponent';
import { Booking, DateData, DateMapping } from '../../Redux/reducers/AvailabilityReducer';
import { _setAvailabilityBookings, _setAvailabilityDates, _setNavbarOpen } from '../../Redux/actions';
import './AvailabilityStyles.css';

const AvailabilityContainer = () => {
  // eslint-disable-next-line no-unused-vars
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
    const getData = async () => {
      const dataRequest = await fetch('http://localhost:8080/bookings/');
      const data = await dataRequest.json();
      return data;
    };
    getData().then((res) => {
      console.log(res);
      const data = res.map((r: Booking) => r);
      console.log(data);
      dispatch(_setAvailabilityBookings(data));
    });
    const allDates: DateMapping = {};
    const today = new Date();
    today.setHours(23);
    for (let thisWeek = 0; thisWeek < 5; thisWeek++) {
      const date = new Date();
      date.setDate(date.getDate() + (thisWeek * 7));
      allDates[thisWeek] = getFullWeek(date, thisWeek, today);
    }
    dispatch(_setNavbarOpen());
    dispatch(_setAvailabilityDates({ key: '', data: allDates }));
  }, []);

  return (
    <div id="availability_container">
      <BookingsComponent />
    </div>
  );
};

export default AvailabilityContainer;
