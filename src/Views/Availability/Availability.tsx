import React from 'react';
import BookingsComponent from '../../Components/BookingsView/BookingsComponent';

const AvailabilityContainer = () => {
  const bookings = [
    { id: 1, title: 'Booking 1', date: new Date() },
  ];
  return (
    <div className="availability_container">
      <BookingsComponent bookings={bookings} />
    </div>
  );
};

export default AvailabilityContainer;
