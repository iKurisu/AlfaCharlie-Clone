import { TestimonialsState, TestimonialsActionTypes, Types } from "./types";

const initialState: TestimonialsState = {
  currentSlideID: 0,
  previousSlideID: 0
};

const reducer = (
  state = initialState,
  action: TestimonialsActionTypes
): TestimonialsState => {
  switch (action.type) {
    case Types.SET_SLIDE:
      return { ...state, currentSlideID: action.slideID };
    case Types.UPDATE_PREVIOUS_SLIDE:
      return { ...state, previousSlideID: state.currentSlideID };
    default:
      return state;
  }
};

export default reducer;
