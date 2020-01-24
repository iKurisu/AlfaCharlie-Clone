import { LoaderActionTypes, LoaderState, Types } from "./types";

const initialState: LoaderState = {
  main: false,
  footer: false
};

const reducer = (
  state = initialState,
  action: LoaderActionTypes
): LoaderState => {
  switch (action.type) {
    case Types.TOGGLE_MAIN_LOADER:
      return { ...state, main: !state.main };
    case Types.TOGGLE_FOOTER_LOADER:
      return { ...state, footer: !state.footer };
    default:
      return state;
  }
};

export default reducer;
