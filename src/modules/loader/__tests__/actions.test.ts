import actions from "../actions";
import { LoaderActionTypes, Types } from "../types";

describe("intro actions", (): void => {
  it("creates an action to toggle the intro", (): void => {
    const expectedAction: LoaderActionTypes = {
      type: Types.TOGGLE_LOADER
    };

    expect(actions.toggleLoader()).toEqual(expectedAction);
  });
});
