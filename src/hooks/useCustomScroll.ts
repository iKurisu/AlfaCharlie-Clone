import { RefObject, useRef, WheelEvent, TouchEvent } from "react";
import BezierEasing from "bezier-easing";
import { getValue } from "./transition/utils";
import useAnimationFrame from "./useAnimationFrame";

interface Config {
  distance: number;
  duration: number;
  curve?: [number, number, number, number];
}

type TouchEvents = "onTouchStart" | "onTouchMove" | "onTouchEnd";

type EventHandlers = {
  [k in TouchEvents]: (e: TouchEvent<HTMLElement>) => void;
} & {
  onWheel: (e: WheelEvent<HTMLElement>) => void;
};

/** Makes an element scrollable. */
const useCustomScroll = (
  ref: RefObject<HTMLElement>,
  { distance, duration, curve = [0, 0, 1, 1] }: Config
): EventHandlers => {
  const [subscribeAnimation, unsuscribeAnimation] = useAnimationFrame();
  const frame = useRef(0);
  const prevTouch = useRef(0);

  const updateFrame = (x: number): void => {
    frame.current = x;
  };

  const increaseFrame = (): void => updateFrame(frame.current + 1);
  const resetFrame = (): void => updateFrame(0);

  const setPrevTouch = (x: number): void => {
    prevTouch.current = x;
  };

  const easing = BezierEasing(...curve);

  const maxFrames = (duration / 1000) * 60;
  let target = 0;

  const wheel = (e: WheelEvent<HTMLElement>): void => {
    const from = getValue(ref.current.style.transform);

    target += e.deltaY < 0 ? distance : -distance;

    resetFrame();

    const animation = (): void => {
      const ease = maxFrames === 0 ? 1 : frame.current / maxFrames;

      ref.current.style.transform = `translateY(${(target - from) *
        easing(ease) +
        from}px)`;

      if (frame.current === maxFrames) {
        resetFrame();
        unsuscribeAnimation();
      } else {
        increaseFrame();
        subscribeAnimation(animation);
      }
    };

    animation();
  };

  const touchStart = (e: TouchEvent<HTMLElement>): void => {
    unsuscribeAnimation();
    resetFrame();
    setPrevTouch(e.touches[0].clientY);
  };

  const touchMove = (e: TouchEvent<HTMLElement>): void => {
    const from = getValue(ref.current.style.transform);

    ref.current.style.transform = `translateY(${from -
      (prevTouch.current - e.touches[0].clientY)}px)`;

    setPrevTouch(e.touches[0].clientY);
  };

  const touchEnd = (e: TouchEvent<HTMLElement>): void => {
    const from = getValue(ref.current.style.transform);

    const animation = (): void => {
      const ease = maxFrames === 0 ? 1 : frame.current / maxFrames;

      ref.current.style.transform = `translateY(${from -
        500 * easing(ease)}px)`;

      if (frame.current === maxFrames) {
        resetFrame();
        unsuscribeAnimation();
      } else {
        increaseFrame();
        subscribeAnimation(animation);
      }
    };

    animation();
  };

  return {
    onWheel: wheel,
    onTouchStart: touchStart,
    onTouchMove: touchMove,
    onTouchEnd: touchEnd
  };
};

export default useCustomScroll;
