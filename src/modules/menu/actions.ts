import { Types, MenuActionTypes } from "./types";

const toggleMenu = (): MenuActionTypes => ({
  type: Types.TOGGLE_MENU
});

const setSlide = (elementID: number): MenuActionTypes => ({
  type: Types.SET_HOVERING_ELEMENT,
  elementID
});

const updatePreviousSlide = (): MenuActionTypes => ({
  type: Types.UPDATE_PREVIOUS_ELEMENT
});

export default {
  toggleMenu,
  setSlide,
  updatePreviousSlide
};
