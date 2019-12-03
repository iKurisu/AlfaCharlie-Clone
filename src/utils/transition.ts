import { MappedProperty } from "hooks/transition/types";

export const getPropFunction = (
  prop: string | number,
  array: boolean = false
): string | string[] => {
  const propFunction =
    typeof prop === "string"
      ? prop.match(
          /((translate|scale|rotate)([XYZ]|3d)?|skew[XY]?|matrix(3d)?)(?=\()/g
        )
      : null;

  return propFunction ? (array ? propFunction : propFunction[0]) : null;
};

export const getValue = (prop: string | number): number =>
  typeof prop === "string" ? +prop.match(/-?\d+/g)[0] : prop;

export const getUnit = (prop: string | number): string => {
  const match = typeof prop === "string" ? prop.match(/px|%|vw|vh|deg/g) : null;

  return match ? match[0] : null;
};

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

export const getCurrentValue = (
  { targetValue, initialValue }: MappedProperty,
  ease: number
): number => {
  const applyEase = (targetValue: number): number =>
    ease * (targetValue - initialValue) + initialValue;

  return applyEase(targetValue);
};
