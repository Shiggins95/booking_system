import React from 'react';
import { useSelector } from 'react-redux';
import { AvailabilityReducerState, DateData } from '../../Redux/reducers/AvailabilityReducer';
import SingleDay from './SingleDay';
import './SingleWeekStyles.css';
import { ReducerState } from '../../Redux/reducers';
import { _formatDate } from '../../Helpers/Date';

interface SingleWeekProps {
    dates: DateData[];
}

const SingleWeek = ({ dates }:SingleWeekProps) => {
  const { stylist } = useSelector((s: ReducerState):AvailabilityReducerState => s.availability);
  console.log('CURRENT STYLIST', stylist);
  return dates && dates.length > 0 ? (
    <div className="single_week_container">
      <div className="title">
        {stylist ? `${stylist.name} Calendar` : ''}
        <br />
        {`Week of ${_formatDate({ date: dates[0].date })}`}
      </div>
      <div className="days_of_week">
        {dates.map((date, index) => <SingleDay key={index} date={date} display />)}
      </div>
    </div>
  ) : null;
};

export default SingleWeek;
