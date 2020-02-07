import actions from "../actions";
import { LoaderActionTypes, Types } from "../types";

describe("loader actions", (): void => {
  it("creates an action to toggle the main loader", (): void => {
    const expectedAction: LoaderActionTypes = {
      type: Types.TOGGLE_MAIN_LOADER
    };

    expect(actions.toggleMainLoader()).toEqual(expectedAction);
  });

  it("creates an action to toggle the footer loader", (): void => {
    const expectedAction: LoaderActionTypes = {
      type: Types.TOGGLE_FOOTER_LOADER
    };

    expect(actions.toggleFooterLoader()).toEqual(expectedAction);
  });
});
