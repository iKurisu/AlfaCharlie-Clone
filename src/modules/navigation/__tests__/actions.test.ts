import actions from "../actions";
import { Types } from "../types";

describe("menu actions", (): void => {
  it("creates an action to update the items", (): void => {
    const expectedAction = {
      type: Types.UPDATE_ITEMS,
      items: ["a", "b"]
    };

    expect(actions.updateItems(["a", "b"])).toEqual(expectedAction);
  });
});
