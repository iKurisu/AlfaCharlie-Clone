export interface MappedQuery {
  type: "min" | "max";
  breakpoint: number;
  orientation: "landscape";
}

export interface MappedReturn {
  value: number;
  unit: "px" | "vw";
}
