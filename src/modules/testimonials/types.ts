export enum Types {
  SET_SLIDE = "testimonials/SET_SLIDE",
  UPDATE_PREVIOUS_SLIDE = "testimonials/UPDATE_PREVIOUS_SLIDE"
}

export interface TestimonialsState {
  currentSlideID: number;
  previousSlideID: number;
}

interface SwipeSlideAction {
  type: Types.SET_SLIDE;
  slideID: number;
}

interface UpdatePreviousSlideAction {
  type: Types.UPDATE_PREVIOUS_SLIDE;
}

export type TestimonialsActionTypes =
  | SwipeSlideAction
  | UpdatePreviousSlideAction;
