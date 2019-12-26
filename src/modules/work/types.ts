export enum Types {
  SET_VISIBILITY_FILTER = "work/SET_VISIBILITY_FILTER"
}

export enum VisibilityFilter {
  ALL = "ALL",
  BRANDING = "BRANDING",
  DIGITAL = "DIGITAL"
}

export type Filters = keyof typeof VisibilityFilter;

export interface WorkState {
  visibilityFilter: Filters;
}

export interface SetVisibilityFilterAction {
  type: Types.SET_VISIBILITY_FILTER;
  filter: Filters;
}

export type WorkActionTypes = SetVisibilityFilterAction;
