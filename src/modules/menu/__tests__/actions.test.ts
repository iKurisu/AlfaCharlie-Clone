import actions from "../actions";
import { Types } from "../types";

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
      type: Types.SET_HOVERING_ELEMENT,
      elementID
    };

    expect(actions.setHoveringElement(elementID)).toEqual(expectedAction);
  });

  it("creates an action to update the previous hovered element", (): void => {
    const expectedAction = {
      type: Types.UPDATE_PREVIOUS_ELEMENT
    };

    expect(actions.updatePreviousElement()).toEqual(expectedAction);
  });
});
