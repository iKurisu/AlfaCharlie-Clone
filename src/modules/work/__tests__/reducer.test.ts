import reducer from "../reducer";
import { Types, WorkActionTypes } from "../types";

describe("menu reducer", (): void => {
  it("returns the initial state", (): void => {
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    expect(reducer(undefined, {} as WorkActionTypes)).toEqual({
      visibilityFilter: "ALL"
    });
  });

  it("handles SET_VISIBILITY_FILTER", (): void => {
    const action: WorkActionTypes = {
      type: Types.SET_VISIBILITY_FILTER,
      filter: "DIGITAL"
    };

    expect(reducer(undefined, action)).toEqual({
      visibilityFilter: "DIGITAL"
    });
  });
});
