import actions from "../actions";
import { Types, WorkActionTypes } from "../types";

describe("menu actions", (): void => {
  it("creates an action to update the items", (): void => {
    const expectedAction: WorkActionTypes = {
      type: Types.SET_VISIBILITY_FILTER,
      filter: "BRANDING"
    };

    expect(actions.setVisibilityFilter("BRANDING")).toEqual(expectedAction);
  });
});
