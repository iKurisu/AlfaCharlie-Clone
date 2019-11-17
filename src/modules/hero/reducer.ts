import { HeroState, HeroActionTypes, Types } from "./types";
import { getDuration } from "utils/slider";

const initialState: HeroState = {
  currentSlideID: 0,
  previousSlideID: 0,
  swipeLength: 0
};

const reducer = (state = initialState, action: HeroActionTypes): HeroState => {
  switch (action.type) {
    case Types.SET_CURRENT_SLIDE:
      return {
        ...state,
        currentSlideID: action.slideID,
        previousSlideID: state.currentSlideID,
        swipeLength: getDuration(
          { current: action.slideID, previous: state.currentSlideID },
          3000
        )
      };
    case Types.UPDATE_PREVIOUS_SLIDE:
      return {
        ...state,
        previousSlideID: state.currentSlideID,
        swipeLength: 0
      };
    default:
      return state;
  }
};

export default reducer;
