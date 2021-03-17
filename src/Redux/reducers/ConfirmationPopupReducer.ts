export interface ConfirmationState {
    display: boolean;
    index: number;
    direction: string;
}
export interface ConfirmationPayloadObject {
    display: boolean;
    index?: number;
    direction?: string;
}

export interface ConfirmationPayloadAction {
    type: string;
    payload: ConfirmationPayloadObject;
}

const startingState = { display: false, index: 0, direction: 'left' };

const ConfirmationReducer = (state: ConfirmationState = startingState, action: ConfirmationPayloadAction) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_AVAILABILITY_POPUP_DISPLAY_TRUE':
      return {
        ...state, display: true, index: payload.index, direction: payload.direction,
      };
    case 'SET_AVAILABILITY_POPUP_DISPLAY_FALSE':
      return {
        ...state, display: false, index: 0, direction: 'left',
      };
    default:
      return state;
  }
};

export default ConfirmationReducer;
