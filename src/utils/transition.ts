import { MappedProperty } from "hooks/transition/types";

export const getPropFunction = (prop: string | number): string => {
  const propFunction =
    typeof prop === "string"
      ? prop.match(
          /((translate|scale|rotate)([XYZ]|3d)?|skew[XYZ]?|matrix(3d)?)(?=\()/g
        )
      : null;

  return propFunction ? propFunction[0] : null;
};

export const getValue = (prop: string | number): number =>
  typeof prop === "string" ? +prop.match(/\d+/g)[0] : prop;

export const getUnit = (prop: string | number): string =>
  typeof prop === "string" ? prop.match(/px|%|vw|vh/g)[0] : null;

const framesInMs = 60 / 1000;
const frameDuration = 1 / framesInMs;

export const getTotalFrames = (duration: number): number =>
  duration * framesInMs;

export const getEasingTime = (
  currentFrame: number,
  duration: number
): number => {
  const transcurredTime = currentFrame * frameDuration;
  return transcurredTime / duration;
};

export const getCurrentValue = (
  { targetValue, initialValue }: MappedProperty,
  ease: number
): number => {
  const applyEase = (targetValue: number): number =>
    ease * (targetValue - initialValue) + initialValue;

  return applyEase(targetValue);
};
