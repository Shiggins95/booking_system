import React from 'react';
import { DateData } from '../../Redux/reducers/AvailabilityReducer';
import { _getDayOfWeek } from '../../Helpers/Date';
import './SingleDayStyles.css';

interface SingleDayProps {
    date: DateData;
    display: boolean;
}

const SingleDay = ({ date, display }: SingleDayProps) => {
  const slots: number[] = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  return display ? (
    <div className="single_day">
      <div className="title">
        {`${_getDayOfWeek(date)}`}
      </div>
      <div className="time_slots">
        {slots.map((slot, index) => <div className="time_slot" key={index}>{slot}</div>)}
      </div>
    </div>
  ) : null;
};

export default SingleDay;
