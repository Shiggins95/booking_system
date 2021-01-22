import React from 'react';
import { DateData } from '../../Redux/reducers/AvailabilityReducer';
import SingleDay from './SingleDay';
import './SingleWeekStyles.css';

interface SingleWeekProps {
    dates: DateData[];
}

const SingleWeek = ({ dates }:SingleWeekProps) => (dates && dates.length > 0 ? (
  <div className="single_week_container">
    <div className="title">
      {`Week of ${dates[0].date}`}
    </div>
    <div className="days_of_week">
      {dates.map((date, index) => <SingleDay key={index} date={date} display />)}
    </div>
  </div>
) : null);

export default SingleWeek;
