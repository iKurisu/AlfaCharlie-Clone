import { useRef, useEffect, RefObject } from "react";
import useTransition from "./useTransition";

interface Options {
  order?: number;
  delay?: number;
}

const useLinkTransition = (
  trigger: boolean,
  { order = 0, delay = 0 }: Options
): [RefObject<HTMLElement>, RefObject<HTMLElement>] => {
  const mask = useRef(null);
  const name = useRef(null);

  const unmask = useTransition(mask, {
    from: { transform: "translateX(-101%)" },
    to: { transform: "translateX(101%)" },
    config: {
      delay: delay + order * 250,
      duration: 1400,
      timing: [0.85, 0, 0.15, 1]
    }
  });

  const fadeIn = useTransition(name, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      delay: delay + 700 + order * 200,
      duration: 700,
      timing: [0.55, 0, 0.45, 1]
    }
  });

  const fadeOut = useTransition(name, {
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: {
      delay: order * 300,
      duration: 400,
      timing: [0.35, 0.6, 0.45, 1]
    }
  });

  useEffect((): void => {
    if (trigger) {
      unmask();
      fadeIn();
    } else {
      fadeOut();
    }
  }, [trigger]);

  return [name, mask];
};

export default useLinkTransition;
