import { useState, MouseEventHandler, MouseEvent } from "react";

interface Handlers {
  onClick?: MouseEventHandler;
  onDrag: MouseEventHandler;
  onDrop?: MouseEventHandler;
}

interface DragProps {
  onMouseDown: MouseEventHandler;
  onMouseMove: MouseEventHandler;
  onMouseUp: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
}

enum Mouse {
  CLICKING = "CLICKING",
  DRAGGING = "DRAGGING",
  NONE = "NONE"
}

type MouseState = keyof typeof Mouse;

const useDrag = ({ onClick, onDrag, onDrop }: Handlers): DragProps => {
  const [mouseState, setMouseState] = useState<MouseState>(Mouse.NONE);

  const click = (event: MouseEvent): void => {
    setMouseState(Mouse.CLICKING);
    onClick(event);
  };
  const drop = (event: MouseEvent): void => {
    setMouseState(Mouse.NONE);
    if (onDrop) onDrop(event);
  };

  const isMouse = (state: MouseState) => () => mouseState === state;

  const isClicking = isMouse(Mouse.CLICKING);
  const isDragging = isMouse(Mouse.DRAGGING);

  const drag = (event: MouseEvent): void => {
    if (isClicking()) {
      setMouseState(Mouse.DRAGGING);
      onDrag(event);
    }

    if (isDragging()) onDrag(event);
  };

  return {
    onMouseDown: click,
    onMouseMove: drag,
    onMouseUp: drop,
    onMouseLeave: drop
  };
};

export default useDrag;
