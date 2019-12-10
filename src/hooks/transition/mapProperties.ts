import { getPropFunction, getValue, getUnit, indexOfFn } from "./utils";
import { mergeWithoutDupicates } from "utils/array";
import { Properties, MappedProperty, MappedProperties } from "./types";

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
 * Maps properties with functions, such as `transform`, into a
 * `MappedProperty`.
 * @param fn The property's function.
 * @param properties The initial and target properties.
 */
const mapPropsWithFn = (
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
 * Maps properties that without functions.
 * @param from The initial properties.
 * @param to The target properties.
 * @param key The name of the property, i.e., `opacity`, `width`, etc.
 */
const mapPropsWithoutFn = (
  from: Properties,
  to: Properties,
  key: keyof Properties
): MappedProperty => {
  const plain = {
    initialValue: key in from ? getValue(from[key]) : null,
    targetValue: key in to ? getValue(to[key]) : null
  };

  const unit =
    key !== "opacity" ? getUnit(from[key]) || getUnit(to[key]) : null;

  return Object.assign({}, plain, { unit });
};

/**
 * Maps `transform` properties into a `MappedProperty`.
 * @param from The initial properties.
 * @param to The target properties.
 */
const getTransformProperties = (
  from: Properties,
  to: Properties
): MappedProperty[] => {
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
    (fn: string): MappedProperty => mapPropsWithFn(fn, properties)
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
          : mapPropsWithoutFn(from, to, curr);

      return { ...prev, ...{ [curr]: properties } };
    },
    {}
  );
};

export default mapProperties;
