import { Stylist } from '../../Components/BookingsView/StylistSelect';
import { setValue } from '../../Helpers/LocalStorage';

export interface DateMapping {
    [key: number]: DateData[]
}

export interface DateData {
    date: Date;
    past: boolean;
}

export interface Booking {
    date: string;
    name: string;
    time: string;
    id?: number;
}

export interface AvailabilityReducerState {
    dates: DateMapping;
    bookings?: Booking[];
    selectedDate: Date | null;
    display: boolean;
    index: 0;
    direction: string;
    stylist: Stylist | null;
    type?: string;
}

export interface PayloadObject {
    key?: string;
    data?: DateMapping | Booking[];
    date?: Date | null;
    display?: boolean;
    index?: number;
    direction?: string;
    stylist?: Stylist | null;
    type?: string;
}

export interface AvailabilityPayload {
    type: string;
    payload: PayloadObject
}

const startingState: AvailabilityReducerState = {
  dates: {},
  bookings: [],
  selectedDate: null,
  index: 0,
  display: false,
  direction: 'left',
  stylist: null,
  type: '',
};

const AvailabilityReducer = (state: AvailabilityReducerState = startingState, action: AvailabilityPayload) => {
  const { type, payload } = action;
  let data = {};
  let key = '';
  if (payload) {
    if (payload.data) {
      data = payload.data;
    }
    if (payload.key) {
      key = payload.key;
    }
  }
  switch (type) {
    case 'SET_AVAILABILITY_DATES':
      return { ...state, dates: data };
    case 'SET_AVAILABILITY_TYPE':
      setValue({ key: 'LS_TYPE', value: payload.type || '' });
      return { ...state, type: payload.type };
    case 'SET_AVAILABILITY_BOOKINGS':
      return { ...state, bookings: payload };
    case 'SET_AVAILABILITY_DATES_KEY':
      if (!key) {
        return state;
      }
      return { ...state, dates: { [key]: data, ...state.dates } };
    case 'SET_AVAILABILITY_SELECTED_DATE':
      return { ...state, selectedDate: payload.date };
    case 'SET_AVAILABILITY_STYLIST':
      return { ...state, stylist: payload.stylist };
    case 'RESET_AVAILABILITY_STATE':
      return {
        ...state, bookings: [], index: 0, stylist: null, direction: 'left', selectedDate: null,
      };
    default:
      return state;
  }
};

export default AvailabilityReducer;
