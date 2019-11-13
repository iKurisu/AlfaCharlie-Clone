import { HeroState, HeroActionTypes, Types } from "./types";

const initialState: HeroState = {
  currentSlideID: 0,
  previousSlideID: 0
};

const reducer = (state = initialState, action: HeroActionTypes): HeroState => {
  switch (action.type) {
    case Types.SET_CURRENT_SLIDE:
      return {
        ...state,
        currentSlideID: action.slideID,
        previousSlideID: state.currentSlideID
      };
    case Types.UPDATE_PREVIOUS_SLIDE:
      return { ...state, previousSlideID: state.currentSlideID };
    default:
      return state;
  }
};

export default reducer;
