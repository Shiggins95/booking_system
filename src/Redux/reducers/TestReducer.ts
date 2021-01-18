export interface TestState {
    test: boolean;
    value: string;
}

export interface TestAction {
    type: string;
    payload: string | boolean;
}

const startingState: TestState = {
  test: true,
  value: 'value',
};

export const TestReducer = (state = startingState, action: TestAction) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_TEST':
      return { ...state, test: payload };
    default:
      return { ...state };
  }
};
