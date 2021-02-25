import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Booking } from '../../Redux/reducers/AvailabilityReducer';
import SelectInput from '../Inputs/SelectInput';
import './StylistSelectStyles.css';
import { _setAvailabilityBookings, _setAvailabilityStylist } from '../../Redux/actions';

interface StylistSelectProps {
    type: string;
}

export interface Stylist {
  name: string;
  email: string;
  password: string;
  bookings: Booking[];
  type: string;
  _id: string;
}

const StylistSelect = ({ type }: StylistSelectProps) => {
  // TODO - implement react collapsible to allow closing of this menu to make it look better
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const dispatch = useDispatch();
  console.log('style type: ', type);
  useEffect(() => {
    const url = `http://localhost:8080/stylists/${type}`;
    console.log(url);
    const getData = async () => {
      const headers = new Headers();
      let { REACT_APP_API_KEY } = process.env;
      if (!REACT_APP_API_KEY) REACT_APP_API_KEY = '';
      headers.set('token', REACT_APP_API_KEY);
      const data = await fetch(url, {
        headers,
      });
      return data.json();
    };
    getData().then((data) => {
      setStylists(data.stylists);
    });
  }, []);
  const handleChange = async (id: string|number) => {
    const stylist = stylists.filter((s) => s._id === id)[0];
    const headers = new Headers();
    let { REACT_APP_API_KEY } = process.env;
    if (!REACT_APP_API_KEY) REACT_APP_API_KEY = '';
    headers.set('token', REACT_APP_API_KEY);
    const bookingsForStylist = await fetch(`http://localhost:8080/bookings/stylists/${id}`, { headers });
    const bookings = await bookingsForStylist.json();
    if (bookings.error) {
      console.log('error fetching bookings', bookings);
    }
    dispatch(_setAvailabilityStylist({ stylist }));
    dispatch(_setAvailabilityBookings(bookings.bookings));
  };
  const options = stylists.map((stylist) => ({ value: stylist._id, text: stylist.name }));
  return (
    <div id="stylist_select">
      <div className="header">
        <h2>Select Stylist</h2>
      </div>
      <SelectInput onChange={handleChange} values={options} />
    </div>
  );
};

export default StylistSelect;
