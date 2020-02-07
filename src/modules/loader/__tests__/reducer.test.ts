import reducer from "../reducer";
import { LoaderActionTypes, LoaderState, Types } from "../types";

describe("loader reducer", (): void => {
  it("returns initial state", (): void => {
    const expectedState: LoaderState = {
      main: false,
      footer: false
    };

    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    expect(reducer(undefined, {} as LoaderActionTypes)).toEqual(expectedState);
  });

  it("handles TOGGLE_MAIN_LOADER", (): void => {
    const action: LoaderActionTypes = {
      type: Types.TOGGLE_MAIN_LOADER
    };

    expect(reducer(undefined, action)).toEqual({ main: true, footer: false });
    expect(reducer({ main: true, footer: false }, action)).toEqual({
      main: false,
      footer: false
    });
  });

  it("handles TOGGLE_FOOTER_LOADER", (): void => {
    const action: LoaderActionTypes = {
      type: Types.TOGGLE_FOOTER_LOADER
    };

    expect(reducer(undefined, action)).toEqual({ main: false, footer: true });
    expect(reducer({ main: false, footer: true }, action)).toEqual({
      main: false,
      footer: false
    });
  });
});
