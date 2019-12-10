import { Properties, MappedProperties, MappedProperty } from "./types";
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

/**
 * Provides the correct value of a `MappedProperty` at a certain point of
 * the transition.
 *
 * @param property A `MappedProperty`.
 * @param ease The transition's progress.
 */
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

/**
 * Stringifies a `MappedProperty`.
 *
 * @param ease The transition's progress.
 * @param property A `MappedProperty`.
 */
const stringifyProperty = (
  ease: number,
  { function: fn, initialValue, targetValue, unit }: MappedProperty
): string => {
  const value = validValue({ initialValue, targetValue }, ease);

  return value !== null ? stringify(fn, value, unit) : null;
};

/**
 * Stringifies an array of `transform` properties.
 *
 * @param mappedProperty A `transform` property.
 * @param ease The transition's progress.
 */
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

/**
 * Stringifies the given `MappedProperties`.
 * @param mappedProperties An object of `MappedProperty`.
 * @param ease The transition's progres.
 */
const stringifyProperties = (
  mappedProperties: MappedProperties,
  ease: number
): Properties =>
  Object.keys(mappedProperties).reduce(
    (properties: Properties, key: keyof Properties): Properties => {
      switch (key) {
        case "transform":
          return {
            ...properties,
            ...{
              transform: stringifyTransform(mappedProperties.transform, ease)
            }
          };
        case "opacity":
          return {
            ...properties,
            ...{ opacity: validValue(mappedProperties.opacity, ease) }
          };
        default:
          const value = stringifyProperty(ease, mappedProperties[key]);

          return value !== null
            ? { ...properties, ...{ [key]: value } }
            : properties;
      }
    },
    {}
  );

export default stringifyProperties;
