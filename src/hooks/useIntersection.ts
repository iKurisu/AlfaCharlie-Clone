import { RefObject, useRef, useState, useEffect } from "react";

/**
 * Creates an intersection observer for the given node. Returns the state
 * of the intersection and a function to disconnect the observer.
 */
const useIntersection = (
  node: RefObject<HTMLElement>,
  options: IntersectionObserverInit = { threshold: 0.05 }
): [boolean, () => void] => {
  const observer = useRef<IntersectionObserver>(null);
  const [isIntersecting, setIntersect] = useState(false);

  const onIntersect: IntersectionObserverCallback = ([entry]) =>
    setIntersect(entry.isIntersecting);

  const getObserver = (): IntersectionObserver => {
    if (observer.current === null) {
      observer.current = new IntersectionObserver(onIntersect, options);
    }

    return observer.current;
  };

  const disconnect = (): void => getObserver().disconnect();

  useEffect((): (() => void) => {
    const observer = getObserver();
    if (node.current) observer.observe(node.current);
    return () => observer.disconnect();
  }, []);

  return [isIntersecting, disconnect];
};

export default useIntersection;
