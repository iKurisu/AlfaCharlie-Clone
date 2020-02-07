import { AgencyState, AgencyActionTypes, Types } from "./types";

const initialState: AgencyState = {
  expertise: 0,
  team: 0,
  clients: 0
};

const reducer = (
  state = initialState,
  action: AgencyActionTypes
): AgencyState => {
  switch (action.type) {
    case Types.CALCULATE_DISTANCE_FROM_TOP:
      const { expertise, team, clients } = action.payload;

      return {
        expertise: expertise.current.offsetTop,
        team: team.current.offsetTop,
        clients: clients.current.offsetTop
      };
    default:
      return state;
  }
};

export default reducer;
