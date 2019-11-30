import reducer from "../reducer";
import { Types, MenuActionTypes } from "../types";

describe("menu reducer", (): void => {
  it("returns the initial state", (): void => {
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    expect(reducer(undefined, {} as MenuActionTypes)).toEqual({
      toggled: false,
      hoveringElementID: 0,
      previousElementID: 0
    });
  });

  it("handles TOGGLE_MENU", (): void => {
    const action: MenuActionTypes = {
      type: Types.TOGGLE_MENU
    };

    expect(reducer(undefined, action)).toEqual({
      toggled: true,
      hoveringElementID: 0,
      previousElementID: 0
    });
  });

  it("handles SET_HOVER_ELEMENT", (): void => {
    const action: MenuActionTypes = {
      type: Types.SET_HOVERING_ELEMENT,
      slideID: 1
    };

    const newState = {
      toggled: false,
      hoveringElementID: 1,
      previousElementID: 0
    };

    expect(reducer(undefined, action)).toEqual(newState);

    const secondAction: MenuActionTypes = {
      type: Types.SET_HOVERING_ELEMENT,
      slideID: 2
    };

    expect(reducer(newState, secondAction)).toEqual({
      toggled: false,
      hoveringElementID: 2,
      previousElementID: 1
    });
  });

  it("handles UPDATE_PREVIOUS_ELEMENT", (): void => {
    const action: MenuActionTypes = {
      type: Types.UPDATE_PREVIOUS_ELEMENT
    };

    const initialState = {
      toggled: false,
      hoveringElementID: 2,
      previousElementID: 0
    };

    const newState = {
      toggled: false,
      hoveringElementID: 2,
      previousElementID: 2
    };

    expect(reducer(initialState, action)).toEqual(newState);
  });
});
