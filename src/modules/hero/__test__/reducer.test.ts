import reducer from "../reducer";
import { HeroActionTypes, Types } from "../types";

describe("hero reducer", (): void => {
  it("returns the initial state", (): void => {
    const initialState = {
      currentSlideID: 0,
      previousSlideID: 0
    };

    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    expect(reducer(undefined, {} as HeroActionTypes)).toEqual(initialState);
  });

  it("handles SET_CURRENT_SLIDE", (): void => {
    const action: HeroActionTypes = {
      type: Types.SET_CURRENT_SLIDE,
      slideID: 1
    };

    const newState = {
      currentSlideID: 1,
      previousSlideID: 0
    };

    expect(reducer(undefined, action)).toEqual(newState);

    const secondAction: HeroActionTypes = {
      type: Types.SET_CURRENT_SLIDE,
      slideID: 3
    };

    expect(reducer(newState, secondAction)).toEqual({
      currentSlideID: 3,
      previousSlideID: 1
    });
  });

  it("handles UPDATE_PREVIOUS_SLIDE", (): void => {
    const action: HeroActionTypes = {
      type: Types.UPDATE_PREVIOUS_SLIDE
    };

    const initialState = {
      currentSlideID: 3,
      previousSlideID: 0
    };

    const newState = {
      currentSlideID: 3,
      previousSlideID: 3
    };

    expect(reducer(initialState, action)).toEqual(newState);
  });
});
