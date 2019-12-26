import { Filters, WorkActionTypes, Types } from "./types";

const setVisibilityFilter = (filter: Filters): WorkActionTypes => ({
  type: Types.SET_VISIBILITY_FILTER,
  filter
});

export default { setVisibilityFilter };
