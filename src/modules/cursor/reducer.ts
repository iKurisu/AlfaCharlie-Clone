import { CursorState, Cursor, CursorActionTypes, Types } from "./types";

const initialState: CursorState = Cursor.SCROLL;

const reducer = (
  state: CursorState = initialState,
  action: CursorActionTypes
): CursorState => {
  switch (action.type) {
    case Types.SWITCH_CURSOR:
      return state === Cursor.SCROLL ? Cursor.SLIDER : Cursor.SCROLL;
    default:
      return state;
  }
};

export default reducer;
