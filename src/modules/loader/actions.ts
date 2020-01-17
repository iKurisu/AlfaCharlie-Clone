import { LoaderActionTypes, Types } from "./types";

const toggleLoader = (): LoaderActionTypes => ({
  type: Types.TOGGLE_LOADER
});

export default {
  toggleLoader
};
