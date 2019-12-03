import { Properties, MappedProperties, MappedProperty } from "./types";
import { getCurrentValue } from "utils/transition";

const stringify = (fn: string, value: number, unit: string): string | number =>
  fn ? `${fn}(${value}${unit || ""})` : unit ? `${value}${unit}` : value;

const at = (moment: "end" | "start", ease: number): boolean =>
  ease === (moment === "end" ? 1 : 0);

const getStringifiedValueAtTime = (
  ease: number,
  { function: fn, initialValue, targetValue, unit }: MappedProperty
): string | number => {
  if (initialValue === null && !at("end", ease)) {
    return null;
  }

  const value =
    initialValue === null && at("end", ease)
      ? targetValue
      : targetValue === null
      ? initialValue
      : getCurrentValue({ initialValue, targetValue }, ease);

  return stringify(fn, value, unit);
};

const stringifyTransformProperties = (
  mappedProperty: MappedProperty[],
  ease: number
): string =>
  mappedProperty
    .reduce(
      (stringifiedProperties: string[], property: MappedProperty): string[] => {
        const value = getStringifiedValueAtTime(ease, property) as string;

        return value !== null
          ? [...stringifiedProperties, value]
          : stringifiedProperties;
      },
      []
    )
    .join(" ");

const stringifyProperties = (
  mappedProperties: MappedProperties,
  ease: number
): Properties =>
  Object.keys(mappedProperties).reduce(
    (properties: Properties, key: keyof Properties): Properties => {
      if (key === "transform" && Array.isArray(mappedProperties[key])) {
        return {
          ...properties,
          ...{
            transform: stringifyTransformProperties(
              mappedProperties[key] as MappedProperty[],
              ease
            )
          }
        };
      }

      const value = getStringifiedValueAtTime(ease, mappedProperties[
        key
      ] as MappedProperty);

      return value !== null
        ? { ...properties, ...{ [key]: value } }
        : properties;
    },
    {}
  );

export default stringifyProperties;
