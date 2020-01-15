import actions from "../actions";
import { Types, CursorActionTypes } from "../types";

describe("intro actions", (): void => {
  it("creates an action to toggle the intro", (): void => {
    const expectedAction: CursorActionTypes = {
      type: Types.SWITCH_CURSOR
    };

    expect(actions.switchCursor()).toEqual(expectedAction);
  });
});
