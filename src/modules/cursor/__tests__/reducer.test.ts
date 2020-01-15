import reducer from "../reducer";
import { CursorActionTypes, CursorState, Cursor, Types } from "../types";

describe("intro reducer", (): void => {
  it("returns initial state", (): void => {
    const expectedState: CursorState = Cursor.SCROLL;

    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    expect(reducer(undefined, {} as CursorActionTypes)).toEqual(expectedState);
  });

  it("handles TOGGLE_INTRO", (): void => {
    const action: CursorActionTypes = {
      type: Types.SWITCH_CURSOR
    };

    expect(reducer(undefined, action)).toEqual(Cursor.SLIDER);
    expect(reducer(Cursor.SLIDER, action)).toEqual(Cursor.SCROLL);
  });
});
