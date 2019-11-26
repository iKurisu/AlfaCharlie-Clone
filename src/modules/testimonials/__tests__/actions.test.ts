import actions from "../actions";
import { TestimonialsActionTypes, Types } from "../types";

describe("testimonials actions", (): void => {
  it("creates an action to set the new slide", (): void => {
    const expectedAction: TestimonialsActionTypes = {
      type: Types.SWIPE_SLIDE,
      slideID: 4
    };

    expect(actions.swipeSlide(4)).toEqual(expectedAction);
  });

  it("creates an action to update the previous slide", (): void => {
    const expectedAction: TestimonialsActionTypes = {
      type: Types.UPDATE_PREVIOUS_SLIDE
    };

    expect(actions.updatePreviousSlide()).toEqual(expectedAction);
  });
});
