export interface ConfirmationFormState {
    service: string;
    name: string;
    email: string;
    ccno: string;
    ccexp: string;
    cccsv: string;
}

const startingState: ConfirmationFormState = {
  service: '',
  name: '',
  email: '',
  ccno: '',
  ccexp: '',
  cccsv: '',
};

export interface ValueSettingPayload {
    value: string;
    key: string;
}

export interface FormAction {
    type: string;
    payload: ValueSettingPayload;
}

const ConfirmationFormReducer = (state: ConfirmationFormState = startingState, action: FormAction) => {
  const { type, payload } = action;
  if (!payload) return {};
  const { value, key } = payload;
  switch (type) {
    case 'SET_CONFIRMATION_FORM_VALUE':
      return { ...state, [key]: value };
    case 'RESET_CONFIRMATION_FORM':
      return { ...startingState };
    default:
      return state;
  }
};

export default ConfirmationFormReducer;
