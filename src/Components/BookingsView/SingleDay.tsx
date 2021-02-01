import React from 'react';
import { useSelector } from 'react-redux';
import { AvailabilityReducerState, Booking, DateData } from '../../Redux/reducers/AvailabilityReducer';
import { _getDayOfWeek } from '../../Helpers/Date';
import './SingleDayStyles.css';
import { ReducerState } from '../../Redux/reducers';

interface SingleDayProps {
    date: DateData;
    display: boolean;
}

const SingleDay = ({ date, display }: SingleDayProps) => {
  const slots: number[] = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  const availabilityState: AvailabilityReducerState = useSelector(
    (state: ReducerState): AvailabilityReducerState => state.availability,
  );
  const bookings: Booking[] = availabilityState.bookings ? availabilityState.bookings : [];
  const currentDateBookings = bookings.filter((booking) => {
    // debugger;
    const thisDate = new Date(date.date);
    const compareDate = new Date(booking.date);
    return thisDate.getDate() === compareDate.getDate()
        && thisDate.getFullYear() === compareDate.getFullYear()
        && thisDate.getMonth() === compareDate.getMonth();
  }).map((d) => parseInt(d.time.split(':')[0], 10));
  console.log('curr date', currentDateBookings);
  console.log('BOOKINGS', bookings);
  return display ? (
    <div className="single_day">
      <div className="title">
        {`${_getDayOfWeek(date)}`}
      </div>
      <div className="time_slots">
        {slots.map((slot, index) => (
          <div
            className={`time_slot ${currentDateBookings.indexOf(slot) > -1 ? 'booked' : ''}`}
            key={index}
          >
            {slot}
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default SingleDay;
