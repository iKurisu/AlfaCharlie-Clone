import { useRef, RefObject } from "react";
import BezierEasing from "bezier-easing";
import mapProperties from "./transition/mapProperties";
import stringifyProperties from "./transition/stringify";
import { getProgress, toFrames } from "./transition/utils";
import { Properties } from "./transition/types";

interface Config {
  duration: number;
  timing?: [number, number, number, number];
  delay?: number;
}

export interface TransitionProps {
  from: Properties;
  to: Properties;
  config: Config;
}

/**
 * Generates a function that will perform a transition from A to B on a ref
 * object.
 *
 * @param element A ref object.
 * @param props The transition's properties: `from`, `to` and `config`.
 *
 * @returns A function that will perform the transition when called and resolves
 * a promise once the transition completes.
 */
const useTransition = (
  element: RefObject<HTMLElement>,
  props: TransitionProps
): (() => Promise<void>) => {
  const animationId = useRef<number>(null);
  const frame = useRef<number>(0);

  const updateFrame = (x: number): void => {
    frame.current = x;
  };

  const increaseFrame = (): void => updateFrame(frame.current + 1);
  const resetFrame = (): void => updateFrame(0);

  const setAnimationId = (id: number): void => {
    animationId.current = id;
  };

  const transition = (): Promise<void> =>
    new Promise((resolve): void => {
      const { from, to, config } = props;
      const { duration, timing = [0, 0, 1, 1], delay = 0 }: Config = config;

      const easing = BezierEasing(...timing);
      const mappedProperties = mapProperties(from, to);
      const frames = toFrames(duration);

      const animation = (): void => {
        const { current: currentFrame } = frame;

        const ease = easing(getProgress(currentFrame, frames));
        const maxEase = easing(getProgress(Math.ceil(frames), frames));

        Object.assign(
          element.current.style,
          stringifyProperties(
            mappedProperties,
            maxEase > 1 ? ease / maxEase : ease
          )
        );

        if (currentFrame >= frames) {
          resetFrame();
          cancelAnimationFrame(animationId.current);
          resolve();
        } else {
          increaseFrame();
          setAnimationId(requestAnimationFrame(animation));
        }
      };

      setTimeout(animation, delay);
    });

  return transition;
};

export default useTransition;
