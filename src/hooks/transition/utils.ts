import { MappedProperty } from "./types";

export const getPropFunction = (prop: string | number): string[] => {
  const propFunction =
    typeof prop === "string"
      ? prop.match(
          /((translate|scale|rotate)([XYZ]|3d)?|skew[XY]?|matrix(3d)?)(?=\()/g
        )
      : [];

  return propFunction;
};

export const getValue = (prop: string | number): number =>
  typeof prop === "string" ? +prop.match(/-?\d+/g)[0] : prop;

export const getUnit = (prop: string): string => {
  const match = prop.match(/px|%|vw|vh|deg/g);

  return match ? match[0] : null;
};

export const indexOfFn = (fn: string, properties: string[]): number =>
  properties.findIndex((property: string): boolean => {
    const regex = new RegExp(fn, "g");
    return property.match(regex) !== null;
  });

const framesInMs = 60 / 1000;
const frameDuration = 1 / framesInMs;

export const getTotalFrames = (duration: number): number =>
  duration * framesInMs;

export const getEasingTime = (
  currentFrame: number,
  duration: number
): number => {
  const transcurredTime = currentFrame * frameDuration;
  return duration === 0 ? 1 : transcurredTime / duration;
};

export const applyEase = (
  { targetValue, initialValue }: MappedProperty,
  ease: number
): number => ease * (targetValue - initialValue) + initialValue;
