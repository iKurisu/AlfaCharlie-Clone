import reducer from "../reducer";
import { IntroActionTypes, IntroState, Types } from "../types";

describe("intro reducer", (): void => {
  it("returns initial state", (): void => {
    const expectedState: IntroState = {
      toggled: true
    };

    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    expect(reducer(undefined, {} as IntroActionTypes)).toEqual(expectedState);
  });

  it("handles TOGGLE_INTRO", (): void => {
    const action: IntroActionTypes = {
      type: Types.TOGGLE_INTRO
    };

    expect(reducer(undefined, action)).toEqual({ toggled: false });
  });
});
