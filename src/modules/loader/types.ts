export enum Types {
  TOGGLE_LOADER = "loader/TOGGLE"
}

export interface LoaderState {
  toggled: boolean;
}

interface ToggleLoader {
  type: Types.TOGGLE_LOADER;
}

export type LoaderActionTypes = ToggleLoader;
