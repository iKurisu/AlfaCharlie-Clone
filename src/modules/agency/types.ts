import { RefObject } from "react";

export enum Types {
  CALCULATE_DISTANCE_FROM_TOP = "agency/CALCULATE_DISTANCE_FROM_TOP"
}

export interface AgencyState {
  expertise: number;
  team: number;
  clients: number;
}

export type MapKeys<T, v> = {
  [K in keyof T]: v;
};

export type AgencyPayload = MapKeys<AgencyState, RefObject<HTMLDivElement>>;

interface CalculateDistanceFromTop {
  type: Types.CALCULATE_DISTANCE_FROM_TOP;
  payload: AgencyPayload;
}

export type AgencyActionTypes = CalculateDistanceFromTop;
