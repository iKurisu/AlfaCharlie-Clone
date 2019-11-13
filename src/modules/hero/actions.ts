import { HeroActionTypes, Types } from "./types";

const setSlide = (slideID: number): HeroActionTypes => ({
  type: Types.SET_CURRENT_SLIDE,
  slideID
});

const updatePreviousSlide = (): HeroActionTypes => ({
  type: Types.UPDATE_PREVIOUS_SLIDE
});

export default {
  setSlide,
  updatePreviousSlide
};
