export enum Types {
  TOGGLE_MENU = "menu/TOGGLE",
  SET_HOVERING_ELEMENT = "menu/SET_HOVERING_ELEMENT",
  UPDATE_PREVIOUS_ELEMENT = "menu/UPDATE_PREVIOUS_ELEMENT"
}

export interface MenuState {
  toggled: boolean;
  hoveringElementID: number;
  previousElementID: number;
}

interface ToggleMenuAction {
  type: Types.TOGGLE_MENU;
}

interface SetHoveringElementAction {
  type: Types.SET_HOVERING_ELEMENT;
  elementID: number;
}

interface UpdatePreviousElementAction {
  type: Types.UPDATE_PREVIOUS_ELEMENT;
}

export type MenuActionTypes =
  | ToggleMenuAction
  | SetHoveringElementAction
  | UpdatePreviousElementAction;
