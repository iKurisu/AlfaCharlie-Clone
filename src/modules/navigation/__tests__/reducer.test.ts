import reducer from "../reducer";
import { Types, NavigationActionTypes } from "../types";

describe("menu reducer", (): void => {
  it("returns the initial state", (): void => {
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    expect(reducer(undefined, {} as NavigationActionTypes)).toEqual({
      items: []
    });
  });

  it("handles TOGGLE_MENU", (): void => {
    const action: NavigationActionTypes = {
      type: Types.UPDATE_ITEMS,
      items: ["a", "b"]
    };

    expect(reducer(undefined, action)).toEqual({
      items: ["a", "b"]
    });
  });
});
