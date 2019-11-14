export enum Types {
  TOGGLE_INTRO = "intro/TOGGLE_INTRO"
}

export interface IntroState {
  toggled: boolean;
}

interface ToggleIntroAction {
  type: Types.TOGGLE_INTRO;
}

export type IntroActionTypes = ToggleIntroAction;
