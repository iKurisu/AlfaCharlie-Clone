import { RefObject } from "react";

const setProperty = (property: string) => (ref: RefObject<HTMLDivElement>) => (
  value: string
): void => ref.current.style.setProperty(property, value);

export const setTransform = setProperty("transform");
export const setTransition = setProperty("transition");
