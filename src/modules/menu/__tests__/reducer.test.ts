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

  it("handles HOVER_ELEMENT", (): void => {
    const action: MenuActionTypes = {
      type: Types.HOVER_ELEMENT,
      elementID: 1
    };

    const newState = {
      toggled: false,
      hoveringElementID: 1,
      previousElementID: 0
    };

    expect(reducer(undefined, action)).toEqual(newState);

    const secondAction: MenuActionTypes = {
      type: Types.HOVER_ELEMENT,
      elementID: 2
    };

    expect(reducer(newState, secondAction)).toEqual({
      toggled: false,
      hoveringElementID: 2,
      previousElementID: 1
    });
  });
});
