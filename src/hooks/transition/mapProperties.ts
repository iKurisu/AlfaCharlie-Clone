import { getPropFunction, getValue, getUnit } from "utils/transition";
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
      return {
        ...prev,
        ...{
          [curr]: {
            function: getPropFunction(from[curr] || to[curr]),
            initialValue: from.hasOwnProperty(curr)
              ? getValue(from[curr])
              : null,
            targetValue: to.hasOwnProperty(curr) ? getValue(to[curr]) : null,
            unit: getUnit(from[curr]) || getUnit(to[curr])
          }
        }
      };
    },
    {}
  );
};

export default mapProperties;
