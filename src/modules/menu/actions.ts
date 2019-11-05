import { Types, MenuActionTypes } from "./types";

const toggleMenu = (): MenuActionTypes => ({
  type: Types.TOGGLE_MENU
});

const hoverElement = (elementID: number): MenuActionTypes => ({
  type: Types.HOVER_ELEMENT,
  elementID
});

export default {
  toggleMenu,
  hoverElement
};
