import React from 'react';
import { DateData } from '../../Redux/reducers/AvailabilityReducer';
import SingleDay from './SingleDay';

interface SingleWeekProps {
    dates: DateData[];
}

const SingleWeek = ({ dates }:SingleWeekProps) => {
  console.log('single week', dates);
  return dates && dates.length > 0 ? (
    <div className="single_week">
      {dates.map((date, index) => <SingleDay key={index} date={date} display />)}
    </div>
  ) : null;
};

export default SingleWeek;
