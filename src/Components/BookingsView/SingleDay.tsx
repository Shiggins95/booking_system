import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AvailabilityReducerState, Booking, DateData } from '../../Redux/reducers/AvailabilityReducer';
import { _getDayOfWeek } from '../../Helpers/Date';
import './SingleDayStyles.css';
import { ReducerState } from '../../Redux/reducers';
import { _setAvailabilityDisplay, _setAvailabilitySelectedDate } from '../../Redux/actions';

interface SingleDayProps {
    date: DateData;
    display: boolean;
}

const SingleDay = ({ date, display }: SingleDayProps) => {
  const slots: number[] = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  const dispatch = useDispatch();
  const availabilityState: AvailabilityReducerState = useSelector(
    (state: ReducerState): AvailabilityReducerState => state.availability,
  );
  const bookings: Booking[] = availabilityState.bookings ? availabilityState.bookings : [];
  console.log('BOOKINGS', bookings);
  const currentDateBookings = bookings.filter((booking) => {
    // debugger;
    const thisDate = new Date(date.date);
    const compareDate = new Date(booking.date);
    return thisDate.getDate() === compareDate.getDate()
        && thisDate.getFullYear() === compareDate.getFullYear()
        && thisDate.getMonth() === compareDate.getMonth();
  }).map((d) => parseInt(d.time.split(':')[0], 10));
  const handleClick = (selectedDate: Date, slot: number): void => {
    if (currentDateBookings.indexOf(slot) !== -1) {
      return;
    }
    const dateToUse = new Date(selectedDate);
    dateToUse.setHours(slot);
    dispatch(_setAvailabilitySelectedDate({ date: dateToUse }));
    dispatch(_setAvailabilityDisplay({ display: true, direction: 'left', index: 0 }));
  };
  return display ? (
    <div className="single_day">
      <div className="title">
        {`${_getDayOfWeek(date)}`}
      </div>
      <div className="time_slots">
        {slots.map((slot, index) => (
          <button
            className={`time_slot ${currentDateBookings.indexOf(slot) > -1 ? 'booked' : ''}`}
            key={index}
            type="button"
            onClick={() => handleClick(date.date, slot)}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  ) : null;
};

export default SingleDay;
