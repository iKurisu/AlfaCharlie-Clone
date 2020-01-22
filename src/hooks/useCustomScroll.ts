import { RefObject, useRef, WheelEvent, TouchEvent, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BezierEasing from "bezier-easing";
import { getValue } from "./transition/utils";
import useAnimationFrame from "./useAnimationFrame";

interface TransitionConfig {
  distance: number;
  duration: number;
  timing?: [number, number, number, number];
}

interface ScrollConfig {
  limitMod?: {
    top?: () => number;
    bottom?: () => number;
  };
  withRouter?: boolean;
  preserveScroll?: boolean;
}

interface ManualScrollConfig {
  to: number;
  duration: number;
  timing?: [number, number, number, number];
}

type TouchEvents = "onTouchStart" | "onTouchMove" | "onTouchEnd";

type EventHandlers = {
  [k in TouchEvents]: (e: TouchEvent<HTMLElement>) => void;
} & {
  onWheel: (e: WheelEvent<HTMLElement>) => void;
};

type Listener = (scroll: number, max: number) => void;
type Subscriber = (listener: Listener) => void;
type Unsubscriber = (listener: Listener) => void;
type ManualScroller = (config: ManualScrollConfig) => void;

const defaultScrollConfig = {
  limitMod: {
    top: () => 0,
    bottom: () => 0
  },
  withRouter: false,
  preserveScroll: false
};

/** Makes an element scrollable. */
const useCustomScroll = (
  ref: RefObject<HTMLElement>,
  { distance, duration, timing = [0, 0, 1, 1] }: TransitionConfig,
  {
    limitMod: { top: limitModTop, bottom: limitModBottom },
    withRouter,
    preserveScroll
  }: ScrollConfig = defaultScrollConfig
): [EventHandlers, Subscriber, Unsubscriber, ManualScroller] => {
  const location = withRouter ? useLocation() : { pathname: "/" };
  const [subscribeAnimation, unsuscribeAnimation] = useAnimationFrame();

  const frame = useRef(0);
  const prevTouches = useRef([0, 0]);
  const target = useRef(0);
  const listeners = useRef([]);
  const topLimit = useRef(0);
  const bottomLimit = useRef(0);

  const updateFrame = (x: number): void => {
    frame.current = x;
  };

  const increaseFrame = (): void => updateFrame(frame.current + 1);
  const resetFrame = (): void => updateFrame(0);

  const calcBottomLimit = (): number => {
    const { clientHeight } = ref.current;

    return clientHeight - window.innerHeight + bottomLimit.current;
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

    listeners.current = currentListeners.concat(fns);
  };

  const unsubscribeListeners = (...fns: Listener[]): void => {
    const { current: currentListeners } = listeners;

    listeners.current = currentListeners.filter(
      listener => !fns.includes(listener)
    );
  };

  useEffect(() => {
    if (!preserveScroll) {
      ref.current.style.transform = "translateY(0)";
      target.current = 0;
    }

    topLimit.current = limitModTop();
    bottomLimit.current = limitModBottom();
  }, [location.pathname]);

  const manualScroll = ({ to, duration, timing }: ManualScrollConfig): void => {
    const from = limit(getValue(ref.current.style.transform));
    const maxFrames = (duration / 1000) * 60;
    const easing = BezierEasing(...timing);
    const bottomLimit = calcBottomLimit();

    setTarget(-to);
    resetFrame();

    const animation = (): void => {
      const ease = maxFrames === 0 ? 1 : frame.current / maxFrames;
      const value = limit(-(from + to) * easing(ease) + from);

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

  const easing = BezierEasing(...timing);
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
    subscribeListeners,
    unsubscribeListeners,
    manualScroll
  ];
};

export default useCustomScroll;
