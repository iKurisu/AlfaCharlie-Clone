import { AppState } from "store";
import { Types, MenuActionTypes } from "./types";
import { getDuration } from "utils/slider";
import { ThunkAction } from "redux-thunk";

const toggleMenu = (): MenuActionTypes => ({
  type: Types.TOGGLE_MENU
});

const setHoveringElement = (elementID: number): MenuActionTypes => ({
  type: Types.SET_HOVERING_ELEMENT,
  elementID
});

const updatePreviousElement = (): MenuActionTypes => ({
  type: Types.UPDATE_PREVIOUS_ELEMENT
});

const hoverElement = (
  elementID: number,
  maxTransitionDuration: number
): ThunkAction<void, AppState, null, MenuActionTypes> => (
  dispatch,
  getState
) => {
  dispatch(setHoveringElement(elementID));

  const { menu } = getState();
  const { hoveringElementID, previousElementID } = menu;
  const delay = getDuration(
    { current: hoveringElementID, previous: previousElementID },
    maxTransitionDuration
  );

  setTimeout(() => dispatch(updatePreviousElement()), delay);
};

export default {
  toggleMenu,
  setHoveringElement,
  updatePreviousElement,
  hoverElement
};
