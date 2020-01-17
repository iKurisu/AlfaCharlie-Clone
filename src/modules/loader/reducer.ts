import { LoaderActionTypes, LoaderState, Types } from "./types";

const initialState: LoaderState = {
  toggled: false
};

const reducer = (
  state = initialState,
  action: LoaderActionTypes
): LoaderState => {
  switch (action.type) {
    case Types.TOGGLE_LOADER:
      return { toggled: !state.toggled };
    default:
      return state;
  }
};

export default reducer;
