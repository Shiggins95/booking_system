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
    bookings?: Booking[]
}

export interface PayloadObject {
    key?: string;
    data?: DateMapping | Booking[];
}

export interface AvailabilityPayload {
    type: string;
    payload: PayloadObject
}

const startingState: AvailabilityReducerState = {
  dates: {},
  bookings: [],
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
    case 'SET_AVAILABILITY_BOOKINGS':
      console.log('DATA: ', data);
      return { ...state, bookings: payload };
    case 'SET_AVAILABILITY_DATES_KEY':
      if (!key) {
        return state;
      }
      return { ...state, dates: { [key]: data, ...state.dates } };
    default:
      return state;
  }
};

export default AvailabilityReducer;
