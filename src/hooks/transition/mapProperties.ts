import { getPropFunction, getValue, getUnit, indexOfFn } from "./utils";
import { mergeWithoutDupicates } from "utils/array";
import { Properties, MappedProperty, MappedProperties } from "./types";

/**
 * Maps `opacity` properties into a `MappedProperty`.
 * @param from The initial properties.
 * @param to The target properties.
 */
const getOpacityProperties = (
  from: Properties,
  to: Properties
): MappedProperty => ({
  initialValue: "opacity" in from ? getValue(from.opacity) : null,
  targetValue: "opacity" in to ? getValue(to.opacity) : null
});

const getProperty = <T>(cb: (prop: string | number) => T) => (
  fn: string,
  properties: string[]
): T => {
  const indexOfCb = indexOfFn(fn, properties);
  return indexOfCb !== -1 ? cb(properties[indexOfCb]) : null;
};

const getPropertyValue = getProperty(getValue);
const getPropertyUnit = getProperty(getUnit);

/**
 * Maps properties that uses functions, such as `transform`, into a
 * `MappedProperty`.
 * @param fn The property's function.
 * @param properties The initial and target properties.
 */
const mapPropertiesWithFn = (
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

/**
 * Maps `transform` properties into a `MappedProperty`.
 * @param from The initial properties.
 * @param to The target properties.
 */
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
    (fn: string): MappedProperty => mapPropertiesWithFn(fn, properties)
  );
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
          ? getTransformProperties(from, to)
          : curr === "opacity"
          ? getOpacityProperties(from, to)
          : "TODO";

      return { ...prev, ...{ [curr]: properties } };
    },
    {}
  );
};

export default mapProperties;
