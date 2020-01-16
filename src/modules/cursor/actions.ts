import { Types, CursorActionTypes, HoverableElement } from "./types";

const resetCursor = (): CursorActionTypes => ({
  type: Types.RESET_CURSOR
});

const hoverElement = (element: HoverableElement): CursorActionTypes => ({
  type: Types.HOVER_ELEMENT,
  payload: element
});

export default {
  resetCursor,
  hoverElement
};
