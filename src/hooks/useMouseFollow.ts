import { useRef, RefObject, useEffect } from "react";

type followMouse = () => void;
type stopFollowing = () => void;

const useMouseFollow = (
  element: RefObject<HTMLDivElement>
): [followMouse, stopFollowing] => {
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationId = useRef<number>(null);

  const setMousePosition = (e: MouseEvent): void => {
    const { clientX: x, clientY: y } = e;

    mousePosition.current = { x, y };
  };

  useEffect((): (() => void) => {
    window.addEventListener("mousemove", setMousePosition);
    return (): void =>
      window.removeEventListener("mousemove", setMousePosition);
  }, []);

  const followMouse = (): void => {
    const {
      current: { x: mouseX, y: mouseY }
    } = mousePosition;
    const {
      left: elementX,
      top: elementY
    } = element.current.getBoundingClientRect();

    const dX = mouseX - (mouseX - elementX) / 1000;
    const dY = mouseY - (mouseY - elementY) / 1000;

    element.current.style.transform = `translate(${dX}px, ${dY}px)`;
    animationId.current = requestAnimationFrame(followMouse);
  };

  const stopFollowing = (): void => {
    cancelAnimationFrame(animationId.current);
    animationId.current = null;
  };

  return [followMouse, stopFollowing];
};

export default useMouseFollow;
