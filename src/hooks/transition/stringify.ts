import { Properties, MappedProperties } from "./types";
import { getCurrentValue } from "utils/transition";

const stringify = (fn: string, value: number, unit: string): string | number =>
  fn ? `${fn}(${value}${unit || ""})` : unit ? `${value}${unit}` : value;

const isNullAt = (
  moment: "end" | "start",
  { value, ease }: { [value: string]: number; ease: number }
): boolean => value === null && ease === (moment === "end" ? 1 : 0);

const bothAreNull = (x: number, y: number): boolean => x === null && y === null;

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

      const value = isNullAt("end", { initialValue, ease })
        ? targetValue
        : isNullAt("start", { targetValue, ease })
        ? initialValue
        : getCurrentValue({ initialValue, targetValue }, ease);

      if (!bothAreNull(initialValue, targetValue)) {
        Object.assign(properties, {
          [property]: stringify(fn, value, unit)
        });
      }

      return properties;
    },
    {}
  );

export default stringifyProperties;
