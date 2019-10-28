import { useState, useEffect } from "react";
import { mapQuery, mapReturn } from "./mediaQuery/mapQuery";

const useMediaQuery = (queries: string[]): number => {
  const [matchedQueryValue, setMatchedQueryValue] = useState(null);

  const orientationMatches = (query: string): boolean => {
    const { innerWidth, innerHeight } = window;
    const orientation = innerWidth > innerHeight ? "landscape" : "portrait";

    return !query || (query && orientation === "landscape");
  };

  const findQuery = (): string => {
    const { innerWidth } = window;

    return queries.find((query): boolean => {
      const { type, breakpoint, orientation } = mapQuery(query);

      return type === "min"
        ? breakpoint < innerWidth && orientationMatches(orientation)
        : breakpoint > innerWidth && orientationMatches(orientation);
    });
  };

  const getQueryValue = (query: string): number => {
    const { innerWidth } = window;
    const { value, unit } = mapReturn(query);

    return unit === "px" ? value : (value * innerWidth) / 100;
  };

  const updateValue = (): void => {
    const matchedQuery = findQuery();
    const queryValue = getQueryValue(matchedQuery);

    setMatchedQueryValue(queryValue);
  };

  useEffect((): (() => void) => {
    updateValue();
    window.addEventListener("resize", updateValue);

    return (): void => window.removeEventListener("resize", updateValue);
  }, []);

  return matchedQueryValue;
};

export default useMediaQuery;
