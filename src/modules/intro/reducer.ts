import { IntroState, IntroActionTypes, Types } from "./types";

const initialState: IntroState = {
  toggled: true
};

const reducer = (
  state = initialState,
  action: IntroActionTypes
): IntroState => {
  switch (action.type) {
    case Types.TOGGLE_INTRO:
      return { ...state, toggled: !state.toggled };
    default:
      return state;
  }
};

export default reducer;
