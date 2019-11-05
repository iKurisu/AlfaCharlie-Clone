export enum Types {
  TOGGLE_MENU = "menu/TOGGLE",
  HOVER_ELEMENT = "menu/HOVER_ELEMENT"
}

export interface MenuState {
  toggled: boolean;
  hoveringElementID: number;
  previousElementID: number;
}

interface ToggleMenuAction {
  type: Types.TOGGLE_MENU;
}

interface HoverElementAction {
  type: Types.HOVER_ELEMENT;
  elementID: number;
}

export type MenuActionTypes = ToggleMenuAction | HoverElementAction;
