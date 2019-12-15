import { getFunction, getValue, getUnit } from "./utils";
import { mergeWithoutDupicates } from "utils/array";
import { Properties, MappedProperty, MappedProperties } from "./types";

/** Matches the unit of the first property that has a valid unit. */
const unitFrom = (...props: (string | number)[]): string => {
  return getUnit(props.find(prop => Boolean(getUnit(prop))));
};

/** Matches the function of the first property that has a valid function. */
const functionFrom = (...props: (string | number)[]): string => {
  return getFunction(props.find(prop => Boolean(getFunction(prop))));
};

/**
 * Maps properties.
 * @param from The initial properties.
 * @param to The target properties.
 */
const mapProps = (
  from: string | number,
  to: string | number
): MappedProperty => ({
  function: functionFrom(from, to),
  initialValue: getValue(from),
  targetValue: getValue(to),
  unit: unitFrom(from, to)
});

const notEmpty = <T>(arr1: T[], arr2: T[]): T[] => (arr1.length ? arr1 : arr2);

/**
 * Maps `transform` properties into a `MappedProperty`.
 * @param from The initial properties.
 * @param to The target properties.
 */
const mapTransformProperties = (
  from: Properties,
  to: Properties
): MappedProperty[] => {
  const fromProps = "transform" in from ? from.transform.split(" ") : [];
  const toProps = "transform" in to ? to.transform.split(" ") : [];

  return notEmpty(fromProps, toProps).map((_, id) => {
    return mapProps(fromProps[id], toProps[id]);
  });
};

/**
 * Maps transition properties into a `MappedProperties` object.
 * @param from The initial properties.
 * @param to The target properties.
 */
const mapProperties = (from: Properties, to: Properties): MappedProperties => {
  const properties = mergeWithoutDupicates(Object.keys(from), Object.keys(to));

  return properties.reduce(
    (prev: MappedProperties, curr: keyof Properties): MappedProperties => {
      const properties =
        curr === "transform"
          ? mapTransformProperties(from, to)
          : mapProps(from[curr], to[curr]);

      return { ...prev, ...{ [curr]: properties } };
    },
    {}
  );
};

export default mapProperties;
