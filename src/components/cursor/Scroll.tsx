import React, { useContext, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import Outline from "./Outline";
import Progress from "./Progress";
import { SubscriberContext } from "../../App";

interface MappedState {
  menuToggled: boolean;
}

type Props = MappedState;

export const Scroll = ({ menuToggled }: Props): JSX.Element => {
  const progress = useRef(null);
  const subscribe = useContext(SubscriberContext);

  useEffect((): void => {
    subscribe((scroll: number, max: number) => {
      progress.current.style.strokeDashoffset = (scroll * -200) / max + 200;
    });
  }, []);

  return (
    <div className="scroll-cursor" style={{ opacity: menuToggled ? 0 : 1 }}>
      <Outline />
      <Progress circleRef={progress} />
    </div>
  );
};

const mapState = ({ menu }: AppState): MappedState => ({
  menuToggled: menu.toggled
});

export default connect(mapState)(Scroll);
