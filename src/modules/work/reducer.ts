import { WorkState, WorkActionTypes, Types } from "./types";

const initialState: WorkState = {
  visibilityFilter: "ALL"
};

const reducer = (state = initialState, action: WorkActionTypes): WorkState => {
  switch (action.type) {
    case Types.SET_VISIBILITY_FILTER:
      return { visibilityFilter: action.filter };
    default:
      return state;
  }
};

export default reducer;
