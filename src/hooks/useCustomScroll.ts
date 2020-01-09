import { RefObject, useRef, WheelEvent, TouchEvent } from "react";
import BezierEasing from "bezier-easing";
import { getValue } from "./transition/utils";
import useAnimationFrame from "./useAnimationFrame";

interface Config {
  distance: number;
  duration: number;
  curve?: [number, number, number, number];
  limitMod?: {
    top?: number;
    bottom?: number;
  };
}

type TouchEvents = "onTouchStart" | "onTouchMove" | "onTouchEnd";

type EventHandlers = {
  [k in TouchEvents]: (e: TouchEvent<HTMLElement>) => void;
} & {
  onWheel: (e: WheelEvent<HTMLElement>) => void;
};

type Listener = (scroll: number, max: number) => void;
type Subscriber = (listener: Listener) => void;

/** Makes an element scrollable. */
const useCustomScroll = (
  ref: RefObject<HTMLElement>,
  {
    distance,
    duration,
    curve = [0, 0, 1, 1],
    limitMod = { top: 0, bottom: 0 }
  }: Config
): [EventHandlers, Subscriber] => {
  const [subscribeAnimation, unsuscribeAnimation] = useAnimationFrame();
  const frame = useRef(0);
  const prevTouches = useRef([0, 0]);
  const target = useRef(0);
  const listeners = useRef([]);

  const updateFrame = (x: number): void => {
    frame.current = x;
  };

  const increaseFrame = (): void => updateFrame(frame.current + 1);
  const resetFrame = (): void => updateFrame(0);

  const calcBottomLimit = (): number => {
    const { clientHeight } = ref.current;

    return clientHeight - window.innerHeight + limitMod.bottom;
  };

  const limit = (x: number): number => {
    const bottomLimit = calcBottomLimit();

    return x > 0 ? 0 : x < -bottomLimit ? -bottomLimit : x;
  };

  const setTarget = (x: number): void => {
    target.current = x;
  };

  const increaseTarget = (x: number): void => {
    setTarget(target.current + x);
  };

  const resetPrevTouches = (x: number): void => {
    prevTouches.current = [x, x];
  };

  const setPrevTouch = (x: number): void => {
    prevTouches.current = [prevTouches.current[1], x];
  };

  const subscribeListeners = (...fns: Listener[]): void => {
    const { current: currentListeners } = listeners;

    listeners.current = [...currentListeners, ...fns];
  };

  const easing = BezierEasing(...curve);
  const maxFrames = (duration / 1000) * 60;

  const wheel = (e: WheelEvent<HTMLElement>): void => {
    const { current: currentTarget } = target;
    const from = limit(getValue(ref.current.style.transform));

    const bottomLimit = calcBottomLimit();

    if (
      (currentTarget > 0 && e.deltaY > 0) ||
      (currentTarget < -bottomLimit && e.deltaY < 0)
    ) {
      setTarget(from);
    }

    increaseTarget(e.deltaY < 0 ? distance : -distance);
    resetFrame();

    const animation = (): void => {
      const ease = maxFrames === 0 ? 1 : frame.current / maxFrames;
      const value = limit((target.current - from) * easing(ease) + from);

      listeners.current.forEach((listener: Listener) => {
        listener(value, -bottomLimit);
      });

      ref.current.style.transform = `translateY(${value}px)`;

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
    resetPrevTouches(e.touches[0].clientY);
  };

  const touchMove = (e: TouchEvent<HTMLElement>): void => {
    const from = getValue(ref.current.style.transform);
    const value = limit(from - (prevTouches.current[1] - e.touches[0].clientY));
    const bottomLimit = calcBottomLimit();

    listeners.current.forEach((listener: Listener) => {
      listener(value, -bottomLimit);
    });

    ref.current.style.transform = `translateY(${value}px)`;

    setPrevTouch(e.touches[0].clientY);
  };

  const touchEnd = (e: TouchEvent<HTMLElement>): void => {
    const from = getValue(ref.current.style.transform);
    const bottomLimit = calcBottomLimit();

    e.persist();

    const animation = (): void => {
      const ease = maxFrames === 0 ? 1 : frame.current / maxFrames;
      const d = prevTouches.current[0] - prevTouches.current[1];
      const value = limit(from - d * 60 * easing(ease));

      listeners.current.forEach((listener: Listener) => {
        listener(value, -bottomLimit);
      });

      ref.current.style.transform = `translateY(${limit(value)}px)`;

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

  return [
    {
      onWheel: wheel,
      onTouchStart: touchStart,
      onTouchMove: touchMove,
      onTouchEnd: touchEnd
    },
    subscribeListeners
  ];
};

export default useCustomScroll;
