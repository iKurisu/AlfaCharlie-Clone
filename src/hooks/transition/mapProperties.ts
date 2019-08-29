import { getPropFunction, getValue, getUnit } from "utils/transition";
import { Properties, MappedProperties } from "./types";

const mergeWithoutDupicates = <T>(arr1: T[], arr2: T[]): T[] => {
  const mergedArray: T[] = [...arr1, ...arr2];

  return mergedArray.filter(
    (value: T, index: number): boolean => mergedArray.indexOf(value) === index
  );
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
            function: getPropFunction(
              from.hasOwnProperty(curr) ? from[curr] : to[curr]
            ),
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
