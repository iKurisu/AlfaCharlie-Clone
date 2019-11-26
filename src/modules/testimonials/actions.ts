import { TestimonialsActionTypes, Types } from "./types";

const setSlide = (slideID: number): TestimonialsActionTypes => ({
  type: Types.SET_SLIDE,
  slideID
});

const updatePreviousSlide = (): TestimonialsActionTypes => ({
  type: Types.UPDATE_PREVIOUS_SLIDE
});

export default {
  setSlide,
  updatePreviousSlide
};
