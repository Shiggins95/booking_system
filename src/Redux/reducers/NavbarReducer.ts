export interface NavbarState {
    open: boolean,
}

export interface Action {
    type: string;
    payload?: string | boolean;
}

const startingState: NavbarState = {
  open: false,
};

export const NavbarReducer = (state = startingState, action: Action) => {
  const { type } = action;
  switch (type) {
    case 'NAVBAR_SET_OPEN':
      return { ...state, open: true };
    case 'NAVBAR_SET_CLOSED':
      return { ...state, open: false };
    default:
      return { ...state };
  }
};
