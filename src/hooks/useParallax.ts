import { RefObject, useContext, useEffect } from "react";
import { ScrollContext } from "../App";
import useBoundingClientRect from "./useBoundingClientRect";
import useIntersection from "./useIntersection";

interface Bounds {
  min: number;
  max: number;
}

const useParallax = (element: RefObject<HTMLElement>, bounds: Bounds): void => {
  const { min, max } = bounds;
  const boundDiff = max - min;

  const rect = useBoundingClientRect(element);
  const [isIntersecting] = useIntersection(element);

  const {
    subscriber: [subscribe, unsubscribe]
  } = useContext(ScrollContext);

  useEffect(() => {
    if (!rect) return;

    const { height, top } = rect;
    const diffPerScrolledPx = boundDiff / (height + window.innerHeight);

    const parallax = (scroll: number): void => {
      if (isIntersecting) {
        const scrolledFromElement = Math.abs(scroll) + window.innerHeight - top;
        const offset = diffPerScrolledPx * scrolledFromElement;

        element.current.style.transform = `translateY(${min + offset}%)`;
      }
    };

    subscribe(parallax);
    return () => unsubscribe(parallax);
  }, [rect, isIntersecting]);
};

export default useParallax;
