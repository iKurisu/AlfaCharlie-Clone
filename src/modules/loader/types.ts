export enum Types {
  TOGGLE_MAIN_LOADER = "loader/main/TOGGLE",
  TOGGLE_FOOTER_LOADER = "loader/footer/TOGGLE"
}

export interface LoaderState {
  main: boolean;
  footer: boolean;
}

interface ToggleMainLoader {
  type: Types.TOGGLE_MAIN_LOADER;
}

interface ToggleFooterLoader {
  type: Types.TOGGLE_FOOTER_LOADER;
}

export type LoaderActionTypes = ToggleMainLoader | ToggleFooterLoader;
