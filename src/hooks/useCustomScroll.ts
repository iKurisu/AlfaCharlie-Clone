import { RefObject, useRef, WheelEvent } from "react";
import BezierEasing from "bezier-easing";
import { getValue } from "./transition/utils";
import useAnimationFrame from "./useAnimationFrame";

const useCustomScroll = (ref: RefObject<HTMLElement>): void => {
  const [subscribeAnimation, unsuscribeAnimation] = useAnimationFrame();
  const frame = useRef(0);

  const updateFrame = (x: number): void => {
    frame.current = x;
  };

  const increaseFrame = (): void => updateFrame(frame.current + 1);
  const resetFrame = (): void => updateFrame(0);

  const duration = 500;
  const increment = -100;
  const easing = BezierEasing(0, 0, 0.1, 1);

  const maxFrames = 90;
  let target = 0;

  const scroll = (e: WheelEventInit): void => {
    const scrollLimit = ref.current.clientHeight - window.innerHeight;

    const from = getValue(ref.current.style.transform);

    target += e.deltaY < 0 ? 100 : -100;

    resetFrame();

    const animation = (): void => {
      ref.current.style.transform = `translateY(${(target - from) *
        easing(frame.current / maxFrames) +
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

  window.addEventListener("mousewheel", scroll);
};

export default useCustomScroll;
