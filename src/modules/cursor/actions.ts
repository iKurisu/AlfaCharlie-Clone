import { Types, CursorActionTypes } from "./types";

const switchCursor = (): CursorActionTypes => ({
  type: Types.SWITCH_CURSOR
});

export default {
  switchCursor
};
