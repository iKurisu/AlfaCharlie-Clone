import { Types, NavigationState, NavigationActionTypes } from "./types";

const initialState: NavigationState = {
  items: []
};

const reducer = (
  state = initialState,
  action: NavigationActionTypes
): NavigationState => {
  switch (action.type) {
    case Types.UPDATE_ITEMS:
      return { items: action.items };
    default:
      return state;
  }
};

export default reducer;
