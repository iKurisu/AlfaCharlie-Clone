import actions from "../actions";
import { AgencyActionTypes, Types, AgencyPayload } from "../types";

describe("hero actions", (): void => {
  it("creates an action to set the new slide", (): void => {
    const nullPayload: AgencyPayload = {
      expertise: null,
      team: null,
      clients: null
    };

    const expectedAction: AgencyActionTypes = {
      type: Types.CALCULATE_DISTANCE_FROM_TOP,
      payload: nullPayload
    };

    expect(actions.calculateDistanceFromTop(nullPayload)).toEqual(
      expectedAction
    );
  });
});
