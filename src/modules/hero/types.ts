export enum Types {
  SET_CURRENT_SLIDE = "hero/SET_CURRENT_SLIDE",
  UPDATE_PREVIOUS_SLIDE = "hero/UPDATE_PREVIOUS_SLIDE"
}

export interface HeroState {
  currentSlideID: number;
  previousSlideID: number;
}

interface SetSlideAction {
  type: Types.SET_CURRENT_SLIDE;
  slideID: number;
}

interface UpdatePreviousSlideAction {
  type: Types.UPDATE_PREVIOUS_SLIDE;
}

export type HeroActionTypes = SetSlideAction | UpdatePreviousSlideAction;
