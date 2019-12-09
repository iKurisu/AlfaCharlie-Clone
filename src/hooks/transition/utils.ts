import { MappedProperty } from "./types";

/**
 * Returns the function used in a `transform` property.
 *
 * @param prop A `transform` property.
 * @returns An array containing the matched functions.
 */
export const getPropFunction = (prop: string): string[] => {
  const matchedFunctions = prop
    ? prop.match(
        /((translate|scale|rotate)([XYZ]|3d)?|skew[XY]?|matrix(3d)?)(?=\()/g
      )
    : [];

  return matchedFunctions;
};

/**
 * @param prop Any property.
 * @returns The value of a property
 */
export const getValue = (prop: string | number): number =>
  typeof prop === "string" ? +prop.match(/-?\d+/g)[0] : prop;

/**
 * @param prop Any property.
 * @returns The unit of a property.
 */
export const getUnit = (prop: string): string => {
  const match = prop.match(/px|%|vw|vh|deg/g);

  return match ? match[0] : null;
};

/**
 * @param fn The function to match.
 * @param properties An array of strings to look in.
 * @returns The index of the function.
 */
export const indexOfFn = (fn: string, properties: string[]): number =>
  properties.findIndex((property: string): boolean => {
    const regex = new RegExp(fn, "g");
    return property.match(regex) !== null;
  });

const framesInMs = 60 / 1000;

/**
 * @param duration The duration of the transition.
 * @returns The frames of the transition.
 */
export const toFrames = (duration: number): number => duration * framesInMs;

/**
 * @param currentFrame The transition's current frame.
 * @param maxFrames The frames of the transition.
 * @returns The easing progress.
 */
export const getProgress = (currentFrame: number, maxFrames: number): number =>
  maxFrames === 0 ? 1 : currentFrame / maxFrames;

/**
 * @param property A mapped property.
 * @param ease An ease value.
 * @returns The new property value with the ease applied.
 */
export const applyEase = (
  { targetValue, initialValue }: MappedProperty,
  ease: number
): number => ease * (targetValue - initialValue) + initialValue;
