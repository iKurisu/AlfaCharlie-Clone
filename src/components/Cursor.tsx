import React, { useRef, useEffect } from "react";
import Outline from "./cursor/Outline";
import Progress from "./cursor/Progress";
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
      <div className="scroll-cursor">
        <Outline />
        <Progress progress={0} />
      </div>
      <div className="menu-cursor">
        <Outline />
        <Progress progress={0} />
      </div>
    </div>
  );
};

export default Cursor;
