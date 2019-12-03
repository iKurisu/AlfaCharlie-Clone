import actions from "../actions";
import { HeroActionTypes, Types } from "../types";

describe("hero actions", (): void => {
  it("creates an action to set the new slide", (): void => {
    const expectedAction: HeroActionTypes = {
      type: Types.SET_CURRENT_SLIDE,
      slideID: 2
    };

    expect(actions.setSlide(2)).toEqual(expectedAction);
  });

  it("creates an action to update the previous slide", (): void => {
    const expectedAction: HeroActionTypes = {
      type: Types.UPDATE_PREVIOUS_SLIDE
    };

    expect(actions.updatePreviousSlide()).toEqual(expectedAction);
  });
});
