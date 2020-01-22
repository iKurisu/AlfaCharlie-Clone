import { AgencyPayload, Types, AgencyActionTypes } from "./types";

const calculateDistanceFromTop = (
  elements: AgencyPayload
): AgencyActionTypes => ({
  type: Types.CALCULATE_DISTANCE_FROM_TOP,
  payload: elements
});

export default {
  calculateDistanceFromTop
};
