import { getPropFunction, getValue, getUnit } from "utils/transition";
import { mergeWithoutDupicates } from "utils/array";
import { Properties, MappedProperty, MappedProperties } from "./types";

const getOpacityProperties = (
  { from, to }: { from: Properties; to: Properties },
  key: keyof Properties
): MappedProperty => ({
  function: getPropFunction(from[key] || to[key]) as string,
  initialValue: from.hasOwnProperty(key) ? getValue(from[key]) : null,
  targetValue: to.hasOwnProperty(key) ? getValue(to[key]) : null,
  unit: getUnit(from[key]) || getUnit(to[key])
});

const getIndexOfFunc = (fn: string, properties: string[]): number =>
  properties.findIndex((property: string): boolean => {
    const regex = new RegExp(fn, "g");
    return property.match(regex) !== null;
  });

const getProperty = <T>(
  cb: (prop: string | number) => T
): ((fn: string, properties: string[]) => T) => (fn, properties): T => {
  const indexofFunc = getIndexOfFunc(fn, properties);
  return indexofFunc !== -1 ? cb(properties[indexofFunc]) : null;
};

const getPropertyValue = getProperty(getValue);
const getPropertyUnit = getProperty(getUnit);

const getMappedTransformProperty = (
  fn: string,
  {
    initialProperties,
    targetProperties
  }: { initialProperties: string[]; targetProperties: string[] }
): MappedProperty => ({
  function: fn,
  initialValue: getPropertyValue(fn, initialProperties),
  targetValue: getPropertyValue(fn, targetProperties),
  unit:
    getPropertyUnit(fn, initialProperties) ||
    getPropertyUnit(fn, targetProperties)
});

const getTransformProperties = (
  { from, to }: { from: Properties; to: Properties },
  key: "transform"
): MappedProperty | MappedProperty[] => {
  const functions = mergeWithoutDupicates(
    (getPropFunction(from[key], true) as string[]) || [],
    (getPropFunction(to[key], true) as string[]) || []
  );

  if (functions.length === 0) {
    throw Error("Invalid 'transform' value.");
  }

  const properties = {
    initialProperties: from.hasOwnProperty(key) ? from[key].split(" ") : [],
    targetProperties: to.hasOwnProperty(key) ? to[key].split(" ") : []
  };

  return functions.length > 1
    ? functions.map(
        (fn: string): MappedProperty =>
          getMappedTransformProperty(fn, properties)
      )
    : getMappedTransformProperty(functions[0], properties);
};

const mapProperties = (from: Properties, to: Properties): MappedProperties => {
  const properties = mergeWithoutDupicates(
    Object.keys(from),
    Object.keys(to)
  ) as (keyof Properties)[];

  return properties.reduce(
    (prev: MappedProperties, curr: keyof Properties): MappedProperties => {
      const properties =
        curr === "transform"
          ? getTransformProperties({ from, to }, curr)
          : getOpacityProperties({ from, to }, curr);

      return { ...prev, ...{ [curr]: properties } };
    },
    {}
  );
};

export default mapProperties;
