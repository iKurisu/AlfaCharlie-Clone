import actions from "./actions";
import { Types } from "./types";

describe("menu actions", (): void => {
  it("creates an action to toggle the menu", (): void => {
    const expectedAction = {
      type: Types.TOGGLE_MENU
    };

    expect(actions.toggleMenu()).toEqual(expectedAction);
  });

  it("creates an action to update the element being hovered", (): void => {
    const elementID = 2;
    const expectedAction = {
      type: Types.HOVER_ELEMENT,
      elementID
    };

    expect(actions.hoverElement(elementID)).toEqual(expectedAction);
  });
});
