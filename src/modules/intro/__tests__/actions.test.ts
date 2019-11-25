import actions from "../actions";
import { IntroActionTypes, Types } from "../types";

describe("intro actions", (): void => {
  it("creates an action to toggle the intro", (): void => {
    const expectedAction: IntroActionTypes = {
      type: Types.TOGGLE_INTRO
    };

    expect(actions.toggleIntro()).toEqual(expectedAction);
  });
});
