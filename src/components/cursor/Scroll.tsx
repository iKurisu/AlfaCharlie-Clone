import React, { useContext, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import Outline from "./Outline";
import Progress from "./Progress";
import { SubscriberContext } from "../../App";
import { Cursor } from "modules/cursor/types";
import { classList } from "utils/class";

interface MappedState {
  menuToggled: boolean;
  cursor: Cursor;
}

type Props = MappedState;

export const Scroll = ({ menuToggled, cursor }: Props): JSX.Element => {
  const progress = useRef(null);
  const subscribe = useContext(SubscriberContext);

  useEffect((): void => {
    subscribe((scroll: number, max: number) => {
      progress.current.style.strokeDashoffset = (scroll * -200) / max + 200;
    });
  }, []);

  return (
    <div
      className={classList([
        "scroll-cursor",
        { "-show": !menuToggled && cursor === Cursor.SCROLL }
      ])}
    >
      <Outline />
      <Progress circleRef={progress} />
    </div>
  );
};

const mapState = ({ menu, cursor }: AppState): MappedState => ({
  cursor,
  menuToggled: menu.toggled
});

export default connect(mapState)(Scroll);
