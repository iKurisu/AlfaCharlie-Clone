import { RefObject, useContext, useEffect } from "react";
import { ScrollContext } from "../App";
import useBoundingClientRect from "./useBoundingClientRect";
import useIntersection from "./useIntersection";

type Unit = "%" | "px" | "vh" | "vw" | "vmax" | "vmin";

interface Bounds {
  min: number;
  max: number;
  unit?: Unit;
}

const useParallax = (element: RefObject<HTMLElement>, bounds: Bounds): void => {
  const { min, max, unit = "%" } = bounds;
  const boundDiff = max - min;
  const rect = useBoundingClientRect(element);
  const [isIntersecting] = useIntersection(element);

  const {
    subscriber: [subscribe, unsubscribe]
  } = useContext(ScrollContext);

  useEffect(() => {
    if (!rect) return;

    const { innerHeight } = window;
    const { height, top } = rect;
    const distanceFromElement = top <= innerHeight ? top : innerHeight;
    const diffPerScrolledPx = boundDiff / (height + distanceFromElement);

    const parallax = (scroll: number): void => {
      if (isIntersecting) {
        const absScroll = Math.abs(scroll);
        const scrolledFromElement = absScroll + distanceFromElement - top;
        const offset = diffPerScrolledPx * scrolledFromElement;

        element.current.style.transform = `translateY(${min + offset}${unit})`;
      }
    };

    subscribe(parallax);
    return () => unsubscribe(parallax);
  }, [rect, isIntersecting]);
};

export default useParallax;
