import reducer from "../reducer";
import { LoaderActionTypes, LoaderState, Types } from "../types";

describe("intro reducer", (): void => {
  it("returns initial state", (): void => {
    const expectedState: LoaderState = {
      toggled: false
    };

    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    expect(reducer(undefined, {} as LoaderActionTypes)).toEqual(expectedState);
  });

  it("handles TOGGLE_INTRO", (): void => {
    const action: LoaderActionTypes = {
      type: Types.TOGGLE_LOADER
    };

    expect(reducer(undefined, action)).toEqual({ toggled: true });
    expect(reducer({ toggled: true }, action)).toEqual({ toggled: false });
  });
});
