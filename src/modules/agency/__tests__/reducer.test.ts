/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
import reducer from "../reducer";
import { AgencyActionTypes, AgencyState, Types } from "../types";
import { RefObject } from "react";

const refObjectMock = (multiplier: number): RefObject<HTMLDivElement> => ({
  current: { offsetTop: 1000 * multiplier } as HTMLDivElement
});

describe("hero reducer", (): void => {
  it("returns the initial state", (): void => {
    const initialState: AgencyState = {
      expertise: 0,
      team: 0,
      clients: 0
    };

    expect(reducer(undefined, {} as AgencyActionTypes)).toEqual(initialState);
  });

  it("handles CALCULATE_DISTANCE_FROM_TOP", (): void => {
    const action: AgencyActionTypes = {
      type: Types.CALCULATE_DISTANCE_FROM_TOP,
      payload: {
        expertise: refObjectMock(0),
        team: refObjectMock(1),
        clients: refObjectMock(2)
      }
    };

    expect(reducer(undefined, action)).toEqual({
      expertise: 0,
      team: 1000,
      clients: 2000
    });
  });
});
