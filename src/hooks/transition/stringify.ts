import { Properties, MappedProperties } from "./types";
import { getCurrentValue } from "utils/transition";

const stringify = (fn: string, value: number, unit: string): string | number =>
  fn ? `${fn}(${value}${unit || ""})` : unit ? `${value}${unit}` : value;

const at = (moment: "end" | "start", ease: number): boolean =>
  ease === (moment === "end" ? 1 : 0);

const stringifyProperties = (
  mappedProperties: MappedProperties,
  ease: number
): Properties =>
  Object.keys(mappedProperties).reduce(
    (properties: Properties, property: keyof Properties): Properties => {
      const {
        function: fn,
        initialValue,
        targetValue,
        unit
      } = mappedProperties[property];

      if (initialValue === null && !at("end", ease)) {
        return properties;
      }

      const value =
        initialValue === null && at("end", ease)
          ? targetValue
          : targetValue === null
          ? initialValue
          : getCurrentValue({ initialValue, targetValue }, ease);

      return { ...properties, ...{ [property]: stringify(fn, value, unit) } };
    },
    {}
  );

export default stringifyProperties;
