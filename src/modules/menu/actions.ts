import { Types, MenuActionTypes } from "./types";

const toggleMenu = (): MenuActionTypes => ({
  type: Types.TOGGLE_MENU
});

const setHoveringElement = (elementID: number): MenuActionTypes => ({
  type: Types.SET_HOVERING_ELEMENT,
  elementID
});

const updatePreviousElement = (): MenuActionTypes => ({
  type: Types.UPDATE_PREVIOUS_ELEMENT
});

export default {
  toggleMenu,
  setHoveringElement,
  updatePreviousElement
};
