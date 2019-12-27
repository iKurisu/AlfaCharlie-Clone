import { Types, MenuActionTypes } from "./types";

const toggleMenu = (): MenuActionTypes => ({
  type: Types.TOGGLE_MENU
});

const setSlide = (slideID: number): MenuActionTypes => ({
  type: Types.SET_HOVERING_ELEMENT,
  slideID
});

const updatePreviousSlide = (): MenuActionTypes => ({
  type: Types.UPDATE_PREVIOUS_ELEMENT
});

const endTransition = (): MenuActionTypes => ({
  type: Types.END_TRANSITION
});

export default {
  toggleMenu,
  setSlide,
  updatePreviousSlide,
  endTransition
};
