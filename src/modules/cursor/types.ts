export enum Cursor {
  SCROLL = "SCROLL",
  SLIDER = "SLIDER"
}

export enum Types {
  SWITCH_CURSOR = "cursor/SWITCH_CURSOR"
}

export type CursorState = Cursor;

export interface SwitchCursor {
  type: Types.SWITCH_CURSOR;
}

export type CursorActionTypes = SwitchCursor;
