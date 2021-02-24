import React, { useEffect, useState } from 'react';
import { Booking } from '../../Redux/reducers/AvailabilityReducer';
import SelectInput from '../Inputs/SelectInput';
import './StylistSelectStyles.css';

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
  let options = stylists.map((stylist) => ({ value: stylist._id, text: stylist.name }));
  // TODO - REMOVE AS TESTING DATA
  options = options.concat([
    { value: '1', text: 'Stephen Higgins' },
    { value: '2', text: 'Stephen Higgins' },
    { value: '3', text: 'Stephen Higgins' },
    { value: '4', text: 'Stephen Higgins' },
    { value: '5', text: 'Stephen Higgins' },
    { value: '6', text: 'Stephen Higgins' },
    { value: '7', text: 'Stephen Higgins' },
    { value: '8', text: 'Stephen Higgins' },
    { value: '9', text: 'Stephen Higgins' },
    { value: '10', text: 'Stephen Higgins' },
  ]);
  return (
    <div id="stylist_select">
      <div className="header">
        <h2>Select Stylist</h2>
      </div>
      <SelectInput values={options} />
    </div>
  );
};

export default StylistSelect;
