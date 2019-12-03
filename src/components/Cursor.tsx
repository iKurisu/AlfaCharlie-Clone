import React, { useRef, useEffect } from "react";
import ScrollCursor from "./cursor/Scroll";
import MenuCursor from "./cursor/Menu";
import useMouseFollow from "hooks/useMouseFollow";
import "./Cursor.scss";

const Cursor = (): JSX.Element => {
  const cursor = useRef(null);

  const [followMouse, stopFollowing] = useMouseFollow(cursor);

  useEffect((): (() => void) => {
    followMouse();
    return (): void => stopFollowing();
  }, []);

  return (
    <div className="cursor" ref={cursor}>
      <ScrollCursor />
      <MenuCursor />
    </div>
  );
};

export default Cursor;
