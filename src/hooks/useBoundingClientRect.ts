import { RefObject, useState, useEffect } from "react";

/** Provides the bounding client rect of an HTML element. */
const useBoundingClientRect = (element: RefObject<HTMLElement>): DOMRect => {
  const [boundingClientRect, setBoundingClientRect] = useState(null);

  const updateBoundingClientRect = (): void => {
    setBoundingClientRect(element.current.getBoundingClientRect());
  };

  useEffect(() => {
    updateBoundingClientRect();
  }, [element]);

  useEffect((): (() => void) => {
    updateBoundingClientRect();
    window.addEventListener("resize", updateBoundingClientRect);

    return () => window.removeEventListener("resize", updateBoundingClientRect);
  }, []);

  return boundingClientRect;
};

export default useBoundingClientRect;
