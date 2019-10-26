import { type, breakpoint, orientation, value } from "./regex";
import { MappedQuery } from "./types";

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
  (match): string => match[1]
);

const mapQuery = (query: string): MappedQuery => ({
  type: getType(query),
  breakpoint: getBreakpoint(query),
  orientation: getOrientation(query),
  value: getValue(query)
});

export default mapQuery;
