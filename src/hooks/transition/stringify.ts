import { Properties, MappedProperties, MappedProperty, Types } from "./types";
import { applyEase } from "./utils";

/**
 * Converts the parameters of a `MappedProperty` into a string;
 *
 * @param fn The property's function.
 * @param value The property's value.
 * @param unit The property's unit.
 *
 * @returns The property as a string.
 */
const stringify = (fn: string, value: number, unit: string): string =>
  fn ? `${fn}(${value}${unit || ""})` : `${value}${unit || ""}`;

const at = (moment: "end" | "start") => (ease: number): boolean =>
  ease === (moment === "end" ? 1 : 0);

const atEnd = at("end");

const validValue = (
  { initialValue, targetValue }: MappedProperty,
  ease: number
): number => {
  if (initialValue === null && !atEnd(ease)) {
    return null;
  }

  const value =
    initialValue === null && atEnd(ease)
      ? targetValue
      : targetValue === null
      ? initialValue
      : applyEase({ initialValue, targetValue }, ease);

  return value;
};

const stringifyProperty = (
  ease: number,
  { function: fn, initialValue, targetValue, unit }: MappedProperty
): string => {
  const value = validValue({ initialValue, targetValue }, ease);

  return value !== null ? stringify(fn, value, unit) : null;
};

const stringifyTransform = (
  mappedProperty: MappedProperty[],
  ease: number
): string =>
  mappedProperty
    .reduce((properties: string[], property: MappedProperty): string[] => {
      const stringified = stringifyProperty(ease, property);

      return stringified !== null ? [...properties, stringified] : properties;
    }, [])
    .join(" ");

const stringifyProperties = (
  mappedProperties: MappedProperties,
  ease: number
): Properties =>
  Object.keys(mappedProperties).reduce(
    (properties: Properties, key: keyof Properties): Properties => {
      switch (key) {
        case Types.transform:
          return {
            ...properties,
            ...{
              transform: stringifyTransform(mappedProperties.transform, ease)
            }
          };
        case Types.opacity:
          return {
            ...properties,
            ...{ opacity: validValue(mappedProperties.opacity, ease) }
          };
        default:
          const value = stringifyProperty(ease, mappedProperties[
            key
          ] as MappedProperty);

          return value !== null
            ? { ...properties, ...{ [key]: value } }
            : properties;
      }
    },
    {}
  );

export default stringifyProperties;
