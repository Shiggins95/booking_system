import React from 'react';
import { DateData } from '../../Redux/reducers/AvailabilityReducer';

interface SingleDayProps {
    date: DateData;
    display: boolean;
}

const SingleDay = ({ date, display }: SingleDayProps) => {
  console.log('SINGLE DAY DISPLAY: ', display);
  return display ? (
    <div className="single_day">
      {date.date.toUTCString()}
    </div>
  ) : null;
};

export default SingleDay;
