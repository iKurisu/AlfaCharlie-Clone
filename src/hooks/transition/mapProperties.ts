import { getPropFunction, getValue, getUnit } from "utils/transition";
import { mergeWithoutDupicates } from "utils/array";
import { Properties, MappedProperty, MappedProperties } from "./types";

const getOpacityProperties = (
  from: Properties,
  to: Properties
): MappedProperty => ({
  initialValue: "opacity" in from ? getValue(from.opacity) : null,
  targetValue: "opacity" in to ? getValue(to.opacity) : null
});

const indexOfFn = (fn: string, properties: string[]): number =>
  properties.findIndex((property: string): boolean => {
    const regex = new RegExp(fn, "g");
    return property.match(regex) !== null;
  });

const getProperty = <T>(
  cb: (prop: string | number) => T
): ((fn: string, properties: string[]) => T) => (fn, properties): T => {
  const indexOfCb = indexOfFn(fn, properties);
  return indexOfCb !== -1 ? cb(properties[indexOfCb]) : null;
};

const getPropertyValue = getProperty(getValue);
const getPropertyUnit = getProperty(getUnit);

const mapTransformProperties = (
  fn: string,
  { initialProperties, targetProperties }: { [k: string]: string[] }
): MappedProperty => ({
  function: fn,
  initialValue: getPropertyValue(fn, initialProperties),
  targetValue: getPropertyValue(fn, targetProperties),
  unit:
    getPropertyUnit(fn, initialProperties) ||
    getPropertyUnit(fn, targetProperties)
});

const getTransformProperties = (
  from: Properties,
  to: Properties
): MappedProperty | MappedProperty[] => {
  const functions = mergeWithoutDupicates(
    getPropFunction(from.transform),
    getPropFunction(to.transform)
  );

  if (functions.length === 0) {
    throw Error("Invalid 'transform' value.");
  }

  const properties = {
    initialProperties: "transform" in from ? from.transform.split(" ") : [],
    targetProperties: "transform" in to ? to.transform.split(" ") : []
  };

  return functions.map(
    (fn: string): MappedProperty => mapTransformProperties(fn, properties)
  );
};

const mapProperties = (from: Properties, to: Properties): MappedProperties => {
  const properties = mergeWithoutDupicates(Object.keys(from), Object.keys(to));

  return properties.reduce(
    (prev: MappedProperties, curr: keyof Properties): MappedProperties => {
      const properties =
        curr === "transform"
          ? getTransformProperties(from, to)
          : getOpacityProperties(from, to);

      return { ...prev, ...{ [curr]: properties } };
    },
    {}
  );
};

export default mapProperties;
