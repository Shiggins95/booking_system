import React from 'react';
import BookingsComponent from '../../Components/BookingsView/BookingsComponent';

const AvailabilityContainer = () => {
  // eslint-disable-next-line no-unused-vars
  const bookings = [
    { id: 1, title: 'Booking 1', date: new Date() },
  ];
  return (
    <div className="availability_container">
      <BookingsComponent />
    </div>
  );
};

export default AvailabilityContainer;
