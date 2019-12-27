export enum Types {
  TOGGLE_MENU = "menu/TOGGLE",
  SET_HOVERING_ELEMENT = "menu/SET_HOVERING_ELEMENT",
  UPDATE_PREVIOUS_ELEMENT = "menu/UPDATE_PREVIOUS_ELEMENT",
  END_TRANSITION = "menu/END_TRANSITION"
}

export interface MenuState {
  toggled: boolean;
  hoveringElementID: number;
  previousElementID: number;
  onTransition: boolean;
}

interface ToggleMenuAction {
  type: Types.TOGGLE_MENU;
}

interface SetHoveringElementAction {
  type: Types.SET_HOVERING_ELEMENT;
  slideID: number;
}

interface UpdatePreviousElementAction {
  type: Types.UPDATE_PREVIOUS_ELEMENT;
}

interface EndTransition {
  type: Types.END_TRANSITION;
}

export type MenuActionTypes =
  | ToggleMenuAction
  | SetHoveringElementAction
  | UpdatePreviousElementAction
  | EndTransition;
