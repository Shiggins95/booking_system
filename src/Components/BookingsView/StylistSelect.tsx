import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UnmountClosed } from 'react-collapse';
import { AvailabilityReducerState, Booking } from '../../Redux/reducers/AvailabilityReducer';
import SelectInput from '../Inputs/SelectInput';
import './StylistSelectStyles.css';
import {
  _resetAvailabilityState,
  _setAvailabilityBookings,
  _setAvailabilityStylist,
  _setAvailabilityType,
} from '../../Redux/actions';
import { ReducerState } from '../../Redux/reducers';
import { get } from '../../Helpers/Requests';

export interface Service {
  _id: string;
  price: number;
  name: string;
}
export interface Stylist {
  name: string;
  email: string;
  password: string;
  bookings: Booking[];
  services: Service[];
  type: string;
  _id: string;
}

const StylistSelect = () => {
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const state = useSelector((s: ReducerState):AvailabilityReducerState => s.availability);
  const { stylist } = state;
  const dispatch = useDispatch();
  const { type } = state || '';
  useEffect(() => {
    const url = `stylists/${type}`;
    if (!type) return;
    get({ url }).then((data) => {
      setStylists(data.stylists);
    });
  }, [type]);

  const handleChange = async (id: string|number) => {
    const currentStylist = stylists.filter((s) => s._id === id)[0];
    const bookings = await get({ url: `bookings/stylists/${id}` });
    if (bookings.error) {
      console.error('error fetching bookings', bookings);
    }
    dispatch(_setAvailabilityStylist({ stylist: currentStylist }));
    dispatch(_setAvailabilityBookings(bookings.bookings));
  };

  const handleTypeChange = async (newType: string|number) => {
    if (type === newType || !newType) return;
    const newStylists = await get({ url: `stylists/${newType}` });
    setStylists(newStylists.stylists);
    dispatch(_resetAvailabilityState());
    dispatch(_setAvailabilityType({ type: newType.toString() }));
    dispatch(_setAvailabilityStylist({ stylist: null }));
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  const options = stylists.map((s) => ({ value: s._id, text: s.name }));
  return type ? (
    <div id="stylist_select">
      <div className="open_button">
        <button type="button" onClick={handleOpen}>{!open ? 'Select Stylist' : 'Close'}</button>
      </div>
      <UnmountClosed isOpened={open} className="content_expandable">
        <div className="content">
          <div className="header">
            <h2>Stylist Type</h2>
          </div>
          <SelectInput
            onChange={handleTypeChange}
            values={[{ value: 'hair', text: 'Hair' }, { value: 'beauty', text: 'Beauty' }]}
            currentValue={type}
          />
        </div>
        <div className="content">
          <div className="header">
            <h2>
              {type.substring(0, 1).toUpperCase() + type.substring(1, type.length)}
              {' '}
              Stylists
            </h2>
          </div>
          <SelectInput onChange={handleChange} values={options} currentValue={stylist ? stylist._id : ''} />
        </div>
      </UnmountClosed>
    </div>
  ) : null;
};

export default StylistSelect;
