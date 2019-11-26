import { TestimonialsActionTypes, Types } from "./types";

const swipeSlide = (slideID: number): TestimonialsActionTypes => ({
  type: Types.SWIPE_SLIDE,
  slideID
});

const updatePreviousSlide = (): TestimonialsActionTypes => ({
  type: Types.UPDATE_PREVIOUS_SLIDE
});

export default {
  swipeSlide,
  updatePreviousSlide
};
