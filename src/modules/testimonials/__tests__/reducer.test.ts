import reducer from "../reducer";
import { TestimonialsState, TestimonialsActionTypes, Types } from "../types";

describe("testimonials reducer", (): void => {
  it("returns the initial state", (): void => {
    const initialState: TestimonialsState = {
      currentSlideID: 0,
      previousSlideID: 0
    };

    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    expect(reducer(undefined, {} as TestimonialsActionTypes)).toEqual(
      initialState
    );
  });

  it("handles SWIPE_SLIDE", (): void => {
    const action: TestimonialsActionTypes = {
      type: Types.SWIPE_SLIDE,
      slideID: 3
    };

    const newState: TestimonialsState = {
      currentSlideID: 3,
      previousSlideID: 0
    };

    expect(reducer(undefined, action)).toEqual(newState);
  });

  it("handles UPDATE_PREVIOUS_SLIDE", (): void => {
    const action: TestimonialsActionTypes = {
      type: Types.UPDATE_PREVIOUS_SLIDE
    };

    const initialState: TestimonialsState = {
      currentSlideID: 2,
      previousSlideID: 0
    };

    const newState: TestimonialsState = {
      currentSlideID: 2,
      previousSlideID: 2
    };

    expect(reducer(initialState, action)).toEqual(newState);
  });
});
