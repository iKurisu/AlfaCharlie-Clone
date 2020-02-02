import { useState, useEffect, RefObject } from "react";
import useIntersection from "./useIntersection";
import useDidUpdateEffect from "./useDidUpdateEffect";

const useRevealSection = (
  section: RefObject<HTMLElement>,
  options: IntersectionObserverInit = {
    threshold: window.innerHeight <= 1024 ? 0.01 : 0.2
  }
): boolean => {
  const [revealSection, setRevealSection] = useState(false);
  const [isIntersecting, disconnect] = useIntersection(section, options);

  useDidUpdateEffect((): void => {
    disconnect();
  }, [revealSection]);

  useEffect((): void => {
    if (isIntersecting) setRevealSection(true);
  }, [isIntersecting]);

  return revealSection;
};

export default useRevealSection;
