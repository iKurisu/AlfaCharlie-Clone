import { useRef, RefObject } from "react";
import BezierEasing from "bezier-easing";
import mapProperties from "./transition/mapProperties";
import stringifyProperties from "./transition/stringify";
import { getEasingTime, getTotalFrames } from "utils/transition";
import { Properties } from "./transition/types";

interface Config {
  duration: number;
  timing?: [number, number, number, number];
  delay?: number;
}

interface Props {
  from: Properties;
  to: Properties;
  config: Config;
}

const useTransition = (
  element: RefObject<HTMLElement>,
  props: Props
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
      const totalFrames = getTotalFrames(duration);

      const animation = (): void => {
        const { current: currentFrame } = frame;

        const ease = easing(getEasingTime(currentFrame, duration));
        const maxEase = easing(getEasingTime(Math.ceil(totalFrames), duration));

        Object.assign(
          element.current.style,
          stringifyProperties(
            mappedProperties,
            maxEase > 1 ? ease / maxEase : ease
          )
        );

        if (currentFrame >= totalFrames) {
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
