import { Types, MenuState, MenuActionTypes } from "./types";

const initialState: MenuState = {
  toggled: false,
  hoveringElementID: 0,
  previousElementID: 0
};

const reducer = (state = initialState, action: MenuActionTypes): MenuState => {
  switch (action.type) {
    case Types.TOGGLE_MENU:
      return { ...state, toggled: !state.toggled };
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
    default:
      return state;
  }
};

export default reducer;
