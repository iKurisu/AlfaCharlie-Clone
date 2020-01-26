import { LoaderActionTypes, Types } from "./types";

const toggleMainLoader = (): LoaderActionTypes => ({
  type: Types.TOGGLE_MAIN_LOADER
});

const toggleFooterLoader = (): LoaderActionTypes => ({
  type: Types.TOGGLE_FOOTER_LOADER
});

export default {
  toggleMainLoader,
  toggleFooterLoader
};
