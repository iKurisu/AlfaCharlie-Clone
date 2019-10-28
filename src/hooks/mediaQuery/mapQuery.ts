import { type, breakpoint, orientation, value, unit } from "./regex";
import { MappedQuery, MappedReturn } from "./types";

const matchRegex = <T>(
  regex: RegExp,
  errMsg: string,
  returnCb: (match: RegExpMatchArray) => T
): ((query: string) => T) => (query): T => {
  const match = query.match(regex);

  if (!match && errMsg) {
    throw Error(errMsg);
  }

  return returnCb(match);
};

const getType = matchRegex(
  type,
  "Invalid breakpoint type.",
  (match): "min" | "max" => match[0] as MappedQuery["type"]
);

const getBreakpoint = matchRegex(
  breakpoint,
  "Invalid breakpoint value.",
  (match): number => +match[1]
);

const getOrientation = matchRegex(orientation, null, (match): "landscape" =>
  match ? (match[1] as MappedQuery["orientation"]) : null
);

const getValue = matchRegex(
  value,
  "Invalid return value.",
  (match): number => +match[1]
);

const getUnit = matchRegex(
  unit,
  "Invalid return unit.",
  (match): "px" | "vw" => match[1] as MappedReturn["unit"]
);

export const mapQuery = (query: string): MappedQuery => ({
  type: getType(query),
  breakpoint: getBreakpoint(query),
  orientation: getOrientation(query)
});

export const mapReturn = (query: string): MappedReturn => ({
  value: getValue(query),
  unit: getUnit(query)
});
