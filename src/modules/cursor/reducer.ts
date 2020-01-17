import { CursorState, Cursor, CursorActionTypes, Types } from "./types";

const initialState: CursorState = {
  currentCursor: Cursor.SCROLL,
  hovering: null
};

const reducer = (
  state = initialState,
  action: CursorActionTypes
): CursorState => {
  switch (action.type) {
    case Types.RESET_CURSOR:
      return {
        ...state,
        currentCursor: Cursor.SCROLL
      };
    case Types.HOVER_ELEMENT:
      return {
        currentCursor: Cursor.SLIDER,
        hovering: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
