import { useState, useRef, MouseEventHandler, MouseEvent } from "react";

export type Handler = (event: MouseEvent, clickPosition?: number) => void;

interface Handlers {
  onClick?: Handler;
  onDrag: Handler;
  onDrop?: Handler;
}

interface DragProps {
  onMouseDown: MouseEventHandler;
  onMouseMove: MouseEventHandler;
  onMouseUp: MouseEventHandler;
}

enum Mouse {
  CLICKING = "CLICKING",
  DRAGGING = "DRAGGING",
  NONE = "NONE"
}

type MouseState = keyof typeof Mouse;

const useDrag = ({ onClick, onDrag, onDrop }: Handlers): DragProps => {
  const [mouseState, setMouseState] = useState<MouseState>(Mouse.NONE);
  const clickPosition = useRef(0);

  const isMouse = (state: MouseState) => (): boolean => mouseState === state;

  const isClicking = isMouse(Mouse.CLICKING);
  const isDragging = isMouse(Mouse.DRAGGING);

  const click = (event: MouseEvent): void => {
    setMouseState(Mouse.CLICKING);
    clickPosition.current = event.clientX;
    if (onClick) onClick(event, clickPosition.current);
  };
  const drop = (event: MouseEvent): void => {
    setMouseState(Mouse.NONE);
    if (onDrop && isDragging()) onDrop(event, clickPosition.current);
  };

  const drag = (event: MouseEvent): void => {
    if (isClicking()) {
      setMouseState(Mouse.DRAGGING);
      onDrag(event, clickPosition.current);
    }

    if (isDragging()) onDrag(event, clickPosition.current);
  };

  return {
    onMouseDown: click,
    onMouseMove: drag,
    onMouseUp: drop
  };
};

export default useDrag;
