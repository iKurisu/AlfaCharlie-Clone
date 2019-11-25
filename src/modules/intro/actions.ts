import { IntroActionTypes, Types } from "./types";

const toggleIntro = (): IntroActionTypes => ({
  type: Types.TOGGLE_INTRO
});

export default {
  toggleIntro
};
