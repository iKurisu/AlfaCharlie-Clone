import { useRef } from "react";

const useAnimationFrame = (): [(animation: () => void) => void, () => void] => {
  const animationId = useRef<number>(null);

  const unsuscribeAnimation = (): void => {
    cancelAnimationFrame(animationId.current);
    animationId.current = null;
  };

  const subscribeAnimation = (animation: () => void): void => {
    if (animationId.current) unsuscribeAnimation();
    animationId.current = requestAnimationFrame(animation);
  };

  return [subscribeAnimation, unsuscribeAnimation];
};

export default useAnimationFrame;
