export enum Cursor {
  SCROLL = "SCROLL",
  SLIDER = "SLIDER"
}

export enum HoverableElement {
  MENU = "MENU",
  HERO = "HERO",
  TESTIMONIALS = "TESTIMONIALS"
}

export enum Types {
  RESET_CURSOR = "cursor/RESET_CURSOR",
  HOVER_ELEMENT = "cursor/HOVER_ELEMENT"
}

export interface CursorState {
  currentCursor: Cursor;
  hovering: HoverableElement;
}

export interface ResetCursor {
  type: Types.RESET_CURSOR;
}

export interface HoverElement {
  type: Types.HOVER_ELEMENT;
  payload: HoverableElement;
}

export type CursorActionTypes = ResetCursor | HoverElement;
