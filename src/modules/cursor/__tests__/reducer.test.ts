import reducer from "../reducer";
import {
  CursorActionTypes,
  CursorState,
  Cursor,
  Types,
  HoverableElement
} from "../types";

describe("intro reducer", (): void => {
  const initialState: CursorState = {
    currentCursor: Cursor.SCROLL,
    hovering: null
  };

  it("returns initial state", (): void => {
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    expect(reducer(undefined, {} as CursorActionTypes)).toEqual(initialState);
  });

  it("handles RESET_CURSOR", (): void => {
    const action: CursorActionTypes = {
      type: Types.RESET_CURSOR
    };

    expect(reducer(undefined, action)).toEqual(initialState);
    expect(
      reducer({ currentCursor: Cursor.SLIDER, hovering: null }, action)
    ).toEqual(initialState);
  });

  it("handles HOVER_ELEMENT", (): void => {
    const action: CursorActionTypes = {
      type: Types.HOVER_ELEMENT,
      payload: HoverableElement.HERO
    };

    const expectedState: CursorState = {
      currentCursor: Cursor.SLIDER,
      hovering: HoverableElement.HERO
    };

    expect(reducer(undefined, action)).toEqual(expectedState);
  });
});
