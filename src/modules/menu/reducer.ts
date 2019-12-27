import { Types, MenuState, MenuActionTypes } from "./types";

const initialState: MenuState = {
  toggled: false,
  hoveringElementID: 0,
  previousElementID: 0,
  onTransition: false
};

const reducer = (state = initialState, action: MenuActionTypes): MenuState => {
  switch (action.type) {
    case Types.TOGGLE_MENU:
      return { ...state, toggled: !state.toggled, onTransition: true };
    case Types.SET_HOVERING_ELEMENT:
      return {
        ...state,
        hoveringElementID: action.slideID,
        previousElementID: state.hoveringElementID
      };
    case Types.UPDATE_PREVIOUS_ELEMENT:
      return {
        ...state,
        previousElementID: state.hoveringElementID
      };
    case Types.END_TRANSITION:
      return { ...state, onTransition: false };
    default:
      return state;
  }
};

export default reducer;
