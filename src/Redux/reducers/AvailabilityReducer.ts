export interface DateMapping {
    [key: number]: DateData[]
}

export interface DateData {
    date: Date;
    past: boolean;
}

export interface AvailabilityReducerState {
    dates: DateMapping;
    bookings?: Object[]
}

export interface PayloadObject {
    key?: string;
    data?: DateMapping;
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
      return { ...state, bookings: data };
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
