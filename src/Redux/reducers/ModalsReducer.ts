export interface ModalsReducerState {
    display: boolean;
    type: string;
}

export interface ModalsReducerPayload {
    type: string;
    display: boolean;
}

interface ModalsReducerAction {
    payload: ModalsReducerPayload;
    type: string;
}

const startingState: ModalsReducerState = {
  display: false,
  type: '',
};

const ModalsReducer = (state: ModalsReducerState = startingState, action: ModalsReducerAction) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_MODAL_DISPLAY':
      return { ...state, type: payload.type, display: payload.type };
    case 'CLOSE_MODAL':
      return { ...state, ...startingState };
    default:
      return { ...state };
  }
};

export default ModalsReducer;
