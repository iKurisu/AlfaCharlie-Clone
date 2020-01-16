import actions from "../actions";
import { Types, CursorActionTypes, HoverableElement } from "../types";

describe("intro actions", (): void => {
  it("creates an action to switch the cursor", (): void => {
    const expectedAction: CursorActionTypes = {
      type: Types.RESET_CURSOR
    };

    expect(actions.resetCursor()).toEqual(expectedAction);
  });

  it("creates an action to hover an element", (): void => {
    const expectedAction: CursorActionTypes = {
      type: Types.HOVER_ELEMENT,
      payload: HoverableElement.HERO
    };

    expect(actions.hoverElement(HoverableElement.HERO)).toEqual(expectedAction);
  });
});
